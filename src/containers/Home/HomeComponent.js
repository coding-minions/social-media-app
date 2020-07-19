import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Route } from "react-router-dom";

import "./HomeComponent.css";
import { LoginComponent } from "../LoginComponent/LoginComponent";
import RegisterComponent from "../RegisterComponent/RegisterComponent";

export default class HomeComponent extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col>
            <Route exact path="/" component={LoginComponent} />
            <Route exact path="/register" component={RegisterComponent} />
          </Col>
        </Row>
      </div>
    );
  }
}
