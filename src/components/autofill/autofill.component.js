import React, { useState, useEffect } from "react";

// redux
import { change } from "redux-form";
import { useDispatch, useSelector } from "react-redux";

import "./autofill.scss";

const Autofill = ({ value, handleSelect }) => {
  const [words, setWords] = useState([]);
  const vocabulary = useSelector(state => state.ui.vocabulary);
  const dispatch = useDispatch();

  const handleClick = value => {
    dispatch(change("firstPhase", "event", value));
    handleSelect();
  };

  useEffect(() => {
    if (value === undefined) return;
    const arr = vocabulary.filter(word => word.includes(value.toLowerCase()));
    setWords(arr);
  }, [value, vocabulary]);

  return (
    <ul className="autofill">
      {words.map((word, index) => (
        <li key={`autofill${index}`} onClick={() => handleClick(word)}>
          {word}
        </li>
      ))}
    </ul>
  );
};

export default Autofill;
