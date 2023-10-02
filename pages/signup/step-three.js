import React, { useEffect, useState, useContext } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

import { FormDetailsContext } from "@/context/formDetails";
import Header from "@/components/common/header";
import Navigation from "@/components/common/navigation";
import CheckField from "@/components/common/checkField";
import isEmpty from "@/utils/isEmpty";

import styles from "../../styles/Signup.module.css";

const StepThree = () => {
  const { t } = useTranslation("");
  const router = useRouter();
  const { formData, setFormData, regStep, setRegStep } =
    useContext(FormDetailsContext);

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [receivePromoEmails, setReceivePromoEmails] = useState(false);

  useEffect(() => {
    if (
      isEmpty(formData.firstName) ||
      isEmpty(formData.lastName) ||
      isEmpty(formData.email) ||
      isEmpty(formData.phoneNumber)
    ) {
      router.push("/");
    }

    const handleWindowClose = (e) => {
      e.preventDefault();
      return (e.returnValue = "Prevent");
    };

    window.addEventListener("beforeunload", handleWindowClose);

    return () => {
      window.removeEventListener("beforeunload", handleWindowClose);
    };
  }, []);

  const handleButtonClick = () => {
    setFormData({
      ...formData,
      agreeTerms,
      receivePromoEmails,
    });

    router.push("/signup/summary");
  };

  const handleClickBack = () => {
    setRegStep((prevState) => prevState - 1);
    router.push("/signup/step-two");
  };

  return (
    <div className={styles.content}>
      <Header
        step={t("stepLabel").replace("%s", regStep)}
        text={t("agreementAndPrefTitle")}
      />
      <div className={styles.form__wrapper}>
        <div className={styles.terms}>
          <p>{t("termsText")}</p>
        </div>
        <div className={styles.input__wrapper}>
          <div className={styles.check__wrapper}>
            <label htmlFor="agreeTerms">{t("AgreeTermsLabel")}</label>
            <CheckField
              id="agreeTerms"
              checked={agreeTerms}
              onChange={(e) => {
                setAgreeTerms(e?.currentTarget?.checked);
              }}
            />
          </div>
        </div>
        <div className={styles.input__wrapper}>
          <div className={styles.check__wrapper}>
            <label htmlFor="receivePromoEmails">
              {t("receiveEmailPromosLabel")}
            </label>
            <CheckField
              id="receivePromoEmails"
              checked={receivePromoEmails}
              onChange={(e) => {
                setReceivePromoEmails(e?.currentTarget?.checked);
              }}
            />
          </div>
        </div>
        <Navigation
          isNextDisabled={!agreeTerms}
          showBackButton={true}
          handleBackClick={() => handleClickBack()}
          handleNextClick={() => handleButtonClick()}
        />
      </div>
    </div>
  );
};

export default StepThree;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
