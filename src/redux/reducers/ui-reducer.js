import {
  LOADING,
  CLEAR_ERROR,
  SET_ERROR,
  SET_PHASE,
  SET_VOCABULARY,
  SET_ALERT,
  REMOVE_ALERT
} from "../types";

const initialState = {
  loading: false,
  error: "",
  countdown: 0,
  phase: "",
  vocabulary: [],
  info: [],
  break: false
};

const uiReducer = (state = initialState, action) => {
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
      return {
        ...state,
        info: [action.payload, ...state.info]
      };
    case REMOVE_ALERT:
      const alert = [...state.info];
      alert.shift();
      return {
        ...state,
        info: alert
      };
    default:
      return state;
  }
};

export default uiReducer;
