import React from "react";
import { useHistory } from "react-router-dom";

import { maxnumber, required } from "../../util/validators";

// redux
import { useDispatch, useSelector } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { startVote } from "../../redux/actions/vote-actions";

// bootstrap
import { Form, Button } from "react-bootstrap";

// components
import CustomInput from "../../components/custom-input/custom-input.component";

const VoteForm = () => {
  const loading = useSelector(state => state.ui.loading);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(startVote(history));
  };

  return (
    <div>
      <div className="secondaryTitle">Создать голосование</div>
      <Form className="form" onSubmit={handleSubmit}>
        <Field
          name="durFirst"
          type="text"
          component={CustomInput}
          label="Продолжительность первой фазы (мин)"
          placeholder="не более 60 минут"
          validate={[required, maxnumber]}
          warn={[required, maxnumber]}
        />
        <Field
          name="durSecond"
          type="text"
          component={CustomInput}
          label="Продолжительность второй фазы (мин)"
          placeholder="не более 60 минут"
          validate={[required, maxnumber]}
          warn={[required, maxnumber]}
        />
        <Button variant="primary" type="submit" disabled={loading}>
          Старт
        </Button>
      </Form>
    </div>
  );
};

export default reduxForm({ form: "voteForm" })(VoteForm);
