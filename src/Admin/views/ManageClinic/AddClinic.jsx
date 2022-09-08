import React, { Component } from 'react';
import {Grid, Row, Col,Form, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Card from 'Admin/components/Card/Card.jsx';
import Datetime from 'react-datetime'; 
import Button from 'Admin/elements/CustomButton/CustomButton.jsx';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { weekOptions } from 'Admin/variables/Variables.jsx';
import { uploadFileAction } from 'Admin/actions/master';
import { countryListAction } from 'Admin/actions/master';
import { stateListAction } from 'Admin/actions/master';
import { addcompanyAction } from 'Admin/actions/clinic';
import loadingImg from 'Admin/assets/img/loading.gif';
import moment from 'moment';
import $ from "jquery";
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

let Validator = require('validatorjs');
let formArr = {}
let rules = {
    company_name: 'required',
    short_name: 'required',
    address: 'required',
    city: 'required',
    state: 'required',
    country: 'required',
    pin_code: 'required|numeric',
    email: 'required|email',
    phoneno: 'required|numeric',
  
};
let mess = {
    required: 'This field is required',
    email:'Invalid Email',
    numeric:'Enter numeric digits'
};
let validation = [];
validation = new Validator(this.state, rules, mess);
validation.passes();
validation.fails();

class Addcompany extends Component{
    constructor(props){
        super(props);
        this.vForm = this.refs.vForm;
        this.state = {
            formArr:[],
            isLogin:true,
            showProcessing:false,
            week_off:null,
        
            imagePreviewUrl:'',
            // Elements
            formData:{
                company_name: "",
                short_name: "",
                company_website:'',
                address: "",
                city: "",
                state: "",
                country: "",
                pin_code: "",
                phoneno: "",
                mobile_no:'',
               
                
                email: "",
                start_time:'',
                end_time:'',
                start_time2:'',
                end_time2:'',
           
              
                status:'Active',
            
                logo_image:'',
                logo:'',
            },

            //Lists
            stateList :[],
            countryList :[],
  
            country_id:'',
            
            multiInput:false,
            selectedDays: [],

        }
        this.handleCountryChange=this.handleCountryChange.bind(this);
      
       
    }
    componentDidMount(){
        this.props.countryListAction(this.state)
    }
    componentWillReceiveProps(nextProps){

        if(nextProps.isCountryList !== this.props.isCountryList){
            this.setState({
                countryList: nextProps.countryList.data.data
            });
        }
        if(nextProps.isStateList !== this.props.isStateList){
            this.setState({
                stateList: nextProps.stateList.data.data
            });
        }

        if(nextProps.isAddCompanyError !== this.props.isAddCompanyError){
          this.setState({ showProcessing: false });
          if(nextProps.addCompanyResponse.errors){
              nextProps.addCompanyResponse.errors.map((key,i) => {

                  this.setState({[(key.param)+"Error"]:key.msg})
              });
          }
        }
        if (nextProps.isAddCompany !== this.props.isAddCompany && nextProps.addCompanyResponse.status === 'Success' && this.state.formData.company_name !== '') {

            this.props.handleClick('success', nextProps.addCompanyResponse.msg)
            this.props.history.push(`/admin/company-list`)
        }

      

    }

    addcompany(evt){

        evt.preventDefault();
        const _this = this;
        if(this.allValidate(false)){
          _this.setState({ showProcessing: true });
          _this.props.addcompanyAction(this.state);
        }
        validation.errors;
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
        this.setState({formData:field});

    };
    handleCountryChange(event) {
        let data = this.state.formData;
        data["country"]  = event.target[event.target.selectedIndex].text;
        data["country_id"]  = event.target.value;
        this.setState({formData: data});
        this.props.stateListAction(event.target.value);
    }

    handleStateChange(event) {
        let data = this.state.formData;
        data["state"]  = event.target[event.target.selectedIndex].text;
        data["state_id"]  = event.target.value;
        this.setState({formData: data});
    }

  

    handleChangeTime(data){

       let mytime = moment(new Date(data)).format('h:mm A');
       let data1 = this.state.formData;
       data1["start_time"]  = mytime;
       this.setState({formData: data1});
    }

     handleChangeTime2(data){

        let mytime = moment(new Date(data)).format('h:mm A');
        let data1 = this.state.formData;
        data1["end_time"]  = mytime;
        this.setState({formData: data1});
     }
     handleChangeTime3(data){

        let mytime = moment(new Date(data)).format('h:mm A');
        let data1 = this.state.formData;
        data1["start_time2"]  = mytime;
        this.setState({formData: data1});
     }
     handleChangeTime4(data){

        let mytime = moment(new Date(data)).format('h:mm A');
        let data1 = this.state.formData;
        data1["end_time2"]  = mytime;
        this.setState({formData: data1});

     }
 

     handleWeekOff(field){
    		let entry = [];
        let data = this.state.formData;
        field.map((key, index) =>
    		  entry.push({  "day":key.value,
            				"name":key.label})
    		);
        data["week_off"]  = entry;
        this.setState({formData: data});
     }

 

    

    render(){
      
        validation = new Validator(this.state.formData, rules, mess);
        validation.passes();
        validation.fails();
        
        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Form horizontal>
                            <div className="actionProcess"  style={{display: this.state.showProcessing ? 'block' : 'none' }}>
                                <img src={loadingImg} alt="Loading" width="40px" />
                                <center>Logging In - Please Wait</center>
                            </div>
                                <Card
                                    title={
                                        <legend>Company Details</legend>
                                    }
                                    content={
                                        <div>
                                            <FormGroup>
                                                
                                                <Col sm={6}>
                                                    <Col componentClass={ControlLabel} >
                                                        Company Name
                                                    </Col>
                                                    <FormControl type="text" name="company_name" onChange={e => { this.handleChange(e); }}/>
                                                    <span className="errorMsg">{this.state.company_nameError}{this.state.formArr.company_name && validation.errors.first('company_name')}</span>
                                                </Col>
                                                <Col sm={6}>
                                                    <Col componentClass={ControlLabel} >
                                                    Company Short Name
                                                    </Col>
                                                    <FormControl type="text" name="short_name" onChange={e => { this.handleChange(e); }}/>
                                                    <span className="errorMsg" refs="short_name">{this.state.short_nameError}{this.state.formArr.short_name && validation.errors.first('short_name')}</span>
                                                </Col>
                                                <Col sm={6}>
                                                    <Col componentClass={ControlLabel}>
                                                     Company Website
                                                    </Col>
                                                    <FormControl type="text" name="company_website" onChange={e => { this.handleChange(e); }}/>
                                                </Col>
                                                <Col sm={6}>
                                                    <Col componentClass={ControlLabel}>
                                                        Address
                                                    </Col>
                                                    <FormControl componentClass="textarea" name="address" onChange={e => { this.handleChange(e); }}/>
                                                    <span className="errorMsg">{this.state.addressError}{this.state.formArr.address && validation.errors.first('address')}</span>
                                                </Col>    
                                            </FormGroup>
                                            <FormGroup>
                                            
                                                <Col sm={3}>
                                                    <Col componentClass={ControlLabel}>
                                                        City
                                                    </Col>
                                                    <FormControl type="text" name="city" onChange={e => { this.handleChange(e); }}/>
                                                    <span className="errorMsg">{this.state.cityError}{this.state.formArr.city && validation.errors.first('city')}</span>
                                                </Col>
                                                <Col sm={3}>
                                                    <Col componentClass={ControlLabel}>
                                                        Country
                                                    </Col>
                                                    <FormControl  componentClass="select" name="country" onChange={e => { this.handleChange(e);this.handleCountryChange(e); }}>
                                                    <option value="">Please select</option>
                                                    {this.state.countryList.map(function (item) {
                                                        return <option key={item._id} value={item._id}>{item.name}</option>
                                                    })}</FormControl>
                                                    <span className="errorMsg">{this.state.countryError}{this.state.formArr.country && validation.errors.first('country')}</span>
                                                </Col>
                                                <Col sm={3}>
                                                    <Col componentClass={ControlLabel}>
                                                        State
                                                    </Col>
                                                    <FormControl  componentClass="select" name="state" onChange={e => { this.handleChange(e);this.handleStateChange(e); }}>
                                                    <option value="">Please select</option>
                                                    {this.state.stateList.map(function (item) {
                                                        return <option key={item._id} value={item._id}>{item.name}</option>
                                                    })}</FormControl>
                                                    <span className="errorMsg">{this.state.stateError}{this.state.formArr.state && validation.errors.first('state')}</span>
                                                </Col>
                                                <Col sm={3}>
                                                    <Col componentClass={ControlLabel}>
                                                        Pin Code
                                                    </Col>
                                                    <FormControl type="text" name="pin_code" onChange={e => { this.handleChange(e); }}/>
                                                    <span className="errorMsg">{this.state.pin_codeError}{this.state.formArr.pin_code && validation.errors.first('pin_code')}</span>
                                                </Col>
                                            </FormGroup>
                                        </div>
                                    }
                                />
                                <Card
                                    title={
                                        <legend>Contact Info</legend>
                                    }
                                    content={
                                        <div>
                                            <FormGroup>
                                                <Col sm={4}>
                                                    <Col componentClass={ControlLabel}>
                                                        Phone No
                                                    </Col>
                                                    <FormControl type="text" name="phoneno" onChange={e => { this.handleChange(e); }}/>
                                                    <span className="errorMsg">{this.state.phonenoError}{this.state.formArr.phoneno && validation.errors.first('phoneno')}</span>
                                                </Col>
                                                <Col sm={4}>
                                                    <Col componentClass={ControlLabel}>
                                                        Mobile No
                                                    </Col>
                                                    <FormControl type="text" name="mobile_no" onChange={e => { this.handleChange(e); }}/>
                                                </Col>
                                                
                                                <Col sm={4}>
                                                    <Col componentClass={ControlLabel}>
                                                        Company Email
                                                    </Col>
                                                    <FormControl type="text" name="email" onChange={e => { this.handleChange(e); }} />
                                                    <span className="errorMsg" refs="short_name">{this.state.emailError}{this.state.formArr.email && validation.errors.first('email')}</span>
                                                </Col>
                                            </FormGroup>
                                            <Button fill bsStyle="info" type="button" onClick={this.addcompany.bind(this)}>Submit</Button>
                                        </div>
                                    }
                                />
                                
                                
                            </Form>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
                              
    }
}

function mapStateToProps(state) {

    return {

      stateList: state.master.stateList,
      isStateList: state.master.isStateList,
      isStateListError: state.master.isStateListError,

      countryList: state.master.countryList,
      isCountryList: state.master.isCountryList,
      isCountryListError: state.master.isCountryListError,

      isAddCompany:state.clinic.isAddCompany,
      isAddCompanyError:state.clinic.isAddCompanyError,
      addCompanyResponse:state.clinic.addCompanyResponse,

      isUploadFile:state.master.isUploadFile,
      isUploadFileError: state.master.isUploadFileError,
      uploadFile: state.master.uploadFile,

    }
}
// export default Addcompany;
export default withRouter(connect(mapStateToProps, { countryListAction,stateListAction,addcompanyAction,uploadFileAction} )(Addcompany));
