import React, {Component} from 'react';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div className="container-fluid">
                <div className="row">
                    <h1>Home</h1>
                    <button type="submit" className="btn btn-primary" onClick={this.props.logout}>Logout</button>
                </div>
            </div>
        );
    }
}

export default Home;