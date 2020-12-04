import React from "react";

// redux
import { useSelector } from "react-redux";

import "./vote-counter.scss";

const VoteCounter = () => {
  const phase = useSelector(state => state.ui.phase);
  const counter = useSelector(state => state.vote.last[phase]);
  return (
    <div className="counter">
      Число проголосовавших : <span className="count">{counter.length}</span>
    </div>
  );
};

export default VoteCounter;
