import React from "react";

import useInterval from "../../util/useInterval";

// redux
import { useSelector } from "react-redux";

import "./timer.scss";

const timeFormat = time => (time < 10 ? "0" + time : time);

const Timer = () => {
  const countdown = useSelector(state => state.ui.countdown);
  const time = useInterval(0, countdown);
  const minutes = Math.floor((countdown - time) / 1000 / 60);
  const seconds = Math.floor((countdown - time) / 1000 - minutes * 60);

  return (
    <div className="timer">
      {timeFormat(minutes)} : {timeFormat(Math.floor(seconds))}
    </div>
  );
};

export default Timer;
