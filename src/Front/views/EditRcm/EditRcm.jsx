import React, { Component } from 'react';
import {
    Grid, Row, Col, Modal, FormControl, FormGroup, ControlLabel, OverlayTrigger, Tooltip
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Card from 'Front/components/Card/Card.jsx';
import Button from 'Admin/elements/CustomButton/CustomButton.jsx';
import { appConstants , config} from 'Front/_constants/app.constants.js';
import { addAttachementAction, getRcmDataAction, addRcmDataRowAction , removeRcmDataRowAction, changeRcmRowStatusAction, updateRcmRowDataAction } from 'Front/actions/rcm';
import Checkbox from 'Admin/elements/CustomCheckbox/CustomCheckbox.jsx';
import SweetAlert from 'react-bootstrap-sweetalert';
import S3 from 'aws-s3';
import readXlsxFile from 'read-excel-file'
import * as XLSX from 'xlsx';
import jQuery from "jquery";
import XlsExport from './xls-export.js';

const S3Client = new S3(config);
const userType = localStorage.getItem('userType');
const userId = localStorage.getItem('_id');
const userName = localStorage.getItem('firstName')+' '+localStorage.getItem('lastName');
let excellData;
  

class PatientSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rcmColomns: this.props.location.state.row.rcm_colomns,            
            rcmBulkColomns: this.props.location.state.row.rcm_colomns,            
            rcmColomnsData: [],
            rcm_id:this.props.location.state.row._id,
            rowVisibility:[],
            uploadLoading:[],
            fileData:{
                rcm_data_row_id:'',
                media:[]
              },
            noteFile: '',  
            excellData:[],
            excellFinalData:[],
            bulkUploadLoading:false,
            alert: null,
            selectedRow:[],
            statusSort:false
           
        }
        this.addRcmRow = this.addRcmRow.bind(this);
        this.onChangeFile = this.onChangeFile.bind(this);
        this.handleFileSelect = this.handleFileSelect.bind(this);
        this.hideAlert = this.hideAlert.bind(this);
        this.keyPress = this.keyPress.bind(this);
        this.onChangeRcmType = this.onChangeRcmType.bind(this);
         this.compareBy.bind(this);
        this.sortBy.bind(this);

    }
    
     
    
     componentDidMount(){
      
        this.props.getRcmDataAction(this.props.location.state.row._id);
        
        let rcmColomns = this.state.rcmColomns;

        this.state.rcmColomns.map((key, j) => {            
            rcmColomns[j]["key"] = key.key;
            rcmColomns[j]["value"] = "";
          })

        let rcmBulkColomns = this.state.rcmBulkColomns;

        this.state.rcmBulkColomns.map((key, j) => {            
            rcmBulkColomns[j]["key"] = key.key;
            rcmBulkColomns[j]["name"] = key.name;
          })
          

        document.getElementById('inputsm').addEventListener('change', this.handleFileSelect, false)
     
        document.onkeydown = this.keyPress;


        document.oncontextmenu = function (e) {          
          if (e.button == 2) {
              e.preventDefault();
              return false;
          }
      }

    }

 compareBy(key) {
   let _this = this;
    return function (a, b) {
      if(_this.state.statusSort){
         if (a[key] < b[key]) return -1;
         if (a[key] > b[key]) return 1;
      }else{
         if (a[key] > b[key]) return -1;
         if (a[key] < b[key]) return 1;
      }
      return 0;
    };
  }
 
  sortBy(key) { 
    let arrayCopy = [...this.state.rcmColomnsData];
    arrayCopy.sort(this.compareBy(key));
    if(this.state.statusSort)
      this.setState({rcmColomnsData: arrayCopy,statusSort:false});
    else
      this.setState({rcmColomnsData: arrayCopy,statusSort:true});
  }


   onChangeRcmType(e){
     
        let data = this.state.rcmColomnsTempData;
        let approve = [];
        let status = [];
        let disapprove = false;
        if(e.target.value == 1){
           approve = [true];
           status = ['active']; 
        }else if(e.target.value == 2){
           approve = [false];
           disapprove = true;
           status = ['decline'];
        }else if(e.target.value == 0){
           approve = [false]; 
           status = ['active']; 
        }else{
           approve = [true,false];
           status = ['active','decline']; 
        }
        
        let filteredArray;

        if(disapprove == true){
             filteredArray = data.filter(function(itm){
              return status.indexOf(itm.status) > -1;
            });
        }else{
          filteredArray = data.filter(function(itm){
            return approve.indexOf(itm.approve) > -1;
          });

          filteredArray = filteredArray.filter(function(itm){
            return status.indexOf(itm.status) > -1;
          });
        }
     
        

        this.setState({rcmColomnsData:filteredArray});

   }

   

   keyPress(e) { 
      

      var evtobj = window.event
     
      if (evtobj.keyCode == 13 && evtobj.ctrlKey) this.addRcmRow();
     // else if (evtobj.keyCode == 66 && evtobj.ctrlKey) save_row(currentEdit);
     // else if (evtobj.keyCode == 68 && evtobj.shiftKey) delete_row(currentEdit);
    }


    componentWillReceiveProps(nextProps) {
      
      if(nextProps.isRcmData !== this.props.isRcmData){
        if(nextProps.RcmData.data === null){
            this.setState({rcmColomnsData:[]});
        }
        else{
           

            
            let rowVisibility = this.state.rowVisibility;
            let uploadLoading = this.state.uploadLoading;
            let tempArr = nextProps.RcmData.data;

            nextProps.RcmData.data.map((key, j) => {            
             
                 rowVisibility[key._id] = false;
                 uploadLoading[key._id] = false;
                 let rcmColomns = this.state.rcmColomns;
                 for(let i in rcmColomns){
                   tempArr[j][rcmColomns[i].key] = nextProps.RcmData.data[j].rcm_data[0].data[rcmColomns[i].key];
                 }
                 if(nextProps.RcmData.data[j] && nextProps.RcmData.data[j].approveBy  && nextProps.RcmData.data[j].approveBy.length)
                  tempArr[j]['reviewed_by'] = nextProps.RcmData.data[j].approveBy[0].name;
                 else
                  tempArr[j]['reviewed_by'] = "";

            });

            this.setState({rcmColomnsData:tempArr}); 
            this.setState({rcmColomnsTempData:tempArr}); 
            console.log(tempArr)
            this.setState({rowVisibility:rowVisibility,uploadLoading:uploadLoading});
              
        }
      }

      if(nextProps.isAddRcmDataRow !== this.props.isAddRcmDataRow){
        let _this = this;
        setTimeout(function(){
            _this.props.getRcmDataAction(_this.props.location.state.row._id);
            if(_this.state.bulkUploadLoading == true){
                _this.setState({excellFinalData:[],bulkUploadLoading:false});    
                _this.successAlert();        
            }else{
                _this.setState({excellFinalData:[]}); 
            }
        },100)
       
      }
      if(nextProps.isUpdateRcmDataRow !== this.props.isUpdateRcmDataRow){
        let _this = this;
        setTimeout(function(){
            _this.props.getRcmDataAction(_this.props.location.state.row._id);
        },100)
      }

      if(nextProps.isRemoveRcmDataRow !== this.props.isRemoveRcmDataRow){
        let _this = this;
        setTimeout(function(){
            _this.props.getRcmDataAction(_this.props.location.state.row._id);
        },100)
      }

      if(nextProps.isChangeDataRowStatus !== this.props.isChangeDataRowStatus){
        let _this = this;
        setTimeout(function(){
            _this.props.getRcmDataAction(_this.props.location.state.row._id);
            _this.successAlert2();   
        },100)
      }

      if(nextProps.isAddAttachement !== this.props.isAddAttachement){
        let _this = this;
        let uploadLoading = this.state.uploadLoading;
        uploadLoading[this.state.fileData.rcm_data_row_id] = false;                     
        this.setState({ uploadLoading:uploadLoading });

        setTimeout(function(){
            _this.props.getRcmDataAction(_this.props.location.state.row._id);
            const reset = {
                rcm_data_row_id:'',
                media:[]
              }

            _this.setState({ fileData:reset });
        },100)
      }
      
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
                    Data Successfully Uploaded
                </SweetAlert>
            )
        });
    }

 successAlert2(){
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
                    Status Successfully Updated
                </SweetAlert>
            )
        });
    }

  hideAlert(){
        this.setState({
            alert: null,
        });
        
    }  

  handleFileSelect(evt) {
   
    var files = evt.target.files; // FileList object

    if(files){
    let _this = this;
    var reader = new FileReader();

        reader.onload = function(e) {
          var data = e.target.result;
          var workbook = XLSX.read(data, {
            type: 'binary'
          });

         
          workbook.SheetNames.forEach(function(sheetName) {
            // Here is your object
            var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
            var json_object = JSON.stringify(XL_row_object);
            
            excellData = JSON.parse(json_object);
            
            _this.setState({excellData:excellData})
  
          })
        };

        reader.onerror = function(ex) {
          console.log(ex);
        };

        reader.readAsBinaryString(files[0]);
     }

  } 

   onChangeFile(e,row_id) {
   
      let uploadLoading = this.state.uploadLoading;
      uploadLoading[row_id] = true;

      this.setState({noteFile:e.target.files,uploadLoading:uploadLoading})
      const _this = this;
      var t=e.target.files;
      var file
      if(t){

       this.state.fileData.rcm_data_row_id = row_id;

       let arr = [];
       let urlData = [];
       var dataObj= [];       
           for(var i=0; i<t.length; i++){
              file = t[i];
              let name = t[i].name;
              let filetype = t[i].type.split("/");
              let type = filetype[0];
              let s3fileName = row_id+i;
              if(file){
                S3Client.uploadFile(file, s3fileName).then(data =>{            
                   urlData.push(data.location);
                    this.state.fileData.media.push({
                      url: data.location,
                      type: type,
                      caption: name
                   })
                        if( this.state.fileData.media.length === t.length){  
                          _this.props.addAttachementAction(_this.state.fileData);                                          
                          _this.setState({ noteFile: urlData});
                        }

                }).catch(err => console.error(err))
              }
           }
         }      
  
  } 

   handleRowChange(e,key,index){
   
    let rcmColomnsData = this.state.rcmColomnsData;
    rcmColomnsData[index]['rcm_data'][0]['data'][key.key] = e.target.value;
    this.setState({rcmColomnsData:rcmColomnsData})
   } 
 
   handleNewChange(e,key,index){
   
    let rcmColomns = this.state.rcmColomns;
    rcmColomns[index]['value'] = e.target.value;
    this.setState({rcmColomns:rcmColomns})
   } 


   addBulkUpload(e){
       
    if(this.state.excellData.length>0){
      this.setState({bulkUploadLoading:true});

      let excellData = this.state.excellData;
      let excellFinalData = this.state.excellFinalData;
    
      for(let i in excellData){
          
          var objects = {};
          this.state.rcmBulkColomns.map((key, j) => {         
            objects[key.key] = excellData[i][key.name];
          })
          
          let newData = {"row_data":objects}

          excellFinalData.push(newData);
         
      }

    this.setState({excellFinalData:excellFinalData})
    let manager = false;
    if(userType == 'manager')
    {
       manager = true
    }
    const params = {
        rcm_id : this.state.rcm_id,
        rcm_data : excellFinalData,
        attachments:[],
        bulkupload:true,
        manager:manager,
        userId:userId,
        userName:userName
    }

    this.props.addRcmDataRowAction(params);
    }else{
        alert('Please select file or data can not be empty');
    }
   }

   async addRcmRow(e){

      let rcmColomnsData = this.state.rcmColomnsData;
      var objects = {};
      this.state.rcmColomns.map((key, j) => {
        let obj = {}
        obj[key.key] = "";
        objects[j] = obj;
      })
      
      let newData = {"rcm_data":[{"data":objects,"_id":""}]}
      rcmColomnsData.push(newData);

      this.setState({rcmColomnsData:rcmColomnsData})


    let rcmColomns = this.state.rcmColomns;
    
    const params = {
        rcm_id : this.state.rcm_id,
        rcm_data : rcmColomns,
        attachments:[],
        bulkupload:false
    }

    await this.props.addRcmDataRowAction(params);

    rcmColomns.map((key, j) => {            
            rcmColomns[j]["key"] = key.key;
            rcmColomns[j]["value"] = "";

    });

    this.setState({rcmColomns:rcmColomns})
    
    document.getElementById('data_table').scrollLeft = 0;
    document.getElementById("scrollFocus").focus();
    document.getElementById("newInput0").focus();
    setTimeout(function(){
       window.scrollBy(0,100);
    },500)


   }
   
   onSelectRow(e,row_id){
    let selectedRow = this.state.selectedRow;
    row_id
    if(selectedRow.indexOf(row_id) != -1)
    {  
        let index = selectedRow.indexOf(row_id);
        if (index > -1) {
          selectedRow.splice(index, 1);
        }
    }else{
         selectedRow.push(row_id);
    }
    this.setState({selectedRow:selectedRow})
   }

   removeRcmRow(e,row_id){
    
      const params = {         
            row_id:row_id
        }
      this.props.removeRcmDataRowAction(params);
   }

   onChangeField(e,row_id,approve,index,status){
    
    if(!approve || (approve && userType=="manager")){
    let rowVisibility = this.state.rowVisibility;
    
    if(rowVisibility[row_id] == false){
      rowVisibility[row_id] = true;
    }
    else{
      rowVisibility[row_id] = false;  
    
      const params = {
                    rcm_data_id:this.state.rcmColomnsData[index]._id,                  
                    rcm_row_data:[this.state.rcmColomnsData[index].rcm_data[0].data],
                    status:status,
                    approve:approve
                    }

      this.props.updateRcmRowDataAction(params); 


    }
    
    this.setState({rowVisibility:rowVisibility})
    }
   }

   exportExcel(){

    const dataSample = [{
      "symbol": "IBM",
      "date": "Aug 2004",
      "price": 78.17
    },
    {
      "symbol": "IBM",
      "date": "Sep 2004",
      "price": 79.13
    },    
    {
      "symbol": "AAPL",
      "date": "Apr 2008",
      "price": 173.95
    },
  ];

 let data = [];

  if(this.state.rcmColomnsData && this.state.rcmColomnsData.length){
         this.state.rcmColomnsData.map((key, i) => {
              
           let objects = {};

            this.state.rcmColomns.map((key1, j) => {
                 
                
                 let obj = {}
                 obj[key1.key] =  key.rcm_data[0].data['col_'+(j+1)];
                 objects[key1.name] = key.rcm_data[0].data['col_'+(j+1)];

            })

            data.push(objects);

          });
    }

    var xls = new XlsExport(data, 'String');
    xls.exportToXLS(this.state.rcm_id+'.xls');

   }

    print(){
        let html = document.getElementById("data_table").innerHTML;
        var newWin = window.open('', 'Print-Window');
        newWin.document.open();
        newWin.document.write('<html moznomarginboxes mozdisallowselectionprint><body onload="window.print()"><style> @media print{.page-break   { display: block; page-break-before: always; } th,td { font-size:10px; padding: 5px; vertical-align: middle; border: 1px solid #ddd; } .rcm-table tr td.columntd, .rcm-table tr th.columnth { min-width: 80px; padding: 5px;} .rcm-table tr td.approvetd, .rcm-table tr th.approveth  {min-width: 100px;padding: 10px;} td.sntd,th.snth,.actionTh,.addNewRow{display: none;} .table { width: 100%; max-width: 100%; border-spacing: 0; border-collapse: collapse;} h1{margin-bottom:5px!important;} .only-print{margin-bottom:10px !important;} }</style>' + html + '</body></html>');
        newWin.document.close();
        setTimeout(function () {
           newWin.close();
        }, 10);
    }
   

   ChangeRcmRowStatus(e,statusType,row_id,multiple){  
     
     let status;
     let approve; 
     if(multiple == true && (this.state.selectedRow.length == 0 || this.state.selectedRow.length <= 0))
     {
        alert("Please select row!")
        return;
     }
     if(statusType == true){
       status = 'active'
       approve = true
    
           const params = {
                    rcm_data_id:row_id,
                    status:status,
                    approve:approve,
                    remark:null,
                    approveBy:[{id:userId,name:userName}],
                    multiple:multiple,
                    selectedRow:this.state.selectedRow
                    }
            this.props.changeRcmRowStatusAction(params);       
      

     }else{
       status = 'decline'
       approve = false
    

      let remark = prompt("Please add remark about disapprove:", "");
      
      if (remark != null) {

           const params = {
                    rcm_data_id:row_id,
                    status:status,
                    approve:approve,
                    remark:remark,
                    approveBy:[{id:userId,name:userName}],
                    multiple:multiple,
                    selectedRow:this.state.selectedRow
                    }
            this.props.changeRcmRowStatusAction(params); 
      } 

     } 
    
      
   }
 


    render() {
        console.log(this.state.rcmColomnsData)
        let rcmData = '';

         if(this.state.rcmColomnsData && this.state.rcmColomnsData.length){
          rcmData =  this.state.rcmColomnsData.map((key, i) => {
          let approve = "";  
          if(key.approve == false && key.approveBy && key.approveBy.length == 0){
             approve = "-";
          }else{
             if(key.approveBy && key.approveBy.length)
               approve = key.approveBy[0].name;
             else
               approve = "-" 
          }
          let action = "";
          if(userType == 'manager' && key.approveBy && key.approveBy.length == 0){
           action = <div className="rcm-action"><button onClick={e => { this.ChangeRcmRowStatus(e,true,key._id,false); }} className="btn btn-primary btn-sm">Approve</button>&nbsp;&nbsp;<button onClick={e => { this.ChangeRcmRowStatus(e,false,key._id,false); }} className="btn btn-warning btn-sm">Disapprove</button></div>
          }else if(userType == 'manager' && key.approve == true){
            action = <div className="rcm-action"><button  className="btn btn-success btn-sm">Approved</button></div>
          }else if(userType == 'manager' && key.approve == false && key.status == "decline"){
            action = <div className="rcm-action"><button  className="btn btn-danger btn-sm">Disapproved</button></div>
          }

        return <tr  onDoubleClick={e => { this.onChangeField(e,key._id,key.approve,i,key.status); }}>
                                        {userType == 'manager' &&
                                        <td  className="sntd">
                                        <Checkbox number={key._id} 
                                        onClick={e => { this.onSelectRow(e,key._id); }}
                                         />
                                        </td>
                                        }
                                        <td className="approvetd">
                                        <span>{approve}</span> 
                                        </td>
                                        
                                        <td  className="sntd">{i+1}</td>
                                        <td  className="sntd">
                                        {key.approve &&
                                          
                                        <OverlayTrigger placement="bottom" overlay={<Tooltip id="Name"><b>Approved</b></Tooltip>}>                    
                   <i class="fa fa-check approvedrow" aria-hidden="true"></i>
                    </OverlayTrigger>
                                        }

                                        {!key.approve && key.status == "decline" &&
                                          
                                        <OverlayTrigger placement="bottom" overlay={<Tooltip id="Name"><b>{key.remark}</b></Tooltip>}>                    
                    <i class="fa fa-exclamation-triangle declinedrow" aria-hidden="true"></i>
                    </OverlayTrigger>
                                        }

                                        {!key.approve && key.status == "active" &&
                                          <OverlayTrigger placement="bottom" overlay={<Tooltip id="Name"><b>In Review</b></Tooltip>}>                    
                    <i class="fa fa-exclamation-circle reviewrow" aria-hidden="true"></i>
                    </OverlayTrigger>
                                        }
                                        
                                        </td>
                                        {this.state.rcmColomns.map((key1, j) => {
                                          return (<td className="columntd"><span style={{display:this.state.rowVisibility[key._id] ? 'none':'block'}} >{key.rcm_data[0].data['col_'+(j+1)]}</span><textarea style={{display:this.state.rowVisibility[key._id] ? 'block':'none'}} class="form-control" name={"col_"+key.rcm_data[0].data['col_'+(j+1)]} value={key.rcm_data[0].data['col_'+(j+1)]}  onChange={e => { this.handleRowChange(e,key1,i); }}></textarea></td>)
                                        })}
                                        <td className="columntd">
                                        {key.attachments && key.attachments.length>0 && key.attachments.map((att, j) => {           
             
                                        return <span><a href={att.media.url} target="_blank" download>{att.media.caption}</a><br></br></span>

                                        })} 
                                        </td>
                                        <td className="columntd actionTh">
                                        {!key.approve &&
                                        <a onClick={e => { this.removeRcmRow(e,key._id); }} href="javascript:void(0)" ><i  class="fa fa-minus-circle" aria-hidden="true"></i></a>
                                        }
                                        {key.approve && userType == 'manager' &&
                                        <a onClick={e => { this.removeRcmRow(e,key._id); }} href="javascript:void(0)" ><i  class="fa fa-minus-circle" aria-hidden="true"></i></a>
                                        }
                                        &nbsp;&nbsp;
                                       
                                        
                                        
                                        <div class="image-upload">
                                            <label for={"file-input"+key._id}>
                                                <i class="attach-doc fa fa-paperclip paperclip" aria-hidden="true" style={{display:this.state.uploadLoading[key._id] ? 'none':'block'}}></i>
                                                <i class="fa fa-spin fa-circle-o-notch paperclip" aria-hidden="true" style={{display:!this.state.uploadLoading[key._id] ? 'none':'block'}}></i>
                                            </label>

                                            <input id={"file-input"+key._id} type="file" name="noteFile" onChange={e => { this.onChangeFile(e,key._id); }} multiple="multiple"/>
                                        </div>
                                        {action}
                                        </td>
                                        

                                        </tr>
                                       })
        }




        return (
             <div className="main-content patient-search" style={{ padding: '15px 0px' }}>
                {this.state.alert}
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                content={
                                    <div className="fresh-datatables">
                                    <Row className="search-section">
                                        <Col md={3}>
                                          <b>Entity:</b>{this.props.location.state.row.entity_name}<br/><b>Process:</b> {this.props.location.state.row.rcm_type}<br/><b>Risk and Control Matrix:</b> {this.props.location.state.row.rcm_type} 
                                        </Col>
                                        <Col md={5}>
                                        <Row>                                         
                                        <Col sm={4}>
                                        Choose File To Import Data<br/>
                                        <small><a href="/SampleXLSFile.xls">Download Template</a></small>
                                         &nbsp;<OverlayTrigger placement="bottom" overlay={<Tooltip id="Name"><b>This Template is only of example, Make sure all column names matching with created RCM column names!</b></Tooltip>}>                    
                                           <i class="fa fa-exclamation-circle reviewrow" aria-hidden="true"></i>
                                         </OverlayTrigger>
                                        </Col>
                                        <Col sm={6}>
                                       <input class="form-control form-control-sm" id="inputsm" type="file"/>
                                        </Col>  
                                        <Col sm={1}>                                       
                                        <button class="btn btn-primary" onClick={e => { this.addBulkUpload(e); }}> <i class="fa fa-spin fa-circle-o-notch bulkpaperclip" aria-hidden="true" style={{display:this.state.bulkUploadLoading ? 'block':'none'}}></i><span style={{display:!this.state.bulkUploadLoading ? 'block':'none'}}>Submit</span></button>
                                         </Col>                                    
                                        </Row>
                                        </Col>
                                        <Col md={4} style={{textAlign:"right"}}>
                                        {userType == 'manager' &&
                                         <div className="rcm-action">
                                         <button  className="btn btn-success" onClick={e => { this.ChangeRcmRowStatus(e,true,0,true); }}>Approve</button>
                                         &nbsp;&nbsp;<button  className="btn btn-warning" onClick={e => { this.ChangeRcmRowStatus(e,false,0,true); }}>Disapprove</button>
                                         </div>                                        
                                         }
                                         &nbsp;&nbsp;<Button onClick={e=>{this.print()}} className="btn-fill btn btn-primary">Print</Button>
                                                                   &nbsp;&nbsp;<Button onClick={e=>{this.exportExcel()}} className="btn-fill btn btn-primary">Export</Button>
                                          <br></br><br></br>
                                          <Row>
                                            <Col sm={6} style={{textAlign:"right",paddingRight:'0',paddingTop:'5px'}}>
                                            Show: 
                                            </Col>
                                            <Col sm={6}>
                                            <select className="form-control input-sm" name="rcm_type" onChange={e=>{this.onChangeRcmType(e)}}>
                                                    <option value="all">All</option>
                                                    <option value="1" >Approved</option>
                                                    <option value="2" >Disapprove</option>
                                                    <option value="0" >In Review</option>
                                                </select>
                                            </Col>
                                          </Row>
                                        </Col>
                                        
                                       
                                        </Row>
                                       <Row>
                                       <Col md={12} id="data_table" className="rcm-tbl-body">

                                        <table  align="center" cellspacing="2" cellpadding="5" border="1" class="table table-hover table-bordered table-condensed rcm-table">
                                        <tr>
                                        {userType == 'manager' &&
                                        <th className="snth">#</th>
                                        }
                                        <th className="approveth"  onClick={() => this.sortBy('reviewed_by')}>Reviewed by</th>
                                        
                                        <th  className="snth" >Sr.no</th>
                                        <th  className="snth" onClick={() => this.sortBy('status')}>Status</th>
                                        {this.state.rcmColomns.map((key, i) => {
                                          return (<th className="columnth" onClick={() => this.sortBy(key.key)}>{key.name}</th>)
                                        })}                                     
                                        
                                        <th  className="columnth">Attachments</th>
                                        <th  className="columnth actionTh">Action</th>
                                        </tr>
                                        {rcmData}
                                        <tr className="addNewRow">
                                        {userType == 'manager' &&
                                        <td>-</td>
                                        }
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                        
                                        {this.state.rcmColomns.map((key, j) => {
                                          return (<td><textarea type="text" id={"newInput"+j} class="form-control" value={key.value}  name={key.key} onChange={e => { this.handleNewChange(e,key,j); }}></textarea></td>)
                                        })}
                                        <td>-</td>
                                        <td><a onClick={e => { this.addRcmRow(e); }} href="javascript:void(0)" >&nbsp;&nbsp;<i  class="fa fa-plus-circle" aria-hidden="true"></i></a>
                                        </td>
                                        </tr>
                                        </table>
                                       </Col>
                                       </Row>

                                    </div>
                                }
                            />
                        </Col>
                    </Row>
                </Grid>
              <input id="scrollFocus"   />
            </div>
        );
    }
}

