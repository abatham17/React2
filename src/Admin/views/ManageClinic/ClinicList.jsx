import React, { Component } from 'react';
import {
    Grid, Row, Col
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Card from 'Admin/components/Card/Card.jsx';
import { companyListAction } from 'Admin/actions/clinic';
import { companychangestatusAction } from 'Admin/actions/clinic';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Loading from 'react-loading';
import Common from 'Admin/components/Common/Common';
import { Button} from 'react-bootstrap';
import ActionLinks from 'Admin/views/ManageClinic/ActionLinks.jsx';


class companyList extends Component{

    constructor(props){
        super(props);
        this.state = {
          companyList:[],
          isLoading:true,
        }
    }

    editButton(cell, row, enumObject, rowIndex) {
        return (<p><Link to={{ pathname: `update-company/` + row._id, state: { row } }} onClick={this.toggleEdit.bind(this, row)} ><i class="fa fa-pencil" aria-hidden="true"></i></Link>
            &nbsp;&nbsp; &nbsp;&nbsp;
            <a href="javascript:void(0)" onClick={this.statusChangedHandler.bind(this, row)}><i className={(row.status==="active") ? ('fa fa-check') : ('fa fa-remove') } aria-hidden="true"></i></a>
        <a href="javascript:void(0)"><i className="fa fa-trash-o" aria-hidden="true"></i></a></p>)
    }
    toggleEdit(event) {
        this.setState({
            userRow: event
        });
    }
    statusChangedHandler = (event, elename) => {
        let newstatus = {};
        if(event.status=='active'){
            newstatus = 'deactive';
        }else{
            newstatus = 'active';
        }
        event['id'] = event._id;
        event['status'] = newstatus;
        this.props.companychangestatusAction(event);

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
    navigateto(){
        // if (this.clicked !== "Button") {
            window.location.href = "Admin/add-company";
        // }
        // reset
        this.clicked = "";
    }
    componentDidMount(){

       this.props.companyListAction(this.state)
    }

    componentWillReceiveProps(nextProps){
   
     if(nextProps.isCompanyList !== this.props.isCompanyList){
            // let date1 = nextProps.companyList.data.data[0].createdAt;

            this.setState({
              companyList: nextProps.CompanyList.data.data
            });


     }
     if(this.state.isLoading===true){
        this.setState({isLoading:false});
     }
    }
    actionButton(cell, row, enumObject, rowIndex) {
      //<Link to={{ pathname: `/admin/update-company/`, state: {row} }}  ><i class="fa fa-pencil" aria-hidden="true"></i></Link>
        // return (<p><ActionLinks
        //     companyId={row._id}
        //     companyDetails={row}/></p>
        // )
    }

    render() {

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
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                content={
                                    <div className="fresh-datatables">
                                    <Button bsStyle="info" onClick={() => this.props.history.replace('add-company')}>Add Company</Button>
                                    <BootstrapTable deleteRow={ false } key={ this.state.companyList } data={ this.state.companyList } search={ true } multiColumnSearch={ true } pagination={ true } options={options} striped hover condensed scrollTop={ 'Bottom' }>
                                        <TableHeaderColumn hidden='false' tdAttr={{ 'data-attr': '_id' }} dataField='invitationId' dataSort={ true } isKey searchable={ false }>Id</TableHeaderColumn>
                                        <TableHeaderColumn  thStyle={{width:'10.5%'}}  tdStyle={{width:'10.5%'}} tdAttr={{ 'data-attr': 'company Id' }} dataField='companyId' dataSort={ true } >Company Id</TableHeaderColumn>
                                        <TableHeaderColumn  thStyle={{width:'10.5%'}}  tdStyle={{width:'10.5%'}} tdAttr={{ 'data-attr': 'company Name' }} dataField='name' dataSort={ true } >Company Name</TableHeaderColumn>
                                        <TableHeaderColumn  thStyle={{width:'10.5%'}}  tdStyle={{width:'10.5%'}} tdAttr={{ 'data-attr': 'City' }} dataField='city' dataSort={ true }>City</TableHeaderColumn>
                                        <TableHeaderColumn  thStyle={{width:'10.5%'}}  tdStyle={{width:'10.5%'}} tdAttr={{ 'data-attr': 'Registration Date' }}  dataField='createdAt' dataSort={ true } dataFormat={Common.formatDate} >Registration Date</TableHeaderColumn>
                                        <TableHeaderColumn  thStyle={{width:'10.5%'}}  tdStyle={{width:'10.5%'}} tdAttr={{ 'data-attr': 'Users' }}  dataField='city' dataSort={ true }>Users</TableHeaderColumn>
                                        <TableHeaderColumn  thStyle={{width:'10.5%'}}  tdStyle={{width:'10.5%'}} tdAttr={{ 'data-attr': 'Action' }}  dataField='city'  dataSort={ true } dataFormat={this.actionButton.bind(this)} >Action</TableHeaderColumn>
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

    CompanyList: state.clinic.CompanyList,
    isCompanyList: state.clinic.isCompanyList,
    isCompanyListError: state.clinic.isCompanyListError,

    companyChangeStatus: state.clinic.companyChangeStatus,
    iscompanyChangeStatus: state.clinic.iscompanyChangeStatus,
    iscompanyChangeStatusError: state.clinic.iscompanyChangeStatusError,

  }
}
export default withRouter(connect(mapStateToProps, { companyListAction, companychangestatusAction} )(companyList));
