import React, { useState, useEffect } from "react";

// redux
import { useDispatch, useSelector } from "react-redux";
import { removeAlert } from "../../redux/actions/ui-actions";

import "./signin.scss";
// bootstrap
import { Container, Row } from "react-bootstrap";

// components
import SignInForm from "../../components/signin-form/signin-form.component";
import Alert from "../../components/alert/alert.component";

const SignIn = ({ history }) => {
  const [isNew, setIsNew] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const loading = useSelector(state => state.ui.loading);
  const info = useSelector(state => state.ui.info);
  const authenticated = useSelector(state => state.user.authenticated);
  const dispatch = useDispatch();

  const handleClick = () => {
    history.push(isNew ? "/signin" : "/signup");
  };

  const handleClose = () => {
    setIsShow(false);
    dispatch(removeAlert());
  };

  useEffect(() => {
    const path = history.location.pathname.split("/").pop();
    if (path === "signup") {
      setIsNew(true);
    } else if (path === "signin") {
      setIsNew(false);
    }
  }, [history.location.pathname]);

  useEffect(() => {
    if (!loading && authenticated) {
      history.push("/");
    }
  }, [loading, authenticated, history]);

  useEffect(() => {
    if (info.length !== 0) {
      setIsShow(true);
    }
  }, [info]);

  return (
    <Container fluid className="signinContainer">
      <Row className="primaryTitle">{isNew ? "Регистрация" : "Вход"}</Row>
      <Row>
        <SignInForm loading={loading} isNew={isNew} />
      </Row>
      <Row>
        <div className="link" onClick={handleClick}>
          {isNew ? "Уже зарегистрировался?" : "Не зарегистрирован?"}
        </div>
      </Row>
      {isShow && (
        <Alert
          message={info[0].message}
          type={info[0].type}
          handleClose={handleClose}
        />
      )}
    </Container>
  );
};

export default SignIn;
