import React, { Component } from 'react';
import {
    Navbar, Nav, NavItem, NavDropdown, MenuItem,
    FormGroup, FormControl, InputGroup
} from 'react-bootstrap';

class HeaderLinks extends Component{

    Logout(){
          localStorage.removeItem('_id')
          localStorage.removeItem('userName')
          localStorage.removeItem('userType')
          localStorage.removeItem('email')
          localStorage.removeItem('status')
          localStorage.removeItem('token')

          window.location.href = "/login";
    }

    render(){
        return(
            <div>
                
                <Nav pullRight>
                    
                    
                    
                    <NavDropdown
                        eventKey={4}
                        title={(
                            <div>
                                <i className="fa fa-list"></i>
                                <p className="hidden-md hidden-lg">
                                    More
                                    <b className="caret"></b>
                                </p>
                            </div>
                        )} noCaret id="basic-nav-dropdown-3" bsClass="dropdown-with-icons dropdown">
                        
                        <MenuItem eventKey={4.3}><i className="pe-7s-tools"></i> Settings</MenuItem>
                        <MenuItem divider />
                        <MenuItem onClick={this.Logout.bind(this)} eventKey={4.5}><div className="text-danger"><i className="pe-7s-close-circle"></i> Log out</div></MenuItem>
                    </NavDropdown>
                </Nav>
            </div>
        );
    }
}
export default HeaderLinks;
