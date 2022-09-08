import React, { Component } from 'react';
import {
    Row, Col, Form, FormGroup, ControlLabel, FormControl
} from 'react-bootstrap';
import Datetime from 'react-datetime';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addRcmAction } from 'Front/actions/rcm';
import SweetAlert from 'react-bootstrap-sweetalert';
import moment from 'moment';
import Checkbox from 'Front/elements/CustomCheckbox/CustomCheckbox.jsx';
import Button from 'Admin/elements/CustomButton/CustomButton.jsx';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import{
    titleOptions
} from 'Front/variables/Variables.jsx';
import { appConstants } from 'Front/_constants/app.constants.js';
import { userListAction } from 'Front/actions/master';
import { rcmTypeListAction } from 'Front/actions/rcm';
let Validator = require('validatorjs');
let formArr = {}
let rules = {
    entity_name: 'required',
    rcm_type: 'required',
    start_date: 'required',  
    end_date: 'required',
 
   
   
};
let mess = {
    required: 'This field is required',
};
let validation = [];
validation = new Validator(this.state, rules, mess);
validation.passes();
validation.fails();

let editApi = false;
const company = localStorage.getItem('companyId');
class AddRcmPopup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formArr: [],
            UserList:[],
            rcm_executives:'',           
            alert:null,
            formData: {
                rcmColomns:[{ key:"col_1", name:"" }],               
                entity_name:this.props.patientData?this.props.patientData.firstName:'',               
                rcm_type:this.props.patientData?this.props.patientData.rcm_type:'',
                start_date:'',                
                customer_name:this.props.patientData?this.props.patientData.customer_name:'',                
                remark:this.props.patientData?this.props.patientData.remark:'',
                
            },
            formValidation:{               
                rcmColomns:[{ key:true , name:true }], 
                },
            showProcessing: false,
            rcmTypeList:[],
            companyList:JSON.parse(company),
        };
        
        this.handle_date = this.handle_date.bind(this);
    }

    
    addMoreField(e,type){
        e.preventDefault();
        let formData = this.state.formData;
        let formValidation = this.state.formValidation;
        formData['rcmColomns'].push({ key:"col_"+(this.state.formData.rcmColomns.length+1) , name:"" });
        formValidation['rcmColomns'].push({ key:true , name:true });
        this.setState({formData:formData,formValidation:formValidation}); 
    }
    
    removeField(e,idx,type){
        e.preventDefault();
        let faqItems = this.state.formData
        let formValidation = this.state.formValidation
          delete faqItems.rcmColomns[idx]; 
          delete formValidation.rcmColomns[idx];
         this.setState({
           formData:faqItems,
           formValidation:formValidation
         });     
     }
    componentDidMount() {

        this.props.userListAction();
        this.props.rcmTypeListAction(this.state)
    }
    
    componentWillReceiveProps(nextProps){ 
        

        if (nextProps.isUserList && nextProps.isUserList !== this.props.isUserList) {
            
            this.state.UserList = nextProps.UserList.data.data.map((key, i) => {
                return { value: key._id, label: key.firstName+" "+key.lastName };
            });
        }  

        if(nextProps.isRcmTypeList !== this.props.isRcmTypeList){
        this.setState({
            rcmTypeList: nextProps.RcmTypeList.data.data
        });
       }

        if(nextProps.isAddRcm !== this.props.isAddRcm){
             this.props.onDismiss();
        }
        
    }



    handleChange = e => { 
        e.preventDefault(); 
                
        let field = this.state.formData;
        
        field[e.target.name]  = e.target.value;        

        if(e.target.name === 'age'){ 
           // var today = new Date();
            field['start_date']  = moment().subtract(e.target.value, 'years');//(today.getFullYear()-e.target.value) + '-' + (today.getMonth() + 1) + '-' + today.getDate();   
                  
        }

        this.setState({formData:field});
         
    };

    handle_date(name,date){ 
       
        let field = this.state.formData;        
        field[name] = moment(date).format('YYYY-MM-DD');        
        this.setState({formData:field});
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
    
    

  handleColomnChange(e,idx,type){
       //e.preventDefault();

       let formData = this.state.formData;
       formData.rcmColomns[idx].name  = e.target.value;

       this.setState({formData:formData})

  }
    addRcm(evt){
        evt.preventDefault();
          
        if(this.allValidate(false)){
             
            let rcm_executives = this.state.rcm_executives;
            let rcm_executives_arr = [];  
            for(let i in rcm_executives){
                rcm_executives_arr.push({id:rcm_executives[i].value,name:rcm_executives[i].label})  
            }
             
             const params = {
                rcm_colomns:this.state.formData.rcmColomns,               
                entity_name:this.state.formData.entity_name,               
                rcm_type:this.state.formData.rcm_type,
                start_date:this.state.formData.start_date,                
                end_date:this.state.formData.end_date,                
                customer_name:this.state.formData.customer_name,                
                remark:this.state.formData.remark,              
                rcm_executives:rcm_executives_arr
             };             
             this.props.addRcmAction(params);
        }
        
    }
   

   

    render() {
        console.log(this.state.rcmTypeList)
        validation = new Validator(this.state.formData, rules, mess);
        validation.passes();
        validation.fails();
        let title = this.state.formData.title;
        return (
            <Row>
                    <Col md={12}>
            {this.state.alert}
                <Form horizontal>
                                    <Col sm={6}>
                                        
                                            
                                            <FormGroup>
                                            <Col componentClass={ControlLabel} sm={4}>
                                               Entity <span className="star">*</span>
                                            </Col>
                                            <Col sm={8}>                                               
                                                 <select className="form-control" name="entity_name" onChange={e => { this.handleChange(e); }}>
                                                    <option value="">Select</option>
                                                    {this.state.companyList.map(function (item) {
                                                            return <option key={item.value} value={item.value}>{item.label}</option>
                                                    })}                                                    
                                                </select>
                                                <span className="errorMsg">                                               
                                                {this.state.formArr.entity_name && validation.errors.first('entity_name')}</span>
                                            </Col>
                                            </FormGroup>


                                            <FormGroup>
                                            <Col componentClass={ControlLabel} sm={4}>
                                             Type  <span className="star">*</span>
                                            </Col>
                                            <Col sm={8}>

                                            <select className="form-control" name="rcm_type" onChange={e => { this.handleChange(e); }}>
                                                    <option value="">Select</option>
                                                    {this.state.rcmTypeList.map(function (item) {
                                                            return <option key={item._id} value={item._id}>{item.rcm_type}</option>
                                                    })}                                                    
                                                </select>
                                                <span className="errorMsg">
                                                {this.state.formArr.rcm_type && validation.errors.first('rcm_type')}</span>
                                            </Col>
                                            </FormGroup>

                                            <FormGroup>
                                            <Col componentClass={ControlLabel} sm={4}>
                                                Start Date <span className="star">*</span>
                                            </Col>
                                            <Col sm={8}>

                                                <Datetime
                                                    timeFormat={false}
                                                    inputProps={{placeholder:"mm/dd/yyyy"}}
                                                    maxDate={new Date()}
                                                    name={"start_date"}
                                                    defaultValue={this.state.formData.start_date}
                                                    onChange={this.handle_date.bind('','start_date')}
                                                />
                                                <span className="errorMsg">
                                                {this.state.start_dateError}
                                                {this.state.formArr.start_date && validation.errors.first('start_date')}</span>
                                            </Col>
                                            </FormGroup>


                                            <FormGroup>
                                            <Col componentClass={ControlLabel} sm={4}>
                                                End Date <span className="star">*</span>
                                            </Col>
                                            <Col sm={8}>

                                                <Datetime
                                                    timeFormat={false}
                                                    inputProps={{placeholder:"mm/dd/yyyy"}}
                                                    maxDate={new Date()}
                                                    name={"end_date"}
                                                    defaultValue={this.state.formData.end_date}
                                                    onChange={this.handle_date.bind('','end_date')}
                                                />
                                                <span className="errorMsg">
                                                {this.state.start_dateError}
                                                {this.state.formArr.end_date && validation.errors.first('end_date')}</span>
                                            </Col>
                                            
                                            </FormGroup>
                                        
                                        </Col>
                                        <Col sm={6}>
                                              
                                        
                                        <FormGroup>
                                            <Col componentClass={ControlLabel} sm={4}>
                                            Other Name
                                            </Col>
                                            <Col sm={8}>

                                                <FormControl type="text" name="customer_name" id="customer_name" defaultValue={this.state.formData.customer_name} onChange={e => { this.handleChange(e); }}/>
                                                <span className="errorMsg">
                                                {this.state.customer_nameError}
                                                {this.state.formArr.customer_name && validation.errors.first('customer_name')}</span>
                                            </Col>
                                        </FormGroup>

                                        <FormGroup>
                                            <Col componentClass={ControlLabel} sm={4}>
                                             Executive <span className="star">*</span>
                                            </Col>
                                            <Col sm={8}>

                                               <Select
                                                    placeholder="Select Executives"
                                                    name="rcm_executives"
                                                    id="rcm_executives"
                                                    closeOnSelect={false}
                                                    multi={true}
                                                    value={this.state.rcm_executives}
                                                    options={this.state.UserList}
                                                    onChange={(value) => this.setState({ rcm_executives: value })}
                                                />
                                                <span className="errorMsg">
                                                {this.state.formArr.rcm_executives && validation.errors.first('rcm_executives')}</span>
                                            </Col>
                                        </FormGroup>


                                        <FormGroup>
                                            <Col componentClass={ControlLabel} sm={4}>
                                            Remark
                                            </Col>
                                            <Col sm={8}>

                                            <FormControl rows="4" componentClass="textarea" name="remark" bsClass="form-control" defaultValue={this.state.formData.remark} onChange={e => { this.handleChange(e); }} />
                                                <span className="errorMsg">
                                                {this.state.remarkError}
                                                {this.state.formArr.remark && validation.errors.first('remark')}</span>
                                            </Col>
                                        </FormGroup>

                                        </Col>

                                        <Col sm={12}> 
                                        <Col sm={12}>
                                        <FormGroup > 
                                        
                                      {this.state.formData.rcmColomns.map((item, idx) => (      
                                            
                                            <Col sm={6} style={{padding:"0 6px"}} >
                                                 RCM Column  <span className="star">*</span>
 
                                                <FormControl type="text" value={this.state.formData.rcmColomns[idx].name} onChange={e => { this.handleColomnChange(e,idx,'name'); }}/>
                                                {idx!==0 &&
                                                <span className="pull-right removeColomn" onClick={e => { this.removeField(e,idx,'removeEducator'); }}>Remove</span>
                                                }
                                               <span className="errorMsg" style={{display: !this.state.formValidation.rcmColomns[idx].name && !this.state.formData.rcmColomns[idx].name ? 'block' : 'none'}}>
                                                    {this.state.msg}
                                                </span>
                                            </Col>
                                            
                                          
                                            
                                       ))} 
                                       
                                       </FormGroup> 
                                        <Button bsStyle="success" className="pull-right btn-fill btn-wd"  onClick={e => { this.addMoreField(e,'educator'); }}>Add More</Button>              
                                        </Col></Col>
                                        

                                                                                  
                                            <Col smOffset={2} sm={6}>
                                            <button type="button" onClick={this.addRcm.bind(this)} className="btn-fill btn-wd btn btn-info">Save</button>
                                            </Col>
                                        
                                        
                                    </Form>
                        </Col>
                    </Row>
        );
    }
}

function mapStateToProps(state) {
    
    return {

        addRcmMessage: state.rcm.addRcm,
        isAddRcm: state.rcm.isAddRcm,
        isAddRcmError: state.rcm.isAddRcmError,

        PatientEditMessage: state.home.PatientEdit,
        isPatientEdit: state.home.isPatientEdit,
        isPatientEditError: state.home.isPatientEditError,

        isUserList: state.master.isUserList,
        isUserListError: state.master.isUserListError,
        UserList: state.master.UserList,   

        RcmTypeList: state.rcm.RcmTypeList,
        isRcmTypeList: state.rcm.isRcmTypeList,
        isRcmTypeError: state.rcm.isRcmTypeError,

    }
}
export default withRouter(connect(mapStateToProps, { userListAction, addRcmAction, rcmTypeListAction })(AddRcmPopup));