import React, {Component} from 'react';
import ReactCursorPosition from 'react-cursor-position';
import Tracker from "../components/Tracker";
import axios from "axios";
import config from "../core/config";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            x: 0,
            y: 0
        };
        this.change_cord = this.change_cord.bind(this);
    }

    change_cord(x, y){
        // this.setState({x: x, y: y});
        console.log(x+" "+y);
        axios(config.DESKTOP_URL + '/put?x='+x+'&y='+y, {
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
                    <div className="row">
                        <div  className="tracker col-md-6 offset-3">
                            <ReactCursorPosition style={{width: "100%"}}>
                                <Tracker change_cord={self.change_cord}/>
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

export default Home;