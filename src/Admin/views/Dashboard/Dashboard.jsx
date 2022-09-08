import React, { Component } from 'react';
import { Grid, Col, Row } from 'react-bootstrap';
// react component used to create charts
import ChartistGraph from 'react-chartist';
// function that returns a color based on an interval of numbers
import { scaleLinear } from "d3-scale";
// react components used to create a SVG / Vector map
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import {
    ComposableMap,
    ZoomableGroup,
    Geographies,
    Geography,
} from "react-simple-maps";

import Card from 'Admin/components/Card/Card.jsx';
import StatsCard from 'Admin/components/Card/StatsCard.jsx';
import Tasks from 'Admin/components/Tasks/Tasks.jsx';
import { companyListAction } from 'Admin/actions/clinic';
import { getDashboardAction } from 'Admin/actions/master';
import {
    dataPie,
    dataSales,
    optionsSales,
    responsiveSales,
    dataBar,
    optionsBar,
    responsiveBar,
    table_data
} from 'Admin/variables/Variables.jsx';

const colorScale = scaleLinear()
.domain([0, 1, 6820])
.range(["#E5E5E5", "#B2B2B2", "#000000"]);

class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state = {
          companyList:[],
          dashboardData:[],
          isLoading:true,
        }
    }

     componentDidMount(){

       this.props.companyListAction(this.state)
       this.props.getDashboardAction(this.state)
    }

    componentWillReceiveProps(nextProps){
   
     if(nextProps.isCompanyList !== this.props.isCompanyList){
        
            this.setState({
              companyList: nextProps.CompanyList.data.data
            });

     } 

     if(nextProps.isGetDashboard !== this.props.isGetDashboard){
        
            this.setState({
              dashboardData: nextProps.GetDashboard.data
            });

     }
   
    }

    createTableData(){
        var tableRows = [];
        for(var i = 0; i < this.state.companyList.length; i++){
            tableRows.push(
                <tr key={i}>
                    
                    <td>{this.state.companyList[i].name}</td>
                    <td className="text-right">{this.state.companyList[i].companyId}</td>
                    <td className="text-right">{this.state.companyList[i].createdAt}</td>
                </tr>
            );
        }
        return tableRows;
    }
    render(){
        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Col lg={3} sm={6}>
                            <StatsCard
                                bigIcon={<i className="fa fa-files-o text-warning"></i>}
                                statsText="RCM"
                                statsValue={this.state.dashboardData.Rcm}
                                statsIcon={<i className="fa fa-refresh"></i>}
                                statsIconText="--"
                            />
                        </Col>
                        <Col lg={3} sm={6}>
                            <StatsCard
                                bigIcon={<i className="fa fa-building-o text-success"></i>}
                                statsText="Companies"
                                statsValue={this.state.dashboardData.Company}
                                statsIcon={<i className="fa fa-refresh"></i>}
                                statsIconText="--"
                            />
                        </Col>
                        <Col lg={3} sm={6}>
                            <StatsCard
                                bigIcon={<i className="fa fa-users text-warning"></i>}
                                statsText="Managers"
                                statsValue={this.state.dashboardData.Manager}
                                statsIcon={<i className="fa fa-refresh"></i>}
                                statsIconText="--"
                            />
                        </Col>
                        <Col lg={3} sm={6}>
                            <StatsCard
                                bigIcon={<i className="fa fa-user-o text-info"></i>}
                                statsText="Executives"
                                statsValue={this.state.dashboardData.Executive}
                                statsIcon={<i className="fa fa-refresh"></i>}
                                statsIconText="--"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Card
                                title="Recent Companies"                                
                                content={
                                    <Row>
                                        <Col md={5}>
                                            <div className="table-responsive">
                                                <table className="table">
                                                    <tbody>
                                                        {this.createTableData()}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </Col>
                                        <Col md={6} mdOffset={1}>
                                            <ComposableMap style={{ width: "100%", height: "300px" }}>
                                                <ZoomableGroup>
                                                    <Geographies geographyUrl="https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-50m.json">
                                                    {(geographies, projection) => geographies.map(geography => {
                                                        var style;
                                                        switch (geography.id) {
                                                            case "BRA":
                                                            style={default: { fill: colorScale(550) }}
                                                            break;
                                                            case "USA":
                                                            style={default: { fill: colorScale(2920) }}
                                                            break;
                                                            case "AUS":
                                                            style={default: { fill: colorScale(760) }}
                                                            break;
                                                            case "DEU":
                                                            style={default: { fill: colorScale(1300) }}
                                                            break;
                                                            case "GBR":
                                                            style={default: { fill: colorScale(690) }}
                                                            break;
                                                            case "ROU":
                                                            style={default: { fill: colorScale(600) }}
                                                            break;
                                                            default:
                                                            style={default: { fill: colorScale(0) }}
                                                            break;
                                                        }
                                                        return (
                                                            <Geography
                                                                key={ geography.id }
                                                                geography={ geography }
                                                                projection={ projection }
                                                                onClick={ this.handleClick }
                                                                style={style}
                                                            />
                                                        )
                                                    })}
                                                </Geographies>
                                            </ZoomableGroup>
                                        </ComposableMap>
                                    </Col>
                                </Row>
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

    GetDashboard: state.master.GetDashboard,
    isGetDashboard: state.master.isGetDashboard,
    isGetDashboardError: state.master.isGetDashboardError,

  }
}
export default withRouter(connect(mapStateToProps, { companyListAction , getDashboardAction } )(Dashboard));