import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "next-i18next";

import styles from "./Navigation.module.css";

const propTypes = {
  showBackButton: PropTypes.bool,
  handleNextClick: PropTypes.func,
  handleBackClick: PropTypes.func,
  isNextDisabled: PropTypes.bool,
};

const defaultProps = {
  showBackButton: true,
  handleNextClick: () => {},
  handleBackClick: () => {},
  isNextDisabled: true,
};

const Navigation = ({
  showBackButton,
  handleNextClick,
  handleBackClick,
  isNextDisabled,
}) => {
  const { t } = useTranslation("");

  return (
    <div className={styles.main}>
      {showBackButton && (
        <button
          className={styles.buttonReversed}
          onClick={() => handleBackClick()}
        >
          {t("backButton")}
        </button>
      )}
      <button
        className={styles.button}
        onClick={() => handleNextClick()}
        disabled={isNextDisabled}
      >
        {t("nextButton")}
      </button>
    </div>
  );
};

export default Navigation;

Navigation.propTypes = propTypes;
Navigation.defaultProps = defaultProps;
