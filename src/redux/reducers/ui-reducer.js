import {
  LOADING,
  CLEAR_ERROR,
  SET_ERROR,
  SET_PHASE,
  SET_VOCABULARY,
  SET_ALERT,
  REMOVE_ALERT,
  SET_FINISH,
  GET_VOTE
} from "../types";

const initialState = {
  loading: false,
  error: "",
  countdown: 0,
  phase: "",
  vocabulary: [],
  info: [],
  break: false,
  isFinished: false
};

const uiReducer = (state = initialState, action) => {
  let alert;
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: "",
        loading: false
      };
    case SET_PHASE:
      return {
        ...state,
        countdown: action.payload.milliseconds,
        phase: action.payload.phase
      };
    case SET_VOCABULARY:
      return {
        ...state,
        vocabulary: action.payload.vocabulary
      };
    case SET_ALERT:
      alert = [...state.info];
      if (alert.length > 5) alert.pop();
      return {
        ...state,
        info: [action.payload, ...alert]
      };
    case REMOVE_ALERT:
      alert = [...state.info];
      alert.shift();
      return {
        ...state,
        info: alert
      };
    case SET_FINISH:
      return {
        ...state,
        isFinished: true
      };
    case GET_VOTE:
      return {
        ...state,
        isFinished: false
      };
    default:
      return state;
  }
};

export default uiReducer;
