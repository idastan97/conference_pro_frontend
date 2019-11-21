import React, {Component} from 'react';
import ReactCursorPosition from 'react-cursor-position';
import Tracker from "../components/Tracker";
import axios from "axios";
import config from "../core/config";

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
        return (
            <div className="container-fluid">
                    <div className="row">
                        <h1>Home</h1>
                    </div>
                    <div className="row" style={{border: "1px solid blue"}}>
                        <div  className="col-md-4 offset-4">
                            <ReactCursorPosition style={{width: "100%"}}>
                                <Tracker change_cord={this.change_cord}/>
                            </ReactCursorPosition>
                        </div>
                    </div>
                    <div className="row">
                        <button type="submit" className="btn btn-primary" onClick={this.props.logout}>Logout</button>
                    </div>
            </div>
        );
    }
}

export default Home;