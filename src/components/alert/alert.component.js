import React from "react";
import { Alert } from "react-bootstrap";

import "./alert.scss";

const CustomAlert = ({ type, message, handleClose }) => {
  return (
    <Alert variant={type} onClose={handleClose} dismissible className="alert">
      {message}
    </Alert>
  );
};

export default CustomAlert;
