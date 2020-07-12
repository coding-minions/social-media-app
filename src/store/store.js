import { createStore, combineReducers } from "redux";

import userReducer from "./reducers/userReducer";
import postReducer from "./reducers/postReducer";

const rootReducer = combineReducers({
  userReducer,
  postReducer
});

const store = createStore(rootReducer);

export default store;
