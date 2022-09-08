import React, { Component } from 'react';
import {
    FormGroup, ControlLabel, FormControl,
    Grid, Row, Col
} from 'react-bootstrap';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Card from 'Admin/components/Card/Card.jsx';
import Button from 'Admin/elements/CustomButton/CustomButton.jsx';
import { addUserAction } from 'Admin/actions/user'; 
import { uploadFileAction } from 'Admin/actions/user';
import { companyListAction } from 'Admin/actions/clinic';
import { specializationListAction } from 'Admin/actions/specialization';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class AddUser extends Component {
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
            companyError:null,
            statusError:null,
            first_nameError:null,
            last_nameError:null,
            phoneError:null,
            specialization:null,
            specialization2:null,
            specializationError:null,
            degreeError:null,
            formData: {
                file: ""
            },
            tempFile:'',
            companyDisabled:false
        };

    
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
        if(event.target.value == 'executive'){            
           this.setState({
            companyDisabled: true,
            company:[]
           });
        }else{
            this.setState({
            companyDisabled: false
           });
        }
        this.setState({
            group: event.target.value
        });
        event.target.value === "" ? this.setState({ groupError: (<small className="text-danger">Group is required</small>) }) : this.setState({ groupError: null });
    }
    handlecompany(event) {

        let index = event.target.selectedIndex;

        this.setState({
            company: event.target.value,
            company_name: event.target[index].text
        });
        event.target.value === "" ? this.setState({ companyError: (<small className="text-danger">company is required</small>) }) : this.setState({ companyError: null });
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

        this.state.password.length < 6 ? this.setState({ passwordError: (<small className="text-danger">You must enter a password of at least 6 characters.</small>) }) : this.setState({ type_textError: null });

        this.state.confirm_password !== this.state.password ? this.setState({ confirm_passwordError: (<small className="text-danger">Passwords do not match.</small>) }) : this.setState({ confirm_passwordError: null });

        this.state.group === "" ? this.setState({ groupError: (<small className="text-danger">Group is required.</small>) }) : this.setState({ groupError: null });

        this.state.company === "" ? this.setState({ companyError: (<small className="text-danger">company is required</small>) }) : this.setState({ companyError: null });

        this.state.status === "" ? this.setState({ statusError: (<small className="text-danger">Status is required</small>) }) : this.setState({ statusError: null });

        this.state.first_name === "" ? this.setState({ first_nameError: (<small className="text-danger">First name is required.</small>) }) : this.setState({ first_nameError: null });

        this.state.last_name === "" ? this.setState({ last_nameError: (<small className="text-danger">Last name is required.</small>) }) : this.setState({ last_nameError: null });

        var digitRex = /^\d+$/;

        digitRex.test(this.state.phone) === false ? this.setState({ phoneError: (<small className="text-danger">Phone number has to be a number.</small>) }) : (this.state.phone.length != 10) ? this.setState({ phoneError: (<small className="text-danger">Phone number at 10 digit.</small>) }) : this.setState({ phoneError: null });

        this.state.degree === "" ? this.setState({ degreeError: (<small className="text-danger">Degree is required.</small>) }):this.setState({ degreeError: null });

        if(this.state.user_name != '' && this.state.user_nameError == null && this.state.emailError == null && this.state.passwordError == null && this.state.confirm_passwordError == null && this.state.groupError == null && this.state.companyError == null && this.state.statusError == null && this.state.first_nameError == null && this.state.last_nameError == null && this.state.phoneError == null && this.state.specializationError == null && this.state.degreeError == null){

            //this.addUserHandler();

           // this.props.uploadFileAction(this.state.tempFile);

            this.props.addUserAction(this.state);


        }
    }

    handleChange = e => {

        e.preventDefault();

        let field = this.state.formData;

        field[e.target.name] = e.target.value;

        this.setState({ formData: field });

    };
    addUserHandler() {

        if (this.state.specialization != null) {
            this.state.specialization = this.state.specialization.map((key, i) => {
                return { id: key.value, name: key.label };
            });
        }

        this.props.addUserAction(this.state);

    }

    componentDidMount() {

      if(typeof this.props.location.state !== 'undefined'){
        this.setState({
            company: this.props.location.state._id,
            company_name: this.props.location.state.name,
            value: this.props.location.state._id
        });
      }
        this.props.companyListAction(this.state)
        this.props.specializationListAction(this.state)

    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.isAddUserError !== this.props.isAddUserError) {
            if (nextProps.addUserMessage.errors) {
                nextProps.addUserMessage.errors.map((key, i) => {

                    this.setState({ [(key.param) + "Error"]: <small className="text-danger">{key.msg}</small> })
                });
            }
        }
        if (nextProps.isUploadFile !== this.props.isUploadFile) {
            const _this = this;
            let field = this.state.formData;
            field['file'] = nextProps.uploadFile.file_name;

            this.setState({ formData: field });

            this.addUserHandler(field);
        }

        if (nextProps.isUploadFileError !== this.props.isUploadFileError) {
            if (nextProps.uploadFile.errors) {
                let uploaded_file = this.state.uploaded_file;
                nextProps.uploadFile.errors.map((key, i) => {
                    this.setState({ [uploaded_file + "Error"]: key.msg })
                });
            }
        }

        if (nextProps.isCompanyList !== this.props.isCompanyList) {

            this.state.companyList = nextProps.CompanyList.data.data.map((key, i) => {
                return { value: key._id, label: key.name };
            });
        }

        if (nextProps.isSpecializationList && nextProps.isSpecializationList !== this.props.isSpecializationList) {
            this.state.specializationList = nextProps.SpecializationList.data.map((key, i) => {
                return { value: key._id, label: key.name };
            });
        }

        if (nextProps.isAddUser !== this.props.isAddUser) {

            this.props.handleClick('success', nextProps.AddUserData.msg)
            this.props.history.push(`/admin/user-list`)
        }

    }

    render() {

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
                                                    <FormControl type="text" name="user_name" onChange={(event) => {
                                                        this.setState({ user_name: event.target.value });
                                                        event.target.value === "" ? this.setState({ user_nameError: (<small className="text-danger">Username is required.</small>) }) : this.setState({ user_nameError: null });
                                                    }} />
                                                    {this.state.user_nameError}
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <ControlLabel>Email adress: <span className="star">*</span></ControlLabel>
                                                    <FormControl type="text" name="email" onChange={(event) => this.handleEmail(event)} />
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
                                                    <select className="form-control" name="group" value={this.state.value} onChange={(event) => this.handleSelect(event)}>
                                                        <option value="">Select Group</option>
                                                        <option value="executive">Executive</option>
                                                        <option value="manager">Manager</option>
                                                    </select>
                                                    {this.state.groupError}
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <ControlLabel>Company: </ControlLabel>
                                                    
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
                                                    <FormControl type="text" name="first_name" onChange={(event) => {
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
                                                    <FormControl type="text" name="last_name" onChange={(event) => {
                                                        this.setState({ last_name: event.target.value });
                                                        event.target.value === "" ? this.setState({ last_nameError: (<small className="text-danger">Last name is required.</small>) }) : this.setState({ last_nameError: null });
                                                    }} />
                                                    {this.state.last_nameError}
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <ControlLabel>Phone: <span className="star">*</span></ControlLabel>
                                                    <FormControl type="text" name="phone" onChange={(event) => this.handlePhone(event)} />
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
        addUserMessage: state.user.message,
        isAddUser: state.user.isAddUser,
        AddUserData: state.user.AddUserData,
        isAddUserError: state.user.isAddUserError,

        CompanyList: state.clinic.CompanyList,
        isCompanyList: state.clinic.isCompanyList,
        isCompanyListListError: state.clinic.isCompanyListListError,

        SpecializationList: state.specilization.SpecializationList,
        isSpecializationList: state.specilization.isSpecializationList,
        isSpecializationListError: state.specilization.isSpecializationListError,

        isUploadFile: state.user.isUploadFile,
        isUploadFileError: state.user.isUploadFileError,
        uploadFile: state.user.uploadFile,

    }
}
export default withRouter(connect(mapStateToProps, { addUserAction, companyListAction, specializationListAction, uploadFileAction })(AddUser));
