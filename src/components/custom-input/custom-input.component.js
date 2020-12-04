import React from "react";

// bootstrap
import { Form } from "react-bootstrap";

const CustomInput = ({
  input,
  label,
  type,
  placeholder,
  meta: { touched, error, warning },
  onKeyDown
}) => {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        {...input}
        type={type}
        placeholder={placeholder}
        onKeyDown={onKeyDown || null}
      />
      {touched && error && <Form.Text className="error">{error}</Form.Text>}
    </Form.Group>
  );
};

export default CustomInput;
