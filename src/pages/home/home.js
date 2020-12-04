import React, { useState, useEffect } from "react";

// redux
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../redux/actions/user-actions";
import { removeAlert } from "../../redux/actions/ui-actions";

import "./home.scss";
// bootstrap
import { Container, Row, Col } from "react-bootstrap";

// components
import VoteForm from "../../components/vote-form/vote-form.component";
import FirstPhase from "../../components/first-phase/first-phase.component";
import SecondPhase from "../../components/second-phase/second-phase.component";
import Alert from "../../components/alert/alert.component";

const renderPhase = (phase, time) => {
  switch (phase) {
    case "first":
      return <FirstPhase />;
    case "second":
      return <SecondPhase />;
    default:
      return <VoteForm />;
  }
};

const Home = () => {
  const [isShow, setIsShow] = useState(false);
  const email = useSelector(state => state.user.email);
  const phase = useSelector(state => state.ui.phase);
  const info = useSelector(state => state.ui.info);
  const loading = useSelector(state => state.ui.loading);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(signout());
  };

  const handleClose = () => {
    setIsShow(false);
    dispatch(removeAlert());
  };

  useEffect(() => {
    if (info.length !== 0) {
      setIsShow(true);
    }
  }, [info]);

  return (
    <Container fluid>
      <Row>
        <Col></Col>
        <Col xs="auto">{email}</Col> |
        <Col xs="auto">
          <div className="link" onClick={handleLogout}>
            Выйти
          </div>
        </Col>
      </Row>
      {!loading && <Row className="phase">{renderPhase(phase)}</Row>}
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

export default Home;
