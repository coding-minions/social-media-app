import { IS_LOADING, REGISTER_USER, LOGIN_USER } from "../actions/actionTypes";
import { EMAIL_EXISTS } from "../actions/errorMsg";

const initState = {
  user: null,
  isAuthenticated: false,
  isEmailExist: false,
  isServerError: false,
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
      if (payload.failure && payload.errorMsg == EMAIL_EXISTS) {
        return {
          ...state,
          isEmailExist: true,
          isLoading: false
        };
      } else if (payload.failue) {
        return {
          ...state,
          isServerError: true,
          isLoading: false
        };
      } else if (payload.success) {
        return {
          ...state,
          isAuthenticated: true,
          isLoading: false,
          user: payload.response
        };
      }
      break;

    //login case
    case LOGIN_USER:
      if (payload.failue) {
        return {
          ...state,
          // isServerError: true,
          isLoading: false
        };
      } else if (payload.success) {
        return {
          ...state,
          isAuthenticated: true,
          isLoading: false,
          user: payload.response
        };
      }

      break;
    //default case
    default:
      return state;
  }
};

export default authReducer;
