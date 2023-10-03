import React from "react";
import PropTypes from "prop-types";

import styles from "./SelectField.module.css";

const propTypes = {
  name: PropTypes.string,
  options: PropTypes.array,
  defaultVal: PropTypes.string,
  onSelect: PropTypes.func,
};

const defaultProps = {
  name: "",
  options: [],
  defaultVal: "",
  onSelect: () => {},
};

const SelectField = ({ name, options, defaultVal, onSelect }) => {
  return (
    <>
      <select
        name={name}
        onChange={onSelect}
        value={defaultVal}
        className={styles.select__options}
      >
        <option key="none" value="">
          {" "}
        </option>
        {options?.map((state) => (
          <option key={state.value} value={state.value}>
            {state.text}
          </option>
        ))}
      </select>
    </>
  );
};

export default SelectField;

SelectField.propTypes = propTypes;
SelectField.defaultProps = defaultProps;
