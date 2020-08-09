import React from "react";
import { NavLink } from "react-router-dom";

import { connect } from "react-redux";

import "./HeaderComponent.css";

function HeaderComponent(props) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg p-4 navbar-light">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            Social Media App
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              {!props.isAuthenticated ? (
                <li className="nav-item active">
                  <NavLink
                    className="nav-link"
                    exact={true}
                    activeClassName="active"
                    to="/"
                  >
                    Sign In
                  </NavLink>
                </li>
              ) : (
                ""
              )}
              {!props.isAuthenticated ? (
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    activeClassName="active"
                    to="/register"
                  >
                    Sign Up
                  </NavLink>
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authReducer.isAuthenticated
  };
};

export default connect(
  mapStateToProps,
  null
)(HeaderComponent);
