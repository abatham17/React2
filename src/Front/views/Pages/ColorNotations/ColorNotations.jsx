import React, { Component } from 'react';

import {
    Grid, Row, Col
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Card from 'Front/components/Card/Card.jsx';
class ColorNotations extends Component{

    constructor(props){
        super(props);
        this.state = {          
        }
       
    }
    
    render() {

        return (
            <div className="main-content">
           
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <h4 className="notation-title">RCM Shortcut Key</h4>
                            
                            <Card
                                
                                content={
                                    <Row>
                                    <Col md={12} xs={12} sm={12}>                                                                              
                                        <div className="card">
                                            <div className="header notations-title">
                                               Keys
                                            </div>
                                            <div className="content notation-Col">
                                                                        
                                                    <p><span className="dot_red"></span> CNTR+Enter = Add new row in RCM </p>
                                                    <p><span className="dot_black"></span> Dubble Click = Update row </p>
                                                    <p><span className="dot_green"></span> Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                                                    <p><span className="dot_pink"></span> Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                                                    <p><span className="dot_blue"></span> Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                                                
                                            </div>
                                        </div>                                        
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

  }
}
export default withRouter(connect(mapStateToProps, { } )(ColorNotations));
