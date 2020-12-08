import { useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import { checkLastVote } from "../redux/actions/vote-actions";

const useInterval = (initailState = 0, countdown) => {
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => setTime(time => time + 1000), 1000);
    setTimer(interval);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (countdown - time < 0) {
      setTime(0);
      clearInterval(timer);
      dispatch(checkLastVote("update"));
    }
  }, [time, countdown, timer, dispatch]);

  return time;
};

export default useInterval;
