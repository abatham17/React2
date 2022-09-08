import React, { Component } from 'react';
import {
    Grid, Row, Col
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Card from 'Admin/components/Card/Card.jsx';
import { rcmTypeListAction , deleteRcmTypeAction } from 'Admin/actions/rcm';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Loading from 'react-loading';


class RcmTypeList extends Component{

    constructor(props){
        super(props);
        this.state = {
          rcmTypeList:[],
          isLoading:true,
          userRow:null,
        }
    }


    deleteType(type_id,e){
      
      const params ={
         type_id : type_id
      }
      this.props.deleteRcmTypeAction(params);
    }

    _setTableOption(){
        if(this.state.isLoading){
          return(
            <Loading type ='bars' color='#000000'  style={{margin: '0px auto',width: "40px"}} />
          );
        }else{
          return "No data found!";
        }
      } 

    editButton(cell, row, enumObject, rowIndex) {
        return (<p>
        <a href="javascript:void(0)"  onClick={this.deleteType.bind(this, row._id)}><i className="fa fa-trash-o" aria-hidden="true"></i></a></p>)
     
    } 

    getStatus(cell, row, enumObject, rowIndex) {
      if(row.status == 1)
        return (<p>Active</p>)
      else
        return (<p>Deactive</p>)
    }
      
     
    toggleEdit(event){
        this.setState({
            userRow: event
        });
    }
    componentDidMount(){

       this.props.rcmTypeListAction(this.state)
    }
  
    componentWillReceiveProps(nextProps){

     if(nextProps.isRcmTypeList !== this.props.isRcmTypeList){
        this.setState({
            rcmTypeList: nextProps.RcmTypeList.data.data
        });
     }

     if(nextProps.isDeleteRcmType !== this.props.isDeleteRcmType){
        alert('Deleted Successfully!');
        this.props.rcmTypeListAction(this.state)
     }
     if(this.state.isLoading==true){
        this.setState({isLoading:false});
     }

    }

    render() {

        const selectRowProp = {
          mode: 'checkbox'
        };
        const options = {
          afterDeleteRow: this.handleDeleteButtonClick,
          page: 1,  // which page you want to show as default
          sizePerPage: 10,  // which size per page you want to locate as default
          pageStartIndex: 1, // where to start counting the pages
          paginationSize: 3,  // the pagination bar size.
          prePage: 'Prev', // Previous page button text
          nextPage: 'Next', // Next page button text
          firstPage: 'First', // First page button text
          lastPage: 'Last', // Last page button text
          paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
          paginationPosition: 'bottom',  // default is bottom, top and both is all available
          // hideSizePerPage: true > You can hide the dropdown for sizePerPage
           alwaysShowAllBtns: true, // Always show next and previous button
          // withFirstAndLast: false > Hide the going to First and Last page button
          noDataText: this._setTableOption(),
        };
        return (
            <div className="main-content" style={{padding: '15px 0px'}}>
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                content={
                                    <div className="fresh-datatables">
                                    <BootstrapTable  selectRow="{selectRowProp}" deleteRow={ false } data={ this.state.rcmTypeList } search={ true } multiColumnSearch={ true } pagination={ true } options={options} striped hover condensed scrollTop={ 'Bottom' }>
                                        <TableHeaderColumn  hidden='true' tdAttr={{ 'data-attr': '_id' }} dataField='_id' dataSort={ true } isKey searchable={ false }>Id</TableHeaderColumn>

                                        <TableHeaderColumn thStyle={{width:'10.5%'}}  tdStyle={{width:'10.5%'}}  tdAttr={{ 'data-attr': 'RCM Type' }} dataField='rcm_type' dataSort={ true }>RCM Type</TableHeaderColumn>

                                        <TableHeaderColumn thStyle={{width:'8%'}}  tdStyle={{width:'8%'}} tdAttr={{ 'data-attr': 'Status' }}   dataFormat={this.getStatus.bind(this)} dataSort={ true }>Status</TableHeaderColumn>

                                        <TableHeaderColumn thStyle={{width:'10%'}}  tdStyle={{width:'10%'}} tdAttr={{ 'data-attr': 'Action' }}  dataFormat={this.editButton.bind(this)}  dataSort={ false }>Action</TableHeaderColumn>

                                  </BootstrapTable>

                                    </div>
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
    RcmTypeList: state.rcm.RcmTypeList,
    isRcmTypeList: state.rcm.isRcmTypeList,
    isRcmTypeError: state.rcm.isRcmTypeError,

    DeleteRcmType: state.rcm.DeleteRcmType,
    isDeleteRcmType: state.rcm.isDeleteRcmType,
    isDeleteRcmTypeError: state.rcm.isDeleteRcmTypeError,
  }

}
export default withRouter(connect(mapStateToProps, { rcmTypeListAction , deleteRcmTypeAction } )(RcmTypeList));
