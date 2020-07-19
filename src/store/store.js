import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import userReducer from "./reducers/userReducer";
import postReducer from "./reducers/postReducer";
import authReducer from "./reducers/authReducer";

const rootReducer = combineReducers({
  userReducer,
  postReducer,
  authReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
