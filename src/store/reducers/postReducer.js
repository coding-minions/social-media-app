import * as postActions from "../actions/postActions";

const initState = {
  post: []
};

const postReducer = (state = initState, action) => {
  switch (action.type) {
    case postActions.ADD_POST:
      return {
        ...state,
        name: action.payload.name
      };

    case postActions.DELETE_POST:

    case postActions.GET_POST:
  }
  return state;
};

export default postReducer;
