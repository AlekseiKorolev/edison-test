import { GET_VOTE, SET_RESULT } from "../types";

const initialState = {
  last: {
    durFirst: "",
    durSecond: "",
    first: [],
    second: [],
    createdAt: "",
    id: ""
  },
  counter: 0,
  result: {}
};

const voteReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VOTE:
      return {
        ...state,
        last: action.payload
      };
    case SET_RESULT:
      return {
        ...state,
        result: action.payload
      };
    default:
      return state;
  }
};

export default voteReducer;
