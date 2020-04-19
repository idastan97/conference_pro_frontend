import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from 'react-router-dom';
import Login from "./pages/Login";
import Register from "./pages/Register";
import ControllerPage from "./pages/ControllerPage";
import Video from "./pages/Video";
import axios from 'axios';
import config from "./core/config";
import Footer from "./components/Footer";
import ReceiverPage from "./pages/ReceiverPage";

class IndexRouter extends React.Component{
    constructor(props){
        super(props);
        this.state={
            authorized: null,
            username: '',
            is_machine: false,
            machine_password: 0,
            user_id: 0,
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
                    self.authorize(response.data)
                })
                .catch(function (error) {
                    console.log(error);
                    self.setState({authorized: false});
                });
        }
        // self.setState({authorized: false, email: 'email'});
    }
    componentDidMount(){
        this.check_session()
    }

    authorize(data){
        console.log(data);
        localStorage.setItem('username', data.username);
        this.setState({
            authorized: true,
            username: data.username,
            is_machine: data.is_machine,
            machine_password: data.machine_password,
            user_id: data.user_id,
        });
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
                        <Route path='/video' render={() => self.state.authorized ? <Video gstate={self.state} logout={self.logout} /> : <Redirect to='/login' />} />
                        <Route path='/' render={() => self.state.authorized ? (this.state.is_machine ? <ReceiverPage machine_id={self.state.user_id} machine_password={self.state.machine_password} logout={self.logout} /> : <ControllerPage gstate={self.state} logout={self.logout} />) : <Redirect to='/login' />} />

                    </Switch>
                    <Footer />
                </Router>
            </div>
        );
    }
}

export default IndexRouter;