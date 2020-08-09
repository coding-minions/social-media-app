import {
  IS_LOADING,
  REGISTER_USER,
  LOGIN_USER,
  ADJUST_ERROR
} from "../actions/actionTypes";
import { EMAIL_EXISTS } from "../actions/errorMsg";

const initState = {
  user: null,
  isAuthenticated: false,
  isError: false,
  errorMsg: "",
  isLoading: false
};

const authReducer = (state = initState, action) => {
  let payload = action.payload;

  console.log(payload);

  switch (action.type) {
    //loading case
    case IS_LOADING:
      return {
        ...state,
        isLoading: true
      };

    //register case
    case REGISTER_USER:
      if (payload.failure) {
        return {
          ...state,
          isError: true,
          isLoading: false
        };
      } else if (payload.success) {
        return {
          ...state,
          isAuthenticated: true,
          isLoading: false,
          user: payload.response
        };
      } else {
        return state;
      }

    //login case
    case LOGIN_USER:
      if (payload.failure) {
        // console.log("inside error");
        return {
          ...state,
          isLoading: false,
          isError: true,
          errorMsg: payload.errorMsg
        };
      } else if (payload.success) {
        // console.log("inside success");

        return {
          ...state,
          isAuthenticated: true,
          isLoading: false,
          user: payload.response
        };
      } else {
        // console.log("inside else login user");
        return { ...state, isLoading: false };
      }

    case ADJUST_ERROR:
      return {
        ...state,
        isError: false
      };

    //default case
    default:
      return state;
  }
};

export default authReducer;
