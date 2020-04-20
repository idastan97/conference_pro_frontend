import React, {Component} from 'react';
import ReactCursorPosition from 'react-cursor-position';
import Tracker from "../components/Tracker";
import axios from "axios";
import config from "../core/config";
import NavBar from "../components/NavBar";
import Peer from 'simple-peer';

class ControllerPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            x: 0,
            y: 0,
            peer: null,
            socket: new WebSocket(config.BACKEND_SOCKET+'/peers/'),
            connected: false,
            message: "",
            didMount: false,
        };
        let self = this;
        this.setup_peer = this.setup_peer.bind(this);
        this.setup_peer();

        this.state.socket.onmessage = function(e) {
            console.log(e);
            let data = JSON.parse(e.data);
            if (data.method === "client_off"){
                self.setState({connected: false});
                let video = document.getElementById("video");
                video.srcObject = null;
            }
        };

        this.change_cord = this.change_cord.bind(this);
        this.pen_up = this.pen_up.bind(this);
        this.pen_down = this.pen_down.bind(this);


        this.connect_to_other_peer = this.connect_to_other_peer.bind(this);
    }

    setup_peer(){
        let self = this;
        let peer = new Peer({initiator: false, trickle: false});
        // this.setState({peer: peer});
        this.state.peer = peer;
        this.state.peer.on('signal', (data) => {
            console.log("signal: ");
            console.log(JSON.stringify(data));
            this.state.socket.send(JSON.stringify({
                method: "connect_machine",
                peer_id: data,
                machine_id: document.getElementById("machine_id").value,
            }));
            self.setState({connected: true, message: ""})
        });
        if (self.state.didMount){
            self.state.peer.on('stream', (stream) => {
                let video = document.getElementById("video");
                video.srcObject = stream;
                video.play();
            });
        }
    }

    componentDidMount() {
        this.state.peer.on('stream', (stream) => {
            let video = document.getElementById("video");
            video.srcObject = stream;
            video.play();
        });
        this.setState({"didMount": true});
    }

    connect_to_other_peer(){
        let self = this;
        axios(config.BACKEND_URL+'/auth/connect_to_machine/', {
            method: "POST",
            data: {
                machine_id: parseInt(document.getElementById("machine_id").value),
                machine_password: parseInt(document.getElementById("machine_password").value),
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'token ' + localStorage.getItem('token'),
            }
        })
            .then(function (response) {
                console.log("    ----    ");
                console.log(response.data);
                let other_id = JSON.parse(response.data.peer_id);
                console.log("other peer");
                console.log(other_id);
                self.state.peer.signal(other_id);
            })
            .catch(function (error) {
                console.log(error);
                self.setState({message: "machine not found"});
            });
    }

    change_cord(x, y){
        console.log("change_cord: " +x+" "+y);
        let data = {
            method: "point",
            x: x,
            y: y,
        };
        this.state.peer.send(JSON.stringify(data));
    }

    pen_up(){
        console.log("pen_up");
        let data = {
            method: "pen_up",
        };
        this.state.peer.send(JSON.stringify(data));
    }

    pen_down(z){
        console.log("pen_down");
        let data = {
            method: "pen_down",
            z: z,
        };
        this.state.peer.send(JSON.stringify(data));
    }

    render(){
        let self = this;
        return (
            <div>
                <NavBar current="home" logout={self.props.logout}/>
                <div className="home container">
                    <div className="row">
                        <h1>ConferencePro - your best helper in web conferencing!</h1>
                        <p>Write your signature down in the window and automatic pen will repeat it in the paper</p>
                    </div>
                    <video id={"video"} />
                    <div className="form-group">
                        <label>mchine_id:</label>
                        <input id="machine_id" />
                    </div>
                    <div className="form-group">
                        <label>mchine_password:</label>
                        <input id="machine_password" />
                    </div>
                    <button  onClick={this.connect_to_other_peer}>connect</button>
                    <h2 className="alert-danger">{self.state.message}</h2>
                    {self.state.connected ? <h2 className="alert-success">Connected</h2> :  <h2>not connected</h2>}
                    <div className="row">
                        <div  className="tracker col-md-6 offset-3">
                            <ReactCursorPosition style={{width: "100%"}}>
                                <Tracker clicked={false} change_cord={self.change_cord} pen_up={self.pen_up} pen_down={self.pen_down}/>
                            </ReactCursorPosition>
                        </div>
                    </div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi id mollitia nulla. Eligendi esse ipsa magni nostrum rerum! Commodi consequatur illum, ipsum labore nulla officiis perferendis sequi tenetur ut veniam!</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam debitis eos illum libero mollitia, officiis quisquam vel voluptatibus. Asperiores at corporis, dignissimos eveniet expedita modi perferendis ratione! Dolorum, id officiis.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium adipisci, eos error illum inventore, ipsum maxime minima nesciunt officia perspiciatis quia, quis reprehenderit temporibus. Deserunt eius facere iste provident. Esse?</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium adipisci, eos error illum inventore, ipsum maxime minima nesciunt officia perspiciatis quia, quis reprehenderit temporibus. Deserunt eius facere iste provident. Esse?</p>
                </div>
            </div>
        );
    }
}

export default ControllerPage;