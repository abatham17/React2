import React, { Component } from 'react';
import {
    FormGroup, ControlLabel, FormControl,
    Grid, Row, Col
} from 'react-bootstrap';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Card from 'Admin/components/Card/Card.jsx';
import Button from 'Admin/elements/CustomButton/CustomButton.jsx';
import { addRcmTypeAction } from 'Admin/actions/rcm'; 
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class AddRcmType extends Component {
    constructor(props) {
        super(props);
        this.vForm = this.refs.vForm;
        this.state = {
            companyList: [],         
            statusError:null,
            rcm_type:'',
            status:1
        };    
    }

    handleStatus(event) {
        this.setState({
            status: event.target.value
        });
    }

    
    handleTypeValidation(event) {
       
        this.state.rcm_type === "" ? this.setState({ rcm_typeError: (<small className="text-danger">This field is required.</small>) }) : this.setState({ type_textError: null });
     
        if(this.state.rcm_type != ''){

            const params = {
                rcm_type:this.state.rcm_type,
                status:this.state.status
            } 

            this.props.addRcmTypeAction(params);
        }
    }

    handleChange = e => {

        e.preventDefault();

        let field = this.state.formData;

        field[e.target.name] = e.target.value;

        this.setState({ formData: field });

    };
   

 
    componentWillReceiveProps(nextProps) {
  

        if (nextProps.isAddRcmType !== this.props.isAddRcmType) {

            this.props.handleClick('success', 'Rcm Type Added Successfully')
            this.props.history.push(`/admin/rcm-type-list`)
        }

    }

    render() {
        return (
            <div className="main-content" style={{ padding: '15px 0px' }}>

                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title="Add RCM Type"
                                content={
                                    <form>
                                        <Row>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <ControlLabel>Type: <span className="star">*</span></ControlLabel>
                                                    <FormControl type="text" name="rcm_type" onChange={(event) => {
                                                        this.setState({ rcm_type: event.target.value });
                                                        event.target.value === "" ? this.setState({ rcm_typeError: (<small className="text-danger">This field is required.</small>) }) : this.setState({ rcm_typeError: null });
                                                    }} />
                                                    {this.state.rcm_typeError}
                                                </FormGroup>
                                            </Col>
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
   
        AddRcmType: state.rcm.AddRcmType,
        isAddRcmType: state.rcm.isAddRcmType,
        isAddRcmTypeError: state.rcm.isAddRcmTypeError,


    }
}
export default withRouter(connect(mapStateToProps, { addRcmTypeAction })(AddRcmType));
