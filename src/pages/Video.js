import React, {Component} from 'react';
// import axios from "axios";
// import config from "../core/config";
import NavBar from "../components/NavBar";

class Video extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render(){
        let self = this;
        return (
            <div>
                <NavBar current="video" logout={self.props.logout}/>
                <div className="video container">
                    <div className="row">
                        <h1>Video conferencing</h1>
                    </div>
                    <div className="row">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus fugit laboriosam maxime optio quisquam sapiente tempora. A aspernatur aut corporis culpa cumque, laudantium maiores molestias obcaecati officiis repellat repudiandae suscipit.
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Video;