import React, {Component} from 'react';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render(){
        let self = this;
        var style = {
            backgroundColor: "#F8F8F8",
            borderTop: "1px solid #E7E7E7",
            textAlign: "center",
            padding: "20px",
            position: "fixed",
            left: "0",
            bottom: "0",
            height: "120px",
            width: "100%",
        }

        var phantom = {
            display: 'block',
            padding: '20px',
            height: '120px',
            width: '100%',
        }

        return (
            <div>
                <div style={phantom} />
                <div style={style} className="footer">
                    <div className="container">
                        <ul className="list-unstyled list-inline text-center">
                            <li className="list-inline-item">
                                <h5 className="mb-1">CONFERENCE-PRO</h5>
                            </li>
                            <li className="list-inline-item">
                                <a href="#!" className="btn btn-dark btn-rounded">Donate!</a>
                            </li>
                        </ul>
                    </div>

                    <div className="footer-copyright text-center py-3">© 2020 Copyright:
                        <a href="https://mdbootstrap.com/"> ConferencePro.com</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;