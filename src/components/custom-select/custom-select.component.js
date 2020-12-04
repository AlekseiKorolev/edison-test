import React from "react";

// bootstrap
import { Form } from "react-bootstrap";

const CustomSelect = ({
  input,
  children,
  label,
  meta: { touched, error, warning }
}) => {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control {...input} as="select">
        {children}
      </Form.Control>
      {touched && error && <Form.Text className="error">{error}</Form.Text>}
    </Form.Group>
  );
};

export default CustomSelect;
