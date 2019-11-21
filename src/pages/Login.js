import React, {Component} from 'react';
import axios from 'axios';
import config from "../core/config";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            errormsg: false
        };
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    login(){
        let self = this;
        axios(config.BACKEND_URL+'/auth/login/', {
            method: "POST",
            data: {
                email: self.state.email,
                password: self.state.password
            },
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                console.log("    ----    ");
                console.log(response.data);
                // localStorage.setItem('token', response.data[0]);
                // localStorage.setItem('userId', response.data[1]);
                // self.props.login(self.state.email.toLowerCase());
                self.props.authorize(response.data.token, self.state.email);
            })
            .catch(function (error) {
                console.log(error);
                self.setState({errormsg: true });
            });

    }

    handleChange(e){
        switch(e.target.name) {
            case("email"):
                this.setState({email: e.target.value});
                break;
            case("password"):
                this.setState({password: e.target.value});
                break;
            default:

        }
    }

    render(){
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4 offset-md-4">
                        <div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email address</label>
                                <input name="email" type="email" className="form-control" id="exampleInputEmail1"
                                       aria-describedby="emailHelp" placeholder="Enter email"
                                       onChange ={this.handleChange} value={this.state.email}/>
                                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with
                                        anyone else.</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input name="password" type="password" className="form-control" id="exampleInputPassword1"
                                       placeholder="Password" onChange ={this.handleChange} value={this.state.password}/>
                            </div>
                            <div className="form-group form-check">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                            </div>
                            <div className="form-group">
                                <label>{this.state.errormsg}</label>
                            </div>
                            <button className="btn btn-primary" onClick={this.login}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;