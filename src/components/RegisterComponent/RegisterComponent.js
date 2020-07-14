import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { SiteConfig } from "../../config/siteConfig";
import "./RegisterComponent.css";

export const Register = () => {
  let title = SiteConfig.title;
  console.log('inside Register Component');
  return (
    <section className="w-50 bg-white border px-5 pb-5 ml-4">
      <Row className="pt-5 text-center">
        <Col>
          <h2 className="prime-color">{title}</h2>
        </Col>
      </Row>
      <hr />
      <Row className="pt-4">
        <Col>
          <Form>
            <Form.Group>
              <Form.Control
                placeholder="Enter Email"
                type="email"
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Control placeholder="Full Name" type="text"></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Control placeholder="Username" type="text"></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Control
                placeholder="Password"
                type="password"
              ></Form.Control>
            </Form.Group>
            <Button variant="outline-primary" className="w-25 mr-3">
              Sign Up
            </Button>
            <Button variant="outline-primary" className="w-25">
              Reset
            </Button>
          </Form>
        </Col>
      </Row>
    </section>
  );
};
