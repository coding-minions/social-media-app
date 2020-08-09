import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Route, Switch, Redirect } from "react-router-dom";

import "./HomeComponent.css";
import LoginComponent from "../LoginComponent/LoginComponent";
import RegisterComponent from "../RegisterComponent/RegisterComponent";
import DashboardComponent from "../Dashboard/DashboardComponent";
import { connect } from "react-redux";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";

class HomeComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <HeaderComponent />
        <div className="container">
          <Row>
            <Col>
              <Switch>
                <Route exact path="/" component={LoginComponent} />
                <Route path="/register" component={RegisterComponent} />

                {this.props.isAuthenticated || window.localStorage.authToken ? (
                  <Route path="/dashboard" component={DashboardComponent} />
                ) : (
                  <Redirect to="/" />
                )}
              </Switch>
            </Col>
          </Row>
          {/* <RegisterComponent />
          <RegisterComponent />
          <RegisterComponent />

          <RegisterComponent /> */}
        </div>
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
