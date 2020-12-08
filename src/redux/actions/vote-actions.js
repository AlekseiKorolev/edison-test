import { firestore } from "../../util/firebase-initialize";
import {
  GET_VOTE,
  SET_PHASE,
  LOADING,
  SET_ERROR,
  CLEAR_ERROR,
  SET_ALERT,
  SET_FINISH
} from "../types";

import { getFirstPhaseResult } from "../../util/first-phase-result";
import { updateVocabulary } from "./ui-actions.js";
import store from "../store";

const getDiff = (duration, createdAt) => {
  const milliseconds = duration * 60 * 1000;
  const currentDate = Date.now();
  const created = new Date(createdAt);
  return milliseconds - (currentDate - created.getTime());
};

const getPhaseTime = vote => {
  const last = vote || store.getState().vote.last;
  const phaseFirstDiff = getDiff(Number(last.durFirst), last.createdAt);
  const phaseSecondDiff = getDiff(
    Number(last.durSecond) + Number(last.durFirst),
    last.createdAt
  );
  return { phaseFirstDiff, phaseSecondDiff };
};

export const checkLastVote = data => dispatch => {
  let vote = data;
  if (!vote || vote === "update") {
    //If current vote doesn't exists or times up
    vote = store.getState().vote.last;
  }

  if (vote.done) {
    //If vote close
    dispatch({
      type: SET_PHASE,
      payload: { phase: "", milliseconds: 0 }
    });
    return;
  }

  const { phaseFirstDiff, phaseSecondDiff } = getPhaseTime(vote);

  const phase = store.getState().ui.phase;
  if (
    phaseFirstDiff < 0 &&
    phaseSecondDiff < 0 &&
    phase === "second" &&
    data === "update"
  ) {
    dispatch({ type: SET_FINISH });
    return;
  }

  if (phaseFirstDiff > 0) {
    dispatch({
      type: SET_PHASE,
      payload: { phase: "first", milliseconds: phaseFirstDiff }
    });
  } else if (phaseSecondDiff > 0) {
    dispatch({
      type: SET_PHASE,
      payload: { phase: "second", milliseconds: phaseSecondDiff }
    });
    if (data === "update" || !("second" in data)) {
      //get diagramm data and switch from first phase to second
      const voted = store.getState().vote.last.first;
      const {
        inner,
        outer,
        winner,
        tie,
        winnerList,
        voterList
      } = getFirstPhaseResult(voted);
      dispatch(
        startSecondPhase(inner, outer, winner, tie, winnerList, voterList)
      );
    }
  } else {
    dispatch({
      type: SET_PHASE,
      payload: { phase: "", milliseconds: 0 }
    });
  }
};

export const getVote = () => dispatch => {
  firestore
    .collection("vote")
    .doc("current")
    .onSnapshot(
      {
        includeMetadataChanges: true
      },
      doc => {
        if (!doc.exists) {
          //Document doesn't exists
          firestore
            .collection("vote")
            .doc("current")
            .set({ autoCreated: true })
            .then(() => {
              dispatch({ type: CLEAR_ERROR });
            })
            .catch(error => {
              dispatch({ type: SET_ERROR, payload: error.message });
            });
        }
        const vote = doc.data();
        dispatch({ type: LOADING }); //to refresh phase component
        dispatch({ type: GET_VOTE, payload: vote });
        dispatch({ type: CLEAR_ERROR });
        dispatch(checkLastVote(vote));
      }
    );
};

export const startVote = () => dispatch => {
  const phase = store.getState().ui.phase;
  const isFinished = store.getState().ui.isFinished;
  const email = store.getState().user.email;
  if (phase && !isFinished) {
    dispatch({
      type: SET_ALERT,
      payload: {
        message:
          "На данный момент уже есть активное голование. Попробуйте создать голосование позднее",
        type: "warning"
      }
    });
    return;
  }

  const { durFirst, durSecond } = store.getState().form.voteForm?.values || {};
  if (!durFirst || !durSecond) return;

  const vote = {
    durFirst,
    durSecond,
    author: email,
    first: [],
    createdAt: new Date().toISOString()
  };

  const message = "Голосование успешно создано";
  //dispatch({ type: START_VOTE });
  dispatch(updateVote(vote, message));
};

export const firstPhaseVote = phase => dispatch => {
  const email = store.getState().user.email;
  const { time, event } = store.getState().form.firstPhase?.values || {};

  if (!time || !event) {
    dispatch({
      type: SET_ALERT,
      payload: { message: "Ошибка время/мероприятие", type: "danger" }
    });
    return;
  }

  const vote = store.getState().vote.last;
  vote.first.push({ email, time, event: event.trim().toLowerCase() });
  const message = "Ваш голос учтён";
  dispatch(updateVote(vote, message));
  dispatch(updateVocabulary(event));
};

const startSecondPhase = (
  inner,
  outer,
  winner,
  tie,
  winnerList,
  voterList
) => dispatch => {
  const vote = {
    ...store.getState().vote.last,
    second: winnerList,
    voters: voterList,
    outer: outer.map(el => {
      return { ...el };
    }),
    inner: inner.map(el => {
      return { ...el };
    }),
    winner,
    tie
  };

  const message = "Вторая фаза активного голосования";
  dispatch(updateVote(vote, message));
};

export const changeShoes = (type, email) => dispatch => {
  const vote = store.getState().vote.last;
  if (type === "yes") {
    vote.second = [...vote.second, email];
  }
  vote.voters = [...vote.voters.filter(voter => voter !== email)];
  const message = "Ваше мнение учтено";
  dispatch(updateVote(vote, message));
};

export const stopVote = () => dispatch => {
  const vote = store.getState().vote.last;
  vote.breakVote = true;
  const message = "Голосование окончено досрочно";
  dispatch(updateVote(vote, message));
};

export const closeVote = () => dispatch => {
  const vote = store.getState().vote.last;
  vote.done = true;
  const message = "";
  dispatch(updateVote(vote, message));
};

/*const autoCloseVote = () => dispatch => {
  const vote = store.getState().vote.last;
  vote.autoClose = true;
  vote.durSecond = vote.durSecond + 2 * 60 * 100;
  const message =
    "Результаты голосования будут автоматически удалены через 2 минуты";
  dispatch(updateVote(vote, message));
};*/

export const restartVote = () => dispatch => {
  dispatch({
    type: SET_PHASE,
    payload: { phase: "", milliseconds: 0 }
  });
};

const updateVote = (data, message) => dispatch => {
  dispatch({ type: LOADING });
  firestore
    .collection("vote")
    .doc("current")
    .set(data)
    .then(() => {
      message &&
        dispatch({
          type: SET_ALERT,
          payload: {
            message: message,
            type: "info"
          }
        });
      dispatch({ type: CLEAR_ERROR });
    })
    .catch(error => {
      dispatch({ type: SET_ERROR, payload: error.message });
    });
};
