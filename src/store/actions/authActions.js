import { LOGIN_USER, REGISTER_USER, IS_LOADING } from "./actionTypes";
import { SiteConfig } from "../../config/siteConfig";
import Axios from "axios";

const userRegisterSuccess = response => {
  return {
    type: REGISTER_USER,
    payload: {
      response,
      success: true
    }
  };
};

const userRegisterFail = errorRes => {
  return {
    type: REGISTER_USER,
    payload: {
      errorMsg: errorRes.data.error.message,
      failure: true
    }
  };
};

export const registerUser = (email, password) => {
  return dispatch => {
    Axios.post(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
        SiteConfig.firebaseAPIKey,
      {
        email,
        password,
        returnSecureToken: true
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then(success => {
        console.log(success);
        dispatch(userRegisterSuccess(success));
      })
      .catch(failure => {
        console.log(failure.response);
        dispatch(userRegisterFail(failure.response));
      });
  };
};

export const startLoader = () => {
  return {
    type: IS_LOADING
  };
};

const userLoginSuccess = response => {
  return {
    type: LOGIN_USER,
    payload: {
      response,
      success: true
    }
  };
};

const userLoginFail = errorRes => {
  return {
    type: LOGIN_USER,
    payload: {
      errorMsg: errorRes.data.error.message,
      failure: true
    }
  };
};

export const loginUser = (email, password) => {
  // console.log("inside login action creator ");

  return dispatch => {
    Axios.post(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
        SiteConfig.firebaseAPIKey,
      {
        email,
        password,
        returnSecureToken: true
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then(success => {
        console.log(success);
        dispatch(userLoginSuccess(success));
      })
      .catch(failure => {
        console.log(failure.response);
        dispatch(userLoginFail(failure.response));
      });
  };
};
