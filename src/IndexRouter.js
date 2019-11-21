import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from 'react-router-dom';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import axios from 'axios';
import config from "./core/config";

class IndexRouter extends React.Component{
    constructor(props){
        super(props);
        this.state={
            authorized: null,
            email: '',
        };
        this.authorize = this.authorize.bind(this);
        this.logout = this.logout.bind(this);
        this.check_session = this.check_session.bind(this);
    }
    check_session(){
        let self = this;
        if (!localStorage.getItem('token')){
            self.setState({authorized: false});
        } else {
            axios(config.BACKEND_URL+'/auth/checktoken/', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'token ' + localStorage.getItem('token'),
                }
            })
                .then(function (response) {
                    console.log(response.data);
                    // localStorage.setItem('email', response.data[0]);
                    // localStorage.setItem('userId', response.data[1]);
                    // self.login(response.data[0].toLowerCase());
                    self.setState({authorized: true, email: 'email'});
                })
                .catch(function (error) {
                    console.log(error);
                    self.setState({authorized: false});
                });
        }
    }
    componentDidMount(){
        this.check_session()
    }

    authorize(token, email){
        localStorage.setItem('token', token);
        this.setState({authorized: true, email: email});
    }

    logout(){
        localStorage.setItem('token', '');
        this.setState({authorized: false});
    }

    render(){
        let self = this;
        if (this.state.authorized==null){
            return <h1>Loading ... </h1>;
        }
        return (
            <div>
                <Router>
                    <Switch>
                        <Route exact path='/login' render={() => self.state.authorized ? <Redirect to='/' /> : <Login authorize={self.authorize} />} />
                        <Route exact path='/register' render={() => self.state.authorized ? <Redirect to='/' /> : <Register authorize={self.authorize} />} />
                        <Route path='/' render={() => self.state.authorized ? <Home gstate={self.state} logout={self.logout} /> : <Redirect to='/login' />} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default IndexRouter;