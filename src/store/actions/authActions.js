import { LOGIN_USER, CHECK_EMAIL, CHECK_PASSWORD } from "./actionTypes";

export const checkEmail = (email, emailRegex) => {
  return {
    type: CHECK_EMAIL,
    payload: {
      email,
      emailRegex
    }
  };
};

export const checkPassword = password => {
  return {
    type: CHECK_PASSWORD,
    payload: {
      password
    }
  };
};
