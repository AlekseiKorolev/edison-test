import React, { useState, useRef, useEffect } from "react";

import { required } from "../../util/validators";
import { timeOptions } from "../../util/time-options";

// redux
import { useDispatch, useSelector } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { firstPhaseVote } from "../../redux/actions/vote-actions";

// components
import CustomSelect from "../custom-select/custom-select.component";
import CustomInput from "../custom-input/custom-input.component";
import Autofill from "../autofill/autofill.component";

// bootstrap
import { Form, Button } from "react-bootstrap";

const FirstPhaseForm = () => {
  const [display, setDisplay] = useState(false);
  const loading = useSelector(state => state.ui.loading);
  const value = useSelector(state => state.form?.firstPhase?.values?.event);
  const dispatch = useDispatch();
  const wrapperRef = useRef(null);

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(firstPhaseVote("first"));
  };

  const handleClickOutside = event => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false);
    }
  };

  const handleSelect = () => {
    setDisplay(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Form
      ref={wrapperRef}
      className="form"
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <Field
        name="time"
        label="Время"
        component={CustomSelect}
        validate={required}
      >
        {timeOptions()}
      </Field>

      <Field
        name="event"
        type="text"
        component={CustomInput}
        label="Мероприятие"
        placeholder=""
        validate={required}
        warn={required}
        onFocus={() => setDisplay(true)}
      />
      {display && <Autofill value={value} handleSelect={handleSelect} />}
      <Button variant="primary" type="submit" disabled={loading}>
        Отдать голос
      </Button>
    </Form>
  );
};

export default reduxForm({ form: "firstPhase" })(FirstPhaseForm);
