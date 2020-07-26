import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Route, Switch, Redirect } from "react-router-dom";

import "./HomeComponent.css";
import LoginComponent from "../LoginComponent/LoginComponent";
import RegisterComponent from "../RegisterComponent/RegisterComponent";
import { DashboardComponent } from "../Dashboard/DashboardComponent";
import { connect } from "react-redux";

class HomeComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Row>
          <Col>
            <Switch>
              <Route exact path="/" component={LoginComponent} />
              <Route path="/register" component={RegisterComponent} />

              {this.props.isAuthenticated ? (
                <Route path="/dashboard" component={DashboardComponent} />
              ) : (
                <Redirect to="/" />
              )}
            </Switch>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authReducer.isAuthenticated
  };
};

export default connect(
  mapStateToProps,
  null
)(HomeComponent);
