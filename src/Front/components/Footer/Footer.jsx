import React, { Component } from 'react';

class Footer extends Component {
    render(){
        return (
            <footer className={"footer" + (this.props.transparent !== undefined ? " footer-transparent":"")}>
                <div className={"container" + (this.props.fluid !== undefined ? "-fluid":"")}>
                    {/*<nav className="pull-left">
                        <ul>
                            <li>
                                <a href="#pablo">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#pablo">
                                    Company
                                </a>
                            </li>
                            <li>
                                <a href="#pablo">
                                    Portfolio
                                </a>
                            </li>
                            <li>
                                <a href="#pablo">
                                    Blog
                                </a>
                            </li>
                        </ul>
                    </nav>*/}
                    <p className="copyright pull-right">
                       &copy; {1900 + (new Date()).getYear()} <a href="http://dbllp.in/">Dbllp RCM</a>, Powered by <i className="fa fa-globe heart"></i> Desai Bhansali & Associates LLP <a target="_blank" href="http://dbllp.in/" rel="noopener noreferrer"><i class="fa fa-external-link-square" aria-hidden="true"></i></a>
                    </p>
                </div>
            </footer>
        );
    }
}
export default Footer;
