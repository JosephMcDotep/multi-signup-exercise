import React from "react";
import PropTypes from "prop-types";

import styles from "./Header.module.css";

const propTypes = {
  step: PropTypes.string,
  text: PropTypes.string,
  subText: PropTypes.string,
};

const defaultProps = {
  step: "",
  type: "",
  subText: "",
};

const Header = ({ text, subText, step }) => {
  return (
    <div>
      <span className={styles.step__label}>{step}</span>
      <h3>{text}</h3>
      {subText && <p className={styles.subtext}>{subText}</p>}
    </div>
  );
};

export default Header;

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;
