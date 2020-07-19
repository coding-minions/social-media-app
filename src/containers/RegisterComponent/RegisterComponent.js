import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import * as $ from "jquery";
import { withRouter } from "react-router-dom";
import Axios from "axios";

import { SiteConfig } from "../../config/siteConfig";
import { getImgUrl } from "../../helpers/ImgHelper";
import { LoaderComponent } from "../../shared/LoaderComponent/LoaderComponent";
import "./RegisterComponent.css";

class RegisterComponent extends React.Component {
  title = SiteConfig.title;
  mainBannerImage = "home-banner-image.png";
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;

  registerBtn = null;
  history = null;

  state = {
    email: null,
    password: null,
    isEmailTouched: false,
    isPasswordTouched: false,
    isEmailValid: false,
    isPasswordValid: false,
    isLoading: false
  };

  constructor(props) {
    super(props);
    this.history = this.props.history;
  }

  componentDidMount() {
    this.registerBtn = $("#register-btn")[0];
    this.registerBtn.disabled = true;
  }

  checkEmail = event => {
    let emailValue = event.target.value;
    let result = this.emailRegex.test(emailValue);

    this.setState({
      ...this.state,
      isEmailValid: result,
      isEmailTouched: true,
      email: emailValue
    });

    this.state.isEmailValid && this.state.isPasswordValid
      ? (this.registerBtn.disabled = false)
      : (this.registerBtn.disabled = true);
  };

  checkPassword = event => {
    let passwordValue = event.target.value;
    let result = passwordValue.length > 0 ? true : false;

    this.setState({
      ...this.state,
      isPasswordValid: result,
      isPasswordTouched: true,
      password: passwordValue
    });

    this.state.isEmailValid && this.state.isPasswordValid
      ? (this.registerBtn.disabled = false)
      : (this.registerBtn.disabled = true);
  };

  registerUser = (email, password) => {
    // console.log("Sending Request");

    this.setState({ ...this.state, isLoading: true });
    Axios.post(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
        SiteConfig.firebaseAPIKey,
      { email, password, returnSecureToken: true },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => {
        console.log(response);
        // this.setState({ ...this.state, isLoading: true });
        this.history.push("/");
      })
      .catch(error => console.log("ERROR --> ", error, error.response));
  };

  render() {
    return (
      <section className="section">
        {this.state.isLoading ? (
          <LoaderComponent />
        ) : (
          <Row className="row">
            <Col lg={5} className="shadow rounded px-0 register-form">
              <div className="py-3 px-5">
                <div className="text-center my-5">
                  <h5 className="prime-color">Register on {this.title} </h5>
                </div>

                <Form>
                  <Form.Group>
                    <Form.Control
                      type="email"
                      placeholder="Enter Your Email"
                      pattern={this.emailRegex}
                      onChange={event => this.checkEmail(event)}
                    />
                    {this.state.isEmailTouched && !this.state.isEmailValid ? (
                      <Form.Text className="small text-danger">
                        Please Enter a Valid Email!
                      </Form.Text>
                    ) : (
                      ""
                    )}
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      type="password"
                      placeholder="Enter Your Password"
                      onChange={event => this.checkPassword(event)}
                    />
                    {this.state.isPasswordTouched &&
                    !this.state.isPasswordValid ? (
                      <Form.Text className="small text-danger">
                        Please Enter a Valid Password!
                      </Form.Text>
                    ) : (
                      ""
                    )}
                  </Form.Group>
                  <Button
                    className="w-100"
                    id="register-btn"
                    onClick={() => {
                      this.registerUser(this.state.email, this.state.password);
                    }}
                  >
                    Sign Up
                  </Button>
                </Form>

                <div className="text-right mt-5">
                  <p className="pt-5">
                    Already Registered!{" "}
                    <NavLink className="link prime-color" to="/">
                      Sign In here
                    </NavLink>
                  </p>
                </div>
              </div>
            </Col>
            <Col lg={7} className=" px-0">
              <img
                src={getImgUrl(this.mainBannerImage)}
                className="main-banner"
                alt=""
              />
            </Col>
          </Row>
        )}
      </section>
    );
  }
}

export default withRouter(RegisterComponent);
