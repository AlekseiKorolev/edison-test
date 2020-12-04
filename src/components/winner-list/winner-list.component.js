import React from "react";

import "./winner-list.scss";

const WinnerList = ({ winner, winnerList }) => {
  return (
    <div className="winnerBoard">
      <div className="thirdTitle">Победитель</div>
      <div className="secondaryTitle">
        <span className="eventTitle">{winner.event}</span> в {winner.time}
      </div>
      <div>Список проголосовавших</div>
      <ul>
        {winnerList.map((voter, index) => (
          <li key={`voter${index}`}>{voter}</li>
        ))}
      </ul>
    </div>
  );
};

export default WinnerList;
