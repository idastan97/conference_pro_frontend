import React, {Component} from 'react';
import ReactCursorPosition from 'react-cursor-position';
import Tracker from "../components/Tracker";
import axios from "axios";
import config from "../core/config";
import NavBar from "../components/NavBar";
import Peer from 'simple-peer';

class ReceiverPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stream: null,
            peer: null,
            socket: new WebSocket(config.BACKEND_SOCKET+'/peers/'),
            connected: false
        };
        this.setup_peer = this.setup_peer.bind(this);
        this.change_cord = this.change_cord.bind(this);
        this.pen_up = this.pen_up.bind(this);
        this.pen_down = this.pen_down.bind(this);
        let self = this;
        this.state.socket.onopen = function(e) {
            self.state.socket.send(JSON.stringify({
                "method": "register_machine",
                "token": localStorage.getItem('token')
            }));
        };
        this.state.socket.onmessage = function(e) {
            console.log(e);
            let data = JSON.parse(e.data);
            if (data.method === "connect_to_peer"){
                self.state.peer.signal(data.peer_id);
                self.setState({connected: true})
            }
            if (data.method === "client_off"){
                self.setState({connected: false});
                // let video = document.getElementById("video");
                // video.srcObject = null;
                self.setup_peer();
            }
        };

        this.setup_peer();
        this.connect_to_other_peer = this.connect_to_other_peer.bind(this);

    }

    setup_peer(){
        let self = this;
        navigator.webkitGetUserMedia({video: true, audio: false}, (stream) => {
            self.setState({stream: stream});

            this.state.peer = new Peer({initiator: true, trickle: false, stream: stream});
            this.state.peer.on('signal', (data) => {
                console.log("signal: ");
                console.log(JSON.stringify(data));

                axios(config.BACKEND_URL+'/auth/set_peer_id/', {
                    method: "POST",
                    data: {
                        peer_id: JSON.stringify(data)
                    },
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'token ' + localStorage.getItem('token'),
                    }
                })
                    .then(function (response) {
                        console.log("    ----    ");
                        console.log(response.data);
                    })
                    .catch(function (error) {
                        console.log(error.response.data.error);
                    });
            });
            this.state.peer.on("data", (data) => {
                console.log("  data from peer");
                data = JSON.parse(data);
                if (data.method === "point"){
                    self.change_cord(data.x, data.y);
                }
                if (data.method === "pen_down"){
                    self.pen_down(data.z);
                }
                if (data.method === "pen_up"){
                    self.pen_up();
                }
            });
        }, (err) =>{
            console.log(err);
        });
    }

    change_cord(x, y){
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!prevState.stream && this.state.stream) {
            let video = document.getElementById("video");
            video.srcObject = this.state.stream;
            video.play();
        }
    }

    connect_to_other_peer(){
        let other_id = JSON.parse(document.getElementById("otherid").value);
        this.state.peer.signal(other_id);
    }

    render(){
        let self = this;
        return (
            <div>
                <NavBar current="video" logout={self.props.logout}/>
                <div className="home container">
                    <div className="row">
                        <h1>ConferencePro - your best helper in web conferencing!</h1>
                        <p>Your video: </p>
                    </div>
                    <video id={"video"} />
                    <h2>your machine_id: {self.props.machine_id}</h2>
                    <h2>your machine_password: {self.props.machine_password}</h2>
                    {self.state.connected ? <h2 className="alert-success">Connected</h2> :  <h2>not connected</h2>}
                    <div className="row">


                        <div  className="col-md-6 offset-3">
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

export default ReceiverPage;