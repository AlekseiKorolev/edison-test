import React, { useMemo } from "react";

// redux
import { useSelector } from "react-redux";

// components
import Timer from "../timer/timer.component";
import FirstPhaseForm from "../first-phase-form/first-phase-form.component";
import VoteCounter from "../vote-counter/vote-counter.component";

import "./first-phase.scss";

const FirstPhase = () => {
  const email = useSelector(state => state.user.email);
  const voted = useSelector(state => state.vote.last.first).some(
    vote => vote.email === email
  );
  const countdown = useSelector(state => state.ui.countdown);
  const loading = useSelector(state => state.ui.loading);
  const timer = useMemo(() => <Timer countdown={countdown} />, [countdown]);

  return (
    <div className="phaseContainer">
      <div className="secondaryTitle">
        До конца первой фазы голосования осталось
      </div>

      {!loading && timer}

      {!loading && voted ? (
        <div>Вы уже проголосовали. Дождитесь результатов</div>
      ) : (
        <FirstPhaseForm />
      )}
      <VoteCounter />
    </div>
  );
};

export default FirstPhase;
