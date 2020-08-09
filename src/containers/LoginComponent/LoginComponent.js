import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

import { NavLink, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { ToastProvider } from "react-toast-notifications";

import * as $ from "jquery";

import { SiteConfig } from "../../config/siteConfig";
import { getImgUrl } from "../../helpers/ImgHelper";
import { LoaderComponent } from "../../shared/LoaderComponent/LoaderComponent";
import "./LoginComponent.css";

import {
  loginUser,
  startLoader,
  adjustIsError
} from "../../store/actions/authActions";
import { ToasterComponent } from "../../shared/ToasterComponent/ToasterComponent";

class LoginComponent extends React.Component {
  title = SiteConfig.title;
  mainBannerImage = "home-banner-image.png";
  emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;

  loginBtn = null;

  state = {
    email: null,
    password: null,
    isEmailTouched: false,
    isPasswordTouched: false,
    isEmailValid: false,
    isPasswordValid: false
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.title = this.title;

    this.loginBtn = $("#login-btn")[0];
    if (this.loginBtn !== undefined) {
      this.loginBtn.disabled = true;
    }
  }

  checkEmail = event => {
    if (this.props.isError) {
      this.props.adjustIsError();
    }

    let emailValue = event.target.value;
    let result = this.emailRegex.test(emailValue);

    this.setState({
      ...this.state,
      isEmailValid: result,
      isEmailTouched: true,
      email: emailValue
    });

    this.state.isEmailValid && this.state.isPasswordValid
      ? (this.loginBtn.disabled = false)
      : (this.loginBtn.disabled = true);
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
      ? (this.loginBtn.disabled = false)
      : (this.loginBtn.disabled = true);
  };

  loginUser = () => {
    this.props.startLoader();
    this.props.loginUser(this.state.email, this.state.password);
  };

  render() {
    if (this.props.isAuthenticated || localStorage.getItem("authToken")) {
      this.props.history.push({ pathname: "/dashboard", source: "login" });
    }

    return (
      <section className="section">
        {this.props.isError ? (
          <ToasterComponent
            error={this.props.isError}
            msg={this.props.errorMsg}
          />
        ) : null}

        {this.props.isLoading ? (
          <LoaderComponent />
        ) : (
          <Row className="row">
            <Col xl={5} lg={5} className="shadow rounded px-0 login-form">
              <div className="py-3 px-5">
                <Image
                  src={getImgUrl(this.mainBannerImage)}
                  className="main-banner-mobile d-sm-block d-lg-none"
                  alt=""
                />
                <div className="text-center my-5">
                  <h5 className="prime-color">Log in to {this.title} </h5>
                </div>

                <Form>
                  <Form.Group>
                    <Form.Control
                      type="email"
                      placeholder="Enter Your Email"
                      pattern={this.emailRegex}
                      required
                      onBlur={event => {
                        if (event.target.value.length > 0) {
                          this.checkEmail(event);
                        }
                      }}
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
                      required
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
                    id="login-btn"
                    onClick={this.loginUser}
                    className="w-100"
                  >
                    Sign In
                  </Button>
                </Form>

                <div className="text-right redirect-text">
                  <p className="pt-5">
                    Not Registered!&nbsp;
                    <NavLink className="link prime-color" to="/register">
                      Sign Up here
                    </NavLink>
                  </p>
                </div>
              </div>
            </Col>
            <Col lg={7} className="px-0">
              <Image
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

const mapStateToProps = state => {
  return {
    isLoading: state.authReducer.isLoading,
    isError: state.authReducer.isError,
    errorMsg: state.authReducer.errorMsg,
    isAuthenticated: state.authReducer.isAuthenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    startLoader: () => dispatch(startLoader()),
    loginUser: (email, password) => dispatch(loginUser(email, password)),
    adjustIsError: () => dispatch(adjustIsError())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LoginComponent));
