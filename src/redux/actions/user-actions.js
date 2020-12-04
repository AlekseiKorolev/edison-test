import { firebase } from "../../util/firebase-initialize";
import {
  SIGNIN,
  SIGNOUT,
  LOADING,
  SET_ERROR,
  CLEAR_ERROR,
  SET_ALERT
} from "../types";
import { getVote } from "./vote-actions";
import { setVocabulary } from "./ui-actions";

import store from "../store";

export const signin = isNew => dispatch => {
  const { email, password } = store.getState().form.signinForm?.values || {};
  if (!email || !password) {
    dispatch({
      type: SET_ALERT,
      payload: { message: "Ошибка пароль/электронная почта", type: "danger" }
    });
    return;
  }
  dispatch({ type: LOADING });
  if (isNew) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        dispatch({ type: SIGNIN, payload: user });
        dispatch({
          type: SET_ALERT,
          payload: { message: "Регистрация прошла успешно", type: "info" }
        });
        dispatch(getVote());
        dispatch(setVocabulary());
        dispatch({ type: CLEAR_ERROR });
      })
      .catch(error => {
        dispatch({
          type: SET_ALERT,
          payload: { message: error.message, type: "danger" }
        });
        dispatch({
          type: SET_ERROR,
          payload: { message: error.message, title: error.code }
        });
      });
  } else {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        dispatch({ type: SIGNIN, payload: user });
        dispatch({
          type: SET_ALERT,
          payload: { message: "Вход успешно выполнен", type: "info" }
        });
        dispatch(getVote());
        dispatch(setVocabulary());
        dispatch({ type: CLEAR_ERROR });
      })
      .catch(error => {
        dispatch({
          type: SET_ALERT,
          payload: { message: error.message, type: "danger" }
        });
        dispatch({
          type: SET_ERROR,
          payload: { message: error.message, title: error.code }
        });
      });
  }
};

export const signout = () => dispatch => {
  dispatch({ type: LOADING });
  firebase
    .auth()
    .signOut()
    .then(() => {
      dispatch({ type: SIGNOUT });
      dispatch({
        type: SET_ALERT,
        payload: { message: "Выход успешно выполнен", type: "info" }
      });
      dispatch({ type: CLEAR_ERROR });
    })
    .catch(error => {
      dispatch({
        type: SET_ALERT,
        payload: { message: error.message, type: "danger" }
      });
      dispatch({
        type: SET_ERROR,
        payload: { message: error.message, title: error.code }
      });
    });
};
