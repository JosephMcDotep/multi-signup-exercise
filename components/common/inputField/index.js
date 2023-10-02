import React from "react";
import PropTypes from "prop-types";

import styles from "./InputField.module.css";

const propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
};

const defaultProps = {
  type: "text",
  id: "",
  onChange: () => {},
  value: "",
};

export default function InputField({ type, id, onChange, value }) {
  return (
    <>
      <input
        className={styles.button__text}
        type={type}
        id={id}
        onChange={onChange}
        value={value}
      />
    </>
  );
}

InputField.propTypes = propTypes;
InputField.defaultProps = defaultProps;
