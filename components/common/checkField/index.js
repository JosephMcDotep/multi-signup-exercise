import React from "react";
import PropTypes from "prop-types";

const propTypes = {
  id: PropTypes.string,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
};

const defaultProps = {
  id: "",
  onChange: () => {},
  checked: false,
};

export default function CheckField({ id, onChange, checked }) {
  return (
    <>
      <input type="checkbox" id={id} onChange={onChange} checked={checked} />
    </>
  );
}

CheckField.propTypes = propTypes;
CheckField.defaultProps = defaultProps;
