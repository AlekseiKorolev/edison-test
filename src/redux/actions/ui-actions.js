import { firestore } from "../../util/firebase-initialize";
import {
  SET_VOCABULARY,
  LOADING,
  CLEAR_ERROR,
  SET_ERROR,
  REMOVE_ALERT,
  SET_ALERT
} from "../types";

export const removeAlert = () => dispatch => {
  dispatch({ type: REMOVE_ALERT });
};

export const setVocabulary = () => dispatch => {
  dispatch({ type: LOADING });
  firestore
    .collection("auto")
    .doc("vocabulary")
    .onSnapshot(
      {
        includeMetadataChanges: true
      },
      doc => {
        if (!doc.exists) {
          dispatch({
            type: SET_ALERT,
            payload: {
              message: "Ошибка загрузки словаря мероприятий",
              type: "danger"
            }
          });
          return;
        }

        dispatch({ type: SET_VOCABULARY, payload: doc.data() });
        dispatch({ type: CLEAR_ERROR });
      }
    );
};

export const updateVocabulary = event => dispatch => {
  dispatch({ type: LOADING });
  firestore
    .collection("auto")
    .doc("vocabulary")
    .get()
    .then(doc => {
      if (!doc.exists) return;
      const { vocabulary } = doc.data();
      const newEvent = event.trim().toLowerCase();
      if (!vocabulary.includes(newEvent)) {
        vocabulary.push(newEvent);
      }
      firestore
        .collection("auto")
        .doc("vocabulary")
        .set({ vocabulary })
        .then(() => {
          dispatch({ type: CLEAR_ERROR });
        })
        .catch(error => {
          dispatch({
            type: SET_ALERT,
            payload: {
              message: "Ошибка обновления словаря мероприятий",
              type: "danger"
            }
          });
          dispatch({ type: SET_ERROR, payload: error.message });
        });
    });
};
