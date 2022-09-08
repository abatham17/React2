import React, { Component } from 'react';
import {
    Grid
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import RcmList from 'Front/views/Home/RcmList.jsx';



class Dashboard extends Component {

    constructor(props) { 
        super(props);
        var today = new Date(),
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        this.state = {
            search: '',
            search_date:date,
        };
        
     
    } 
     
    render() {
        
        return (
            <div className="main-content dashboard" style={{ padding: '15px 15px' }}>
                <Grid fluid>
                    
                       <RcmList 
                        search = {this.state.search}
                        search_date = {this.state.search_date}
                    />                
                
                </Grid>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
    }

  }
  export default withRouter(connect(mapStateToProps, { } )(Dashboard));
