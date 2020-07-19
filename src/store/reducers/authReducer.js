import { CHECK_EMAIL, CHECK_PASSWORD } from "../actions/actionTypes";

const initState = {
  isEmailValid: true,
  isPasswordValid: true
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case CHECK_EMAIL:
      return {
        ...state,
        isEmailValid: action.payload.emailRegex.test(action.payload.email)
      };
    case CHECK_PASSWORD:
      return {
        ...state,
        isPasswordValid: action.payload.password.length > 0 ? true : false
      };
    default:
      return state;
  }
};

export default authReducer;
