import React, { Component } from 'react';
import {
    Nav, NavItem, NavDropdown, MenuItem,
    Col, Row, Modal
} from 'react-bootstrap';
import history from '../../routes/history';

import SweetAlert from 'react-bootstrap-sweetalert';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
const userType = localStorage.getItem('userType');
const userId = localStorage.getItem('_id');
const userName = localStorage.getItem('firstName');
const company = localStorage.getItem('companyId');
const companyName = localStorage.getItem('companyName');
class HeaderLinks extends Component{
 
    constructor(props){
        super(props);
        this.state = {
            chatModal: false,            
            selectedCompany: false,  
            companyList:JSON.parse(company),          
        }
        this.onDismiss = this.onDismiss.bind(this);
        this.hideAlert = this.hideAlert.bind(this);
        this.openChatModel = this.openChatModel.bind(this);
        this.hideChatModel = this.hideChatModel.bind(this);
        this.selectCompany = this.selectCompany.bind(this);
    }

    componentDidMount(){
        if(!localStorage.getItem('selectedCompany'))
        this.setState({ selectedCompany: true })
    }

    componentWillReceiveProps(nextProps){
      
   
         
    }


    Logout() {
        localStorage.removeItem('_id')
        localStorage.removeItem('userName')
        localStorage.removeItem('userType')
        localStorage.removeItem('email')
        localStorage.removeItem('status')
        localStorage.removeItem('token')
        localStorage.removeItem('degree')
        localStorage.removeItem('firstName')
        localStorage.removeItem('lastName')
        localStorage.removeItem('selectedCompany')
        localStorage.removeItem('companyName')
        history.push({ pathname: '/login' });
        window.location.reload(true);
    }
    navigateTo(page) {
        history.push({ pathname: page });
    }

    refreshPage(e) {
        e.preventDefault();

        window.location.reload(true);
    }

    onDismiss() {
        this.setState({ patientModal: false });
        this.successAlert('RCM successfully created');
    }

    successAlert(msg) {

        this.setState({
            alert: (
                <SweetAlert
                    success
                    style={{ display: "block", marginTop: "-100px" }}
                    title="Success"
                    onConfirm={() => this.hideAlert()}
                    onCancel={() => this.hideAlert()}
                    confirmBtnBsStyle="info"
                >
                    {msg}
                </SweetAlert>
            )
        });
    }

    hideAlert() {
        this.setState({
            alert: false
        });

        window.location.reload(true);
    }

    openChatModel(){
      
       this.setState({ chatModal: true });

       this.props.chatModel(true);

    }

    hideChatModel(){
      
       this.setState({ chatModal: false });

       this.props.chatModel(false);

    } 


    selectCompany(e,company_id,company_name){
      
       this.setState({ selectedCompany: false });
       localStorage.setItem('selectedCompany',company_id);
       localStorage.setItem('companyName',company_name);
       window.location.reload(true);
    }

    render() {
       let _this = this;
        
        return (
            <div className="front-nav">
                {this.state.alert}
                <Nav pullRight>

                    <NavItem eventKey={3} onClick={this.refreshPage.bind(this)}>
                        <i className="pe-7s-refresh-2"></i>
                        <br />
                        <span>Refresh</span>
                    </NavItem>

                    {localStorage.getItem('userType') === 'manager' &&
                        <NavItem eventKey={6} onClick={() => this.setState({ patientModal: true })} >
                            <i className="pe-7s-ticket"></i><br />
                            <span>Create New RCM</span>
                        </NavItem>
                    }

                    <LinkContainer to="/dashboard">
                        <NavItem eventKey={4}>
                            <i className="pe-7s-photo-gallery"></i><br />
                            <span>RCM</span>
                        </NavItem>
                    </LinkContainer>  

                    <NavDropdown
                        eventKey={2}
                        title={(
                            <div>
                                <i className="pe-7s-config"></i><br />Settings
                                <p className="hidden-md hidden-lg">
                                    Actions
                                    <b className="caret"></b>
                                </p>
                            </div>
                        )} noCaret id="basic-nav-dropdown-1">

                        <MenuItem onClick={this.navigateTo.bind(this, 'change-password')} eventKey={2.2}><span style={{color:"#000"}} >Change Password</span></MenuItem>
                       
                    </NavDropdown>
                    
                        <NavItem eventKey={3} onClick={this.navigateTo.bind(this, 'shortcut-key')}>
                            <i className="pe-7s-help2"></i><br />
                            <span>Shortcut Key</span>
                        </NavItem>
                    
                    <NavItem eventKey={3} onClick={this.Logout.bind(this)}>
                        <i className="pe-7s-back"></i><br />
                        <span>Logout</span>
                    </NavItem>

                    <NavItem eventKey={3} >
                        <Row>
                            <Col md={9} className="doctor-info">
                                <span>Welcome {userName}</span><br />
                                <span onClick={() => this.setState({ selectedCompany: true })}>{localStorage.getItem('companyName')}</span>
                            </Col> 
                            <Col md={3} className="doctor-icon">
                                <img style={{ width: '30px', margin: '4px' }} src="images/avatar.png" alt="Exe Img" />
                             </Col>
                        </Row>
                    </NavItem>
             
                </Nav>

               

               
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {      
          
    }

  }
  export default withRouter(connect(mapStateToProps, {  } )(HeaderLinks));