import React, { Component } from 'react';
import {
    Grid, Row, Col,
    FormGroup, ControlLabel, FormControl
} from 'react-bootstrap';

import Card from 'Front/components/Card/Card.jsx';

import Button from 'Front/elements/CustomButton/CustomButton.jsx';
import Checkbox from 'Front/elements/CustomCheckbox/CustomCheckbox.jsx';

import { connect } from 'react-redux';
import { withRouter , Link } from 'react-router-dom';
import { sendOTPAction , submitOTPAction , updatePasswordAction } from 'Front/actions/login';
import loadingImg from 'Front/assets/img/loading.gif';
import SweetAlert from 'react-bootstrap-sweetalert';

let Validator = require('validatorjs');
let formArr = {}
let rules = {
  email: 'required',
};
let mess = {
  required: 'This field is required',
};
let validation = [];
validation = new Validator(this.state, rules, mess);
validation.passes();
validation.fails();

class LoginPage extends Component{

    constructor(props){
        super(props);
        this.state = {
          cardHidden: true,
          formArr:[],
          forgetEmail:false,
          formData:{
            email: "",
            otp:"",
            password:"",
          },
          isLogin:true,
          showProcessing:false,
          invalidOTP:false,
          invalidEmail:false,
          otpVerification:false,
          alert: null,
        }

        this.hideAlert = this.hideAlert.bind(this);
    }

    componentDidMount(){

        setTimeout(function() { this.setState({cardHidden: false}); }.bind(this), 700);
    }

    successAlert(){
        this.setState({
            alert: (
                <SweetAlert
                    success
                    style={{display: "block",marginTop: "-100px"}}
                    title="Success"
                    onConfirm={() => this.hideAlert()}
                    onCancel={() => this.hideAlert()}
                    confirmBtnBsStyle="info"
                >
                    Password successfully updated!
                </SweetAlert>
            )
        });
    }

     hideAlert(){
        this.setState({
            alert: null,
        });        

        this.props.history.push(`/login`)
     }


 
    componentWillReceiveProps(nextProps){ 
        if(nextProps.isSendOtp !== this.props.isSendOtp){ 
             this.setState({ showProcessing: false , forgetEmail:true }); 
        }

        if(nextProps.isSendOtpError !== this.props.isSendOtpError){ 
             this.setState({ showProcessing: false , invalidEmail:true });            
        }

        if(nextProps.isSubmitOtp !== this.props.isSubmitOtp){ 
             this.setState({ showProcessing: false , invalidOTP:false, otpVerification:true}); 
        }

        if(nextProps.isSubmitOtpError !== this.props.isSubmitOtpError){ 
             this.setState({ showProcessing: false , invalidOTP:true }); 
        } 


        if(nextProps.isUpdatePassword !== this.props.isUpdatePassword){ 
             this.setState({ showProcessing: false }); 
             this.successAlert();
        }
    }

    userLogin(evt){
        evt.preventDefault();

        const _this = this;

        if(this.allValidate(false)){
          _this.setState({ showProcessing: true });
          _this.props.sendOTPAction(this.state);
        }
      }


    submitOTP(evt){
        evt.preventDefault();

          this.setState({ showProcessing: true });
          this.props.submitOTPAction(this.state);
       
      }

    updatePassword(evt){
        evt.preventDefault();

          this.setState({ showProcessing: true });
          this.props.updatePasswordAction(this.state);
       
      }

   allValidate(check){
    if(!check){
      formArr = []
      Object.keys(rules).forEach(function(key) {
          formArr[key]= "TT";
      });
      this.setState({
          formArr
      });
    }
    if(validation.passes()){
      return 1;
    }
  }

    handleChange = e => { 
      e.preventDefault();      
      let field = this.state.formData;
      field[e.target.name]  = e.target.value;
      this.setState({
        formData:field,
        invalidOTP:false,
        invalidEmail:false,
      });
    };

    onKeyDownSubmit(event){ 
        let key = event.which || event.keyCode;
        if(key === 13){
            document.getElementById('login-btn').click();
        }
    }

