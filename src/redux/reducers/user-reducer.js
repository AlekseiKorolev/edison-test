import { SIGNIN, SIGNOUT } from "../types";

const initialState = {
  displayName: "",
  email: "",
  authenticated: false,
  voted: {
    first: false,
    second: false
  }
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN:
      return {
        ...state,
        displayName: action.payload.user.displayName,
        email: action.payload.user.email,
        authenticated: true
      };
    case SIGNOUT:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export default userReducer;
