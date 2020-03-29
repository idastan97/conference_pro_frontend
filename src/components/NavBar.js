import React, {Component} from 'react';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render(){
        let self = this;
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                {
                    self.props.current === "login" || self.props.current === "register" ?
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup"></div> :
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav">
                                {
                                    self.props.current === "home" ?
                                        <a className="nav-item nav-link active" href="/">CONFERENCE-PRO</a>
                                        : <a className="nav-item nav-link" href="/">CONFERENCE-PRO</a>
                                }
                            </div>
                            <div className="navbar-nav">
                                {
                                    self.props.current === "video" ?
                                        <a className="nav-item nav-link active" href="/video">Video Streaming</a>
                                        : <a className="nav-item nav-link" href="/video">Video Streaming</a>
                                }
                            </div>
                        </div>
                }
                <div className="form-inline my-2 my-lg-0">
                    {
                        self.props.current === "login" ?
                            <a href="/register">
                                <button className="btn btn-outline-danger my-2 my-sm-0">Registration</button>
                            </a>
                            :
                            <div></div>
                    }
                </div>
                <div className="form-inline my-2 my-lg-0">
                    {
                        self.props.current === "register" ?
                            <a href="/login">
                                <button className="btn btn-outline-danger my-2 my-sm-0">Login</button>
                            </a>
                            :
                            <div></div>
                    }
                </div>
                <form className="form-inline my-2 my-lg-0">
                    {
                        self.props.current !== "register" && self.props.current !== "login" ?
                            <button className="btn btn-outline-danger my-2 my-sm-0" type="submit"
                                    onClick={self.props.logout}>Logout</button>
                            :
                            <div></div>
                    }
                </form>
            </nav>
        );
    }
}

export default NavBar;