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
            stream: null
        };
        navigator.webkitGetUserMedia({video: true, audio: false}, (stream) => {
            this.setState({stream: stream});
            this.state.peer = new Peer({initiator: true, trickle: false, stream: stream});
            this.state.peer.on('signal', (data) => {
                console.log("signal: ");
                console.log(JSON.stringify(data));
            });
        }, (err) =>{
            console.log(err);
        });
        this.connect_to_other_peer = this.connect_to_other_peer.bind(this);
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
                    <div className="row">
                        <div  className="col-md-6 offset-3">
                            <textarea id={"otherid"}/>
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

export default ReceiverPage;