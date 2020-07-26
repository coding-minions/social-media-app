import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { NavLink, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import * as $ from "jquery";

import { SiteConfig } from "../../config/siteConfig";
import { getImgUrl } from "../../helpers/ImgHelper";
import { LoaderComponent } from "../../shared/LoaderComponent/LoaderComponent";
import "./LoginComponent.css";

import { loginUser, startLoader } from "../../store/actions/authActions";

class LoginComponent extends React.Component {
  title = SiteConfig.title;
  mainBannerImage = "home-banner-image.png";
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;

  loginBtn = null;
  history = null;

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
    this.history = this.props.history;
  }

  componentDidMount() {
    document.title = this.title;

    this.loginBtn = $("#login-btn")[0];
    if (this.loginBtn != undefined) {
      this.loginBtn.disabled = true;
    }
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
    if (this.props.isAuthenticated) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <section className="section">
        {this.props.isLoading ? (
          <LoaderComponent />
        ) : (
          <Row className="row">
            <Col lg={5} className="shadow rounded px-0 login-form">
              <div className="py-3 px-5">
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
                      onBlur={event => this.checkEmail(event)}
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

const mapStateToProps = state => {
  return {
    isLoading: state.authReducer.isLoading,
    isServerError: state.authReducer.isServerError,
    isAuthenticated: state.authReducer.isAuthenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    startLoader: () => dispatch(startLoader()),
    loginUser: (email, password) => dispatch(loginUser(email, password))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LoginComponent));
