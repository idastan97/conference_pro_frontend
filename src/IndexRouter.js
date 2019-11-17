import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from 'react-router-dom';
import Login from "./pages/Login";
import Home from "./pages/Home";

class IndexRouter extends React.Component{
    constructor(props){
        super(props);
        this.state={
            authorized: null,
        };
        this.authorize = this.authorize.bind(this);
        this.logout = this.logout.bind(this);
    }
    componentDidMount(){
        let self = this;
        if (!localStorage.getItem('token')){
            self.setState({authorized: false});
        } else {
            self.setState({authorized: true});
        }
    }

    authorize(token){

        localStorage.setItem('token', token);
        this.setState({authorized: true});
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
                        <Route path='/' render={() => self.state.authorized ? <Home logout={self.logout} /> : <Redirect to='/login' />} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default IndexRouter;