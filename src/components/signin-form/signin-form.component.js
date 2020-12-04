import React, { useEffect } from "react";

import { email, required } from "../../util/validators";

// redux
import { useDispatch } from "react-redux";
import { Field, reduxForm, reset } from "redux-form";
import { signin } from "../../redux/actions/user-actions";

// bootstrap
import { Form, Button } from "react-bootstrap";

// components
import CustomInput from "../../components/custom-input/custom-input.component";

const SignInForm = ({ loading, isNew }) => {
  const dispatch = useDispatch();
  const handleSubmit = event => {
    dispatch(signin(isNew));
    event.preventDefault();
  };

  useEffect(() => {
    dispatch(reset("signinForm"));
  }, [isNew, dispatch]);

  return (
    <Form className="form" onSubmit={handleSubmit}>
      <Field
        name="email"
        type="text"
        component={CustomInput}
        label="Адрес электронной почты"
        placeholder="myprivate@email.com"
        validate={[required, email]}
      />
      <Field
        name="password"
        type="password"
        component={CustomInput}
        label="Пароль"
        placeholder=""
        validate={required}
      />
      <Button variant="primary" type="submit" disabled={loading}>
        {isNew ? "Регистрация" : "Войти"}
      </Button>
    </Form>
  );
};

export default reduxForm({ form: "signinForm" })(SignInForm);
