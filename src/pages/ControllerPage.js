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
            peer: new Peer({initiator: false, trickle: false}),
            socket: new WebSocket(config.BACKEND_SOCKET+'/peers/'),
        };
        this.state.peer.on('signal', (data) => {
            console.log("signal: ");
            console.log(JSON.stringify(data));
            this.state.socket.send(JSON.stringify({
                method: "connect_machine",
                peer_id: data,
                machine_id: document.getElementById("machine_id").value,
            }));
        });

        this.change_cord = this.change_cord.bind(this);
        this.pen_up = this.pen_up.bind(this);
        this.pen_down = this.pen_down.bind(this);

        this.connect_to_other_peer = this.connect_to_other_peer.bind(this);
    }

    componentDidMount() {
        this.state.peer.on('stream', (stream) => {
            let video = document.getElementById("video");
            video.srcObject = stream;
            video.play();
        });
    }

    connect_to_other_peer(){
        // let other_id = JSON.parse(document.getElementById("otherid").value);
        // console.log("other peer");
        // console.log(other_id)
        // this.state.peer.signal(other_id);
        let self = this;
        axios(config.BACKEND_URL+'/auth/connect_to_machine/', {
            method: "POST",
            data: {
                machine_id: parseInt(document.getElementById("machine_id").value)
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
                console.log(error.response.data.error);
            });
    }

    change_cord(x, y){
        // this.setState({x: x, y: y});
        console.log("change_cord: " +x+" "+y);
        axios(config.DESKTOP_URL + '/point?x='+x+'&y='+y, {
            method: "GET"
        })
            .then(function (response) {
                console.log("    ----    ");
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    pen_up(){
        console.log("pen_up");
        axios(config.DESKTOP_URL + '/pen_up', {
            method: "GET"
        })
            .then(function (response) {
                console.log("    ----    ");
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    pen_down(z){
        console.log("pen_down");
        axios(config.DESKTOP_URL + '/pen_down?z='+z, {
            method: "GET"
        })
            .then(function (response) {
                console.log("    ----    ");
                console.log(response.data);
                // localStorage.setItem('token', response.data[0]);
                // localStorage.setItem('userId', response.data[1]);
                // self.props.login(self.state.email.toLowerCase());
            })
            .catch(function (error) {
                console.log(error);
            });
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
                    <div className="row">
                        <div  className="tracker col-md-6 offset-3">
                            <ReactCursorPosition style={{width: "100%"}}>
                                <Tracker clicked={false} change_cord={self.change_cord} pen_up={self.pen_up} pen_down={self.pen_down}/>
                            </ReactCursorPosition>
                            <input id="machine_id" />

                            <button  onClick={this.connect_to_other_peer}>connect</button>
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