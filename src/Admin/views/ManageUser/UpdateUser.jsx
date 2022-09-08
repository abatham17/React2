import React, { Component } from 'react';
import {
    FormGroup, ControlLabel, FormControl,
    Grid, Row, Col
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Card from 'Admin/components/Card/Card.jsx';
import Button from 'Admin/elements/CustomButton/CustomButton.jsx';
import { updateUserAction } from 'Admin/actions/user';

import { companyListAction } from 'Admin/actions/clinic';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

class UpdateUser extends Component {
    constructor(props) {
        super(props);
        this.vForm = this.refs.vForm;
        this.state = {
            companyList: [],
            isEditing: false,
            user_nameError: null,
            emailError:null,
            fileError: null,
            passwordError:null,
            confirm_passwordError:null,
            groupError:null,
            clinicError:null,
            statusError:null,
            first_nameError:null,
            last_nameError:null,
            phoneError:null,
            company:this.props.location.state.row.companyId,
         
            status:this.props.location.state.row.status,
            phone:this.props.location.state.row.phone,
            email:this.props.location.state.row.email,
            group:this.props.location.state.row.userType,
            user_name: this.props.location.state.row.userName,
            first_name: this.props.location.state.row.firstName,
            last_name: this.props.location.state.row.lastName,
            degree:this.props.location.state.row.degree,
            formData: {
                email: this.props.location.state.row.email,
                password: "",
                confirm_password: "",         
                file: this.props.location.state.row.image,
                id: this.props.location.state.row._id,
            },
            tempFile:'',
            companyDisabled:false
        };

        this.fileChangedHandler = this.fileChangedHandler.bind(this);
       
    }

    handleEmail(event) {
        this.setState({
            email: event.target.value
        });
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        re.test(event.target.value) === false ? this.setState({ emailError: (<small className="text-danger">Email is required and format should be <i>john@doe.com</i>.</small>) }) : this.setState({ emailError: null });
    }
    handlePasswordChange(event) {
        this.setState({
            password: event.target.value
        });
        event.target.value.length < 6 ? this.setState({ passwordError: (<small className="text-danger">You must enter a password of at least 6 characters.</small>) }) : this.setState({ passwordError: null });
    }
    handleCfPasswordChange(event) {
        this.setState({
            confirm_password: event.target.value
        });
        event.target.value !== this.state.password ? this.setState({ confirm_passwordError: (<small className="text-danger">Passwords do not match.</small>) }) : this.setState({ confirm_passwordError: null });
    }

    handleSelect(event) {
        this.setState({
            group: event.target.value
        });
        event.target.value === "" ? this.setState({ groupError: (<small className="text-danger">Group is required</small>) }) : this.setState({ groupError: null });
    }
   
    handleStatus(event) {
        this.setState({
            status: event.target.value
        });
        event.target.value === "" ? this.setState({ statusError: (<small className="text-danger">Status is required</small>) }) : this.setState({ statusError: null });
    }

    handlePhone(event){
        this.setState({
            phone: event.target.value
        });
        var digitRex = /^\d+$/;
        digitRex.test(event.target.value) === false ? this.setState({ phoneError: (<small className="text-danger">Phone number has to be a number.</small>) }) : (event.target.value.length !== 10) ? this.setState({ phoneError: (<small className="text-danger">Phone number at 10 digit.</small>) }) : this.setState({ phoneError: null });
    }
    handleTypeValidation(event) {

        var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        emailRex.test(this.state.email) === false ? this.setState({ emailError: (<small className="text-danger">Email is required and format should be <i>john@doe.com</i>.</small>) }) : this.setState({ emailError: null });

        this.state.user_name === "" ? this.setState({ user_nameError: (<small className="text-danger">Username is required.</small>) }) : this.setState({ type_textError: null });

        this.state.status === "" ? this.setState({ statusError: (<small className="text-danger">Status is required</small>) }) : this.setState({ statusError: null });

        this.state.first_name === "" ? this.setState({ first_nameError: (<small className="text-danger">First name is required.</small>) }) : this.setState({ first_nameError: null });

        this.state.last_name === "" ? this.setState({ last_nameError: (<small className="text-danger">Last name is required.</small>) }) : this.setState({ last_nameError: null });

        var digitRex = /^\d+$/;

        digitRex.test(this.state.phone) === false ? this.setState({ phoneError: (<small className="text-danger">Phone number has to be a number.</small>) }) : (this.state.phone.length != 10) ? this.setState({ phoneError: (<small className="text-danger">Phone number at 10 digit.</small>) }) : this.setState({ phoneError: null });

      
        if(this.state.user_name != '' && this.state.user_nameError == null && this.state.emailError == null && this.state.passwordError == null && this.state.confirm_passwordError == null ){

         
            this.props.updateUserAction(this.state);


        }
     
    }

    fileChangedHandler = (event, elename) => {
        let file = event.target.files[0];
        let formData = this.state.formData;
        formData['file'] = file.name;
        this.setState({tempFile:file,formData:formData});
    }
 
   

    componentDidMount() {
     
        this.props.companyListAction(this.state)
       
    }
    componentWillReceiveProps(nextProps) {

      

       if (nextProps.isCompanyList !== this.props.isCompanyList) {

            this.state.companyList = nextProps.CompanyList.data.data.map((key, i) => {
                return { value: key._id, label: key.name };
            });
        }
      
        if (nextProps.isUpdateUser !== this.props.isUpdateUser) {

            this.props.handleClick('success', nextProps.UpdateUserData.msg)
            this.props.history.push(`/admin/user-list`)
        }

    }

    render() {
    	console.log(this.props.location.state.row)
    	console.log(this.state.company)
        return (
            <div className="main-content" style={{ padding: '15px 0px' }}>

                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title="Add/Edit User"
                                content={
                                    <form>
                                        <Row>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <ControlLabel>Username: <span className="star">*</span></ControlLabel>
                                                    <FormControl type="text" readOnly name="user_name" value={this.state.user_name} onChange={(event) => {
                                                        this.setState({ user_name: event.target.value });
                                                        event.target.value === "" ? this.setState({ user_nameError: (<small className="text-danger">Username is required.</small>) }) : this.setState({ user_nameError: null });
                                                    }} />
                                                    {this.state.user_nameError}
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <ControlLabel>Email adress: <span className="star">*</span></ControlLabel>
                                                    <FormControl type="text" name="email" value={this.state.email} onChange={(event) => this.handleEmail(event)} />
                                                    {this.state.emailError}
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <ControlLabel>Password: <span className="star">*</span></ControlLabel>
                                                    <FormControl type="password" name="password" onChange={(event) => this.handlePasswordChange(event)} />
                                                    {this.state.passwordError}
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <ControlLabel>Confirm password: <span className="star">*</span></ControlLabel>
                                                    <FormControl type="password" name="confirm_password" onChange={(event) => this.handleCfPasswordChange(event)} />
                                                    {this.state.confirm_passwordError}
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <ControlLabel>Group: <span className="star">*</span></ControlLabel>
                                                    <select className="form-control" name="group" value={this.state.group} onChange={(event) => this.handleSelect(event)}>
                                                        <option value="">Select Group</option>
                                                        <option value="executive">Executive</option>
                                                        <option value="manager">Manager</option>
                                                    </select>
                                                    {this.state.groupError}
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <ControlLabel>Company: <span className="star">*</span></ControlLabel>
                                                   <Select
                                                    placeholder="Select Company"
                                                    disabled={this.state.companyDisabled}
                                                    name="company"
                                                    id="company"
                                                    closeOnSelect={false}
                                                    multi={true}
                                                    value={this.state.company}
                                                    options={this.state.companyList}
                                                    onChange={(value) => this.setState({ company: value })}
                                                />
                                                    {this.state.companyError}
                                                </FormGroup>
                                            </Col>
                                            
                                        </Row>
                                        <Row>
                                        <Col md={6}>
                                                <FormGroup>
                                                    <ControlLabel>Status: <span className="star">*</span></ControlLabel>
                                                    <select className="form-control" name="status" value={this.state.status} onChange={(event) => this.handleStatus(event)}>
                                                        <option value="1">Enabled</option>
                                                        <option value="0">Disbled</option>
                                                    </select>
                                                    {this.state.statusError}
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <ControlLabel>First Name: <span className="star">*</span></ControlLabel>
                                                    <FormControl type="text" name="first_name" value={this.state.first_name} onChange={(event) => {
                                                        this.setState({ first_name: event.target.value });
                                                        event.target.value === "" ? this.setState({ first_nameError: (<small className="text-danger">First name is required.</small>) }) : this.setState({ first_nameError: null });
                                                    }} />
                                                    {this.state.first_nameError}
                                                </FormGroup>
                                            </Col>
                                           
                                        </Row>
                                        <Row>
                                        <Col md={6}>
                                                <FormGroup>
                                                    <ControlLabel>Last Name: <span className="star">*</span></ControlLabel>
                                                    <FormControl type="text" name="last_name" value={this.state.last_name} onChange={(event) => {
                                                        this.setState({ last_name: event.target.value });
                                                        event.target.value === "" ? this.setState({ last_nameError: (<small className="text-danger">Last name is required.</small>) }) : this.setState({ last_nameError: null });
                                                    }} />
                                                    {this.state.last_nameError}
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <ControlLabel>Phone: <span className="star">*</span></ControlLabel>
                                                    <FormControl type="text" name="phone" value={this.state.phone} onChange={(event) => this.handlePhone(event)} />
                                                    {this.state.phoneError}
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        
                                        <Button type="button" bsStyle="info" fill pullRight onClick={this.handleTypeValidation.bind(this)}>
                                            Save
                                            </Button>
                                        <div className="clearfix"></div>
                                    </form>
                                }
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}


function mapStateToProps(state) {

    return {
        updateUserMessage: state.user.message,
        isUpdateUser: state.user.isUpdateUser,
        UpdateUserData: state.user.UpdateUserData,
        isUpdateUserError: state.user.isUpdateUserError,

        CompanyList: state.clinic.CompanyList,
        isCompanyList: state.clinic.isCompanyList,
        isCompanyListListError: state.clinic.isCompanyListListError,


        isUploadFile: state.user.isUploadFile,
        isUploadFileError: state.user.isUploadFileError,
        uploadFile: state.user.uploadFile,

    }
}
export default withRouter(connect(mapStateToProps, { updateUserAction, companyListAction})(UpdateUser));