function mapStateToProps(state) {

    return {

        RcmData: state.rcm.RcmData,
        isRcmData: state.rcm.isRcmData,
        isRcmDataError: state.rcm.isRcmDataError,

        isAddRcmDataRow: state.rcm.isAddRcmDataRow,
        isAddRcmDataRowError: state.rcm.isAddRcmDataRowError,
        AddRcmDataRow: state.rcm.AddRcmDataRow,

        RemoveRcmDataRow: state.rcm.RemoveRcmDataRow, 
        isRemoveRcmDataRow: state.rcm.isRemoveRcmDataRow,
        isRemoveDataRowError: state.rcm.isRemoveDataRowError,
        
        ChangeDataRowStatus: state.rcm.ChangeDataRowStatus,   
        isChangeDataRowStatus: state.rcm.isChangeDataRowStatus,
        isChangeDataRowStatusError: state.rcm.isChangeDataRowStatusError, 

        AddAttachement: state.rcm.AddAttachement,   
        isAddAttachement: state.rcm.isAddAttachement,
        isAddAttachementError: state.rcm.isAddAttachementError,

        UpdateRcmDataRow: state.rcm.UpdateRcmDataRow,   
        isUpdateRcmDataRow: state.rcm.isUpdateRcmDataRow,
        isUpdateRcmDataRowError: state.rcm.isUpdateRcmDataRowError,

    }
}
export default withRouter(connect(mapStateToProps, { addAttachementAction, addRcmDataRowAction, getRcmDataAction, removeRcmDataRowAction, changeRcmRowStatusAction, updateRcmRowDataAction })(PatientSearch));