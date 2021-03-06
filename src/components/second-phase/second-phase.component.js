import React, { useEffect, useMemo } from "react";

// redux
import { useDispatch, useSelector } from "react-redux";
import {
  changeShoes,
  closeVote,
  stopVote,
  restartVote
} from "../../redux/actions/vote-actions";

// components
import Timer from "../timer/timer.component";
import Board from "../board/board.component";
import Diagram from "../diagram/diagram.component";
import WinnerList from "../winner-list/winner-list.component";

import "./second-phase.scss";
// bootstrap
import { Button, ButtonGroup } from "react-bootstrap";

const SecondPhase = () => {
  const {
    inner,
    outer,
    winner,
    tie,
    second,
    voters,
    breakVote,
    author
  } = useSelector(state => state.vote.last);
  const email = useSelector(state => state.user.email);
  const loading = useSelector(state => state.ui.loading);
  const countdown = useSelector(state => state.ui.countdown);
  const isFinished = useSelector(state => state.ui.isFinished);
  const timer = useMemo(() => <Timer countdown={countdown} />, [countdown]);
  const diagram = useMemo(
    () =>
      inner && inner.length > 0 ? (
        <Diagram
          inner={inner.map(el => Object.values(el))}
          outer={outer.map(el => Object.values(el))}
        />
      ) : null,
    [inner, outer]
  );
  const dispatch = useDispatch();

  const handleClick = type => {
    dispatch(changeShoes(type, email));
  };

  const handleClose = () => {
    dispatch(closeVote());
  };

  const handleRestart = () => {
    dispatch(restartVote());
  };

  useEffect(() => {
    if (!voters) return;
    if (voters.length === 0 && !breakVote) {
      dispatch(stopVote());
    }
  }, [voters, breakVote, dispatch]);

  return second !== undefined ? (
    <div className="phaseContainer">
      <div className="secondaryTitle">
        До конца второй фазы голосования осталось
      </div>
      {!loading && !isFinished ? timer : <Board />}

      {!loading && diagram}

      {tie || second.length === 0 ? (
        <div>
          <div className="thirdTitle">
            Победителя мероприятия определить не удалось.
          </div>
        </div>
      ) : (
        second.length !== 0 && (
          <WinnerList winner={winner} winnerList={second} />
        )
      )}

      {!isFinished && !tie && voters.includes(email) ? (
        <div className="buttonGroup">
          <div>Хотите присоединиться к победителю ?</div>
          <ButtonGroup>
            <Button
              variant="primary"
              onClick={() => handleClick("yes")}
              disabled={loading}
            >
              За
            </Button>
            <Button
              variant="secondary"
              onClick={() => handleClick("no")}
              disabled={loading}
            >
              Против
            </Button>
          </ButtonGroup>
        </div>
      ) : null}

      {!isFinished && (tie || breakVote) ? (
        <div className="buttonGroup">
          <div className="text">
            Голосование завершено. Дождитесь окончания второй фазы
          </div>
        </div>
      ) : null}

      {!isFinished && author === email && (
        <ButtonGroup>
          <Button variant="primary" onClick={handleClose} disabled={loading}>
            Закрыть
          </Button>
          <Button
            variant="secondary"
            onClick={handleRestart}
            disabled={loading}
          >
            Перезапустить
          </Button>
        </ButtonGroup>
      )}

      {isFinished ? (
        <div className="buttonGroup">
          <div className="text">
            Голосование закроеткся автоматически, как только появиться новое
            активное голосование
          </div>
          <Button
            variant="primary"
            onClick={() => handleRestart()}
            disabled={loading}
          >
            Закрыть
          </Button>
        </div>
      ) : null}
    </div>
  ) : (
    <div />
  );
};

export default SecondPhase;
