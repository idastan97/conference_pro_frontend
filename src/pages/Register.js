import React, {Component} from 'react';
import axios from 'axios';
import config from "../core/config";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            confirm_password: "",
            errormsg: false,
        };
        this.register = this.register.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    register(){
        let self = this;
        if (self.state.password === self.state.confirm_password) {
            axios(config.BACKEND_URL + '/auth/register/', {
                method: "POST",
                data: {
                    first_name: self.state.first_name,
                    last_name: self.state.last_name,
                    email: self.state.email,
                    password: self.state.password,
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
                    self.props.authorize(response.data.key, self.state.email);
                })
                .catch(function (error) {
                    console.log(error);
                    self.setState({errormsg: error});
                });
        } else {
            self.setState({errormsg: "different password and confirm password"});
        }
    }

    handleChange(e){
        switch(e.target.name) {
            case("first_name"):
                this.setState({first_name: e.target.value});
                break;
            case("last_name"):
                this.setState({last_name: e.target.value});
                break;
            case("email"):
                this.setState({email: e.target.value});
                break;
            case("password"):
                this.setState({password: e.target.value});
                break;
            case("confirm_password"):
                this.setState({confirm_password: e.target.value});
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
                                <label htmlFor="exampleInputFirstName">First Name</label>
                                <input name="first_name" type="text" className="form-control" id="exampleInputFirstName"
                                       onChange ={this.handleChange} value={this.state.first_name}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputLastName">Last Name</label>
                                <input name="last_name" type="text" className="form-control" id="exampleInputLastName"
                                       onChange ={this.handleChange} value={this.state.last_name}/>
                            </div>
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
                            <div className="form-group">
                                <label htmlFor="exampleConfirmInputPassword1">Confirm Password</label>
                                <input name="confirm_password" type="password" className="form-control" id="exampleConfirmInputPassword1"
                                        onChange ={this.handleChange} value={this.state.confirm_password}/>
                            </div>
                            <div className="form-group form-check">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                                <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                            </div>
                            <div className="form-group">
                                <label>{this.state.errormsg}</label>
                            </div>
                            <button className="btn btn-primary" onClick={this.register}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;