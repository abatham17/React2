import React, { Component } from 'react';
import {
    Col, OverlayTrigger, Tooltip, Row, FormGroup, Modal
} from 'react-bootstrap';
import Datetime from 'react-datetime';
import { connect } from 'react-redux';
import { withRouter , Link } from 'react-router-dom';
import { patientOutAction } from 'Front/actions/home';
import Button from 'Admin/elements/CustomButton/CustomButton.jsx';
import 'react-confirm-alert/src/react-confirm-alert.css'
import Loading from 'react-loading';
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import SweetAlert from 'react-bootstrap-sweetalert';
import { appConstants } from 'Front/_constants/app.constants.js';
import { ListRcmAction , removeRcmAction} from 'Front/actions/rcm';
import EditRcmPopup from 'Front/views/Home/EditRcmPopup';

const userType = localStorage.getItem('userType');
const userId = localStorage.getItem('_id');

class RcmList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visitList: this.props.visitList,
            search: this.props.search,           
            outId: '',
            rcmColumns:'',
            nextVisit:false,          
            nextVisitData:[],
        };

        this.hideAlert = this.hideAlert.bind(this);
        this.removeRcm = this.removeRcm.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
        this.editRcm = this.editRcm.bind(this);

    }

    componentDidMount() {  
            
            let params;

            if(userType == 'manager'){
                params =  {
                    manager : true,                   
                    userId:userId,
                } 
            }else{
                params =  {
                    manager : false,                    
                    userId:userId
                } 
            }
        
            this.props.ListRcmAction(params) 
    }

    componentWillReceiveProps(nextProps) {

        if(nextProps.isListRcm !== this.props.isListRcm) {

            const company = localStorage.getItem('selectedCompany');
            if(company != ''){
                let data = nextProps.ListRcm.list;
                let entity_name = [company];
                let filteredArray = data.filter(function(itm){
                      return entity_name.indexOf(itm.entity_name) > -1;
                 });

                this.setState({visitList:filteredArray});
            }else{
                this.setState({visitList:nextProps.ListRcm.list}); 
            }

        } 

        if(nextProps.isRemoveRcm !== this.props.isRemoveRcm) {
         
            this.successAlert('RCM Successfully Deleted');   
            let params;

            if(userType == 'manager'){
                params =  {
                    manager : true,                   
                    userId:userId,
                } 
            }else{
                params =  {
                    manager : false,                    
                    userId:userId
                } 
            }
            this.props.ListRcmAction(params) 
        }

        if (this.state.isLoading === true) {
            this.setState({ isLoading: false });
        }
    }

 
     successAlert(msg){
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
                    {msg}
                </SweetAlert>
            )
        });
    }

    _setTableOption() {
        if (this.state.isLoading) {
            return (
                <Loading type='bars' color='#000000' style={{ margin: '0px auto', width: "40px" }} />
            );
        } else {
            return "No data found!";
        }
    }

    getOutClass(row, rowIdx) {
        if (row.doctorOut === 'out') {
            return row.id + " Dr-Out";
        } else {
            return row.id;
        }
    }

    nextButton(cell, row, enumObject, rowIndex) {
       
         return (<div>
            <Link to={{ pathname: '/edit-rcm', state: { row: row} }}><i class="fa fa-eye" aria-hidden="true"></i></Link>
            &nbsp;&nbsp;&nbsp;
            <a href="javascript:void(0)" onClick={e => { this.editRcm(e,row); }}><i class="fa fa-pencil" aria-hidden="true"></i></a>
             &nbsp;&nbsp;&nbsp;
            <a href="javascript:void(0)" onClick={e => { this.warningWithConfirmAndCancelMessage(e,row._id); }}><i class="fa fa-trash paperclip" aria-hidden="true"></i></a>
            </div>)
    }

    serialNumber(cell, row, enumObject, rowIndex){
         return "DB"+row._id.substr(-6);
    }

   

   

    search_date(props) {
        return (<FormGroup>
            <Row>
                
                <Col sm={8}>
                    {props.searchField}
                    {props.clearBtn}
                </Col>
                <Col sm={4}>
                
                </Col>
            </Row>
        </FormGroup>);
    }

   
    removeRcm(row_id){
       
       this.setState({
            alert: null,
        });

         const params = {         
            row_id:row_id
        }
      this.props.removeRcmAction(params);

     
   }

    warningWithConfirmAndCancelMessage(e,row_id){
        this.setState({
            alert: (
                <SweetAlert
                    warning
                    style={{display: "block",marginTop: "-100px"}}
                    title="Are you sure?"
                    onConfirm={() => this.removeRcm(row_id)}
                    onCancel={() => this.hideAlert()}
                    confirmBtnBsStyle="info"
                    cancelBtnBsStyle="danger"
                    confirmBtnText="Yes, delete it!"
                    cancelBtnText="Cancel"
                    showCancel
                >
                    You will not be able to recover this imaginary file!
                </SweetAlert>
            )
        });
    }

    editRcm(e,row){
        this.setState({editRcmModal:true,rcmColumns:row});
    }


   hideAlert(){
        this.setState({
            alert: null,
        }); 
    }  


    onDismiss() {
        this.setState({ editRcmModal: false });      
        this.successAlert('RCM successfully Updated');
         let params;

            if(userType == 'manager'){
                params =  {
                    manager : true,                   
                    userId:userId,
                } 
            }else{
                params =  {
                    manager : false,                    
                    userId:userId
                } 
            }
        
            this.props.ListRcmAction(params)  
    }

    render() {
       console.log(this.state.visitList) 
        const options = {
            noDataText: this._setTableOption(),
            searchPanel: (props) => (this.search_date(props)),
            searchPosition: 'left'
        };
        return (
            <Row>
            {this.state.alert}
                <Col md={12}>
                    <div className="visit-list">
                        <BootstrapTable data={this.state.visitList} search={true} multiColumnSearch={true} options={options} striped hover condensed trClassName={this.getOutClass}>

                            <TableHeaderColumn hidden={true} tdAttr={{ 'data-attr': 'id' }} dataField='id' dataSort={true} isKey searchable={false}>Id</TableHeaderColumn>

                            <TableHeaderColumn thStyle={{ width: '7%' }} tdStyle={{ width: '7%' , textAlign:'center'}} thAttr={{ 'data-attr': '#' }} dataField='_id' dataFormat={this.serialNumber.bind(this)} >#</TableHeaderColumn>

                            <TableHeaderColumn thStyle={{ width: '15%' }} tdStyle={{ width: '15%' , textAlign:'center' }} tdAttr={{ 'data-attr': 'NAME' }} dataField='entity_name'  dataSort={true}>NAME</TableHeaderColumn>

                            <TableHeaderColumn thStyle={{ width: '10%' }} tdStyle={{ width: '10%' , textAlign:'center' }} tdAttr={{ 'data-attr': 'AGE' }} dataField='remark'>Reviewed by</TableHeaderColumn>

                            <TableHeaderColumn thStyle={{ width: '10%' }} tdStyle={{ width: '10%' , textAlign:'center' }} tdAttr={{ 'data-attr': 'CITY' }} dataField='customer_name'>Customer name</TableHeaderColumn>

                            <TableHeaderColumn thStyle={{ width: '5%' }} tdStyle={{ width: '5%' , textAlign:'center' }} tdAttr={{ 'data-attr': 'SHARE' }} dataField='rcm_type'>Type</TableHeaderColumn>

                            <TableHeaderColumn thStyle={{ width: '10%' }} tdStyle={{ width: '10%' , textAlign:'center' }} tdAttr={{ 'data-attr': 'DIET' }} dataField='start_date'>Start Date</TableHeaderColumn>

                            <TableHeaderColumn thStyle={{ width: '10%' }} tdStyle={{ width: '10%' , textAlign:'center' }} tdAttr={{ 'data-attr': 'IN TIME' }} dataField='end_date'>End Date</TableHeaderColumn>

                            <TableHeaderColumn thStyle={{ width: '9%' }} tdStyle={{ width: '9%' , textAlign:'center' }} tdAttr={{ 'data-attr': 'NEXT V' }} dataField='' dataFormat={this.nextButton.bind(this)}>Action</TableHeaderColumn>

                            

                        </BootstrapTable>
                    </div>
                </Col>
                 <Modal  show={this.state.editRcmModal} onHide={() => this.setState({ editRcmModal: false })} dialogClassName="modal-lg">
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">Edit RCM</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="Knowledge-Share card">
                        <Row>
                            <Col md={12}>
                                <EditRcmPopup onDismiss={this.onDismiss} rcmColumns={this.state.rcmColumns} />
                            </Col>
                        </Row>
                    </Modal.Body>
                </Modal>
                
            </Row>
        );
    }
}

function mapStateToProps(state) {
    return {
          isListRcm: state.rcm.isListRcm,
          isListRcmError: state.rcm.isListRcmError,
          ListRcm: state.rcm.ListRcm,

          RemoveRcm: state.rcm.RemoveRcm,   
          isRemoveRcm: state.rcm.isRemoveRcm,
          isRemoveRcmError: state.rcm.isRemoveRcmError,
    }

}
export default withRouter(connect(mapStateToProps, { ListRcmAction, patientOutAction, removeRcmAction })(RcmList));