    render(){

         validation = new Validator(this.state.formData, rules, mess);
         validation.passes();
         validation.fails();

        return (
            <Grid className="forgetpassword">
                <Row>
                    {this.state.alert}
                    <Col md={4} sm={6} mdOffset={4} smOffset={3}>

                        <form>
                        <div className="actionProcess"  style={{display: this.state.showProcessing ? 'block' : 'none' }}>
                          <img src={loadingImg} alt="Loading" width="40px" />
                          <center>Processing In - Please Wait</center>
                        </div>
                            <Card
                                hidden={this.state.cardHidden}
                                textCenter
                                title="Forget Password"
                                content={
                                    <div>
                                       <FormGroup style={{display:!this.state.forgetEmail ? "block":"none"}}>
                                            <ControlLabel>
                                               Email ADDRESS
                                            </ControlLabel>
                                            <FormControl
                                                placeholder="Enter Your Email"
                                                type="email"
                                                id="email"
                                                name="email"
                                                onChange={e => { this.handleChange(e); }}
                                                onKeyDown={e => { this.onKeyDownSubmit(e); }}
                                            />
                                            <span className="errorMsg"  style={{display:this.state.invalidEmail ? "block":"none"}}>Invalid Email!</span>
                                            <span className="errorMsg">{this.state.formArr.email && validation.errors.first('email')}</span>
                                        </FormGroup>

                                        <FormGroup style={{display:this.state.forgetEmail && !this.state.otpVerification ? "block":"none"}}>
                                            <b style={{color:"red"}}>6 digit OTP has been sent to your email.</b><br></br>
                                            <ControlLabel>
                                               OTP
                                            </ControlLabel>
                                            <FormControl
                                                placeholder="Enter OTP"
                                                type="number"
                                                id="otp"
                                                name="otp"
                                                onChange={e => { this.handleChange(e); }}                                               
                                            />
                                            <span className="errorMsg"  style={{display:this.state.invalidOTP ? "block":"none"}}>Invalid OTP</span>
                                        </FormGroup>

                                        
                                        <FormGroup  style={{display:this.state.forgetEmail && this.state.otpVerification ? "block":"none"}}>
                                            <ControlLabel>
                                                New Password
                                            </ControlLabel>
                                            <FormControl
                                                placeholder="Enter New Password"
                                                type="password"
                                                id="password"
                                                name="password"
                                                onChange={e => { this.handleChange(e); }}                                                
                                            />
                                             
                                        </FormGroup>
                                       
                                        
                                        
                                        
                                         {this.state.alert &&
                                          <div className="errorMsg"> {this.state.alert} </div>
                                         }
                                    </div>
                                }
                                legend={
                                    <FormGroup style={{minHeight:"40px"}} >
                                    <Link style={{float:"left"}} to={{ pathname: `/login`}} >Cancel</Link>
                                    <Button style={{float:"right",display:!this.state.forgetEmail ? "block":"none"}} id={'login-btn'} onClick={this.userLogin.bind(this)} bsStyle="info" fill wd>
                                        Submit
                                    </Button>
                                    <Button style={{float:"right",display:this.state.forgetEmail && !this.state.otpVerification ? "block":"none"}} id={'login-btn'} onClick={this.submitOTP.bind(this)} bsStyle="info" fill wd>
                                        Submit
                                    </Button>
                                    <Button style={{float:"right",display:this.state.forgetEmail && this.state.otpVerification  ? "block":"none"}} id={'login-btn'} onClick={this.updatePassword.bind(this)} bsStyle="info" fill wd>
                                        Submit
                                    </Button>
                                    </FormGroup>
                                }
                                ftTextCenter
                            />
                        </form>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

function mapStateToProps(state) {

  return {
    
    isSendOtp: state.login.isSendOtp,
    SendOtp: state.login.SendOtp,
    isSendOtpError: state.login.isSendOtpError,

    isSubmitOtp: state.login.isSubmitOtp,
    SubmitOtp: state.login.SubmitOtp,
    isSubmitOtpError: state.login.isSubmitOtpError,

    UpdatePassword: state.login.UpdatePassword,   
    isUpdatePassword: state.login.isUpdatePassword,
    isUpdatePasswordError: state.login.isUpdatePasswordError,

  }
}
export default withRouter(connect(mapStateToProps, { sendOTPAction , submitOTPAction, updatePasswordAction } )(LoginPage));
