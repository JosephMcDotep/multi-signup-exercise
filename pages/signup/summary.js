import React, { useEffect, useContext } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import Image from "next/image";

import { FormDetailsContext } from "@/context/formDetails";
import Header from "@/components/common/header";
import isEmpty from "@/utils/isEmpty";

import styles from "../../styles/Signup.module.css";
import { Media } from "../../constants/media";

const Summary = () => {
  const { t } = useTranslation("");
  const router = useRouter();
  const { formData, setFormData, setRegStep } = useContext(FormDetailsContext);

  useEffect(() => {
    if (isEmpty(formData)) {
      router.push("/");
    }
  }, []);

  const handleStartOver = () => {
    router.push("/");
    setFormData({});
    setRegStep(1);
  };

  return (
    <div className={styles.content}>
      <span className={styles.summary__success}>
        <Image src={Media.IconCheckGreen} width={22} height={22} />
        {t("stepsCompletedText")}
      </span>
      <Header text={t("registrationSuccessTitle")} />
      <div className={styles.summary__wrapper}>
        <div className={styles.summary__details}>
          <div>
            {t("firstNameLabel")}
            <span className={styles.summary__values}>{formData.firstName}</span>
          </div>
        </div>
        <div className={styles.summary__details}>
          <div>
            {t("lastNameLabel")}
            <span className={styles.summary__values}>{formData.lastName}</span>
          </div>
        </div>
        <div className={styles.summary__details}>
          <div>
            {t("emailLabel")}
            <span className={styles.summary__values}>{formData.email}</span>
          </div>
        </div>
        <div className={styles.summary__details}>
          <div>
            {t("phoneNumberLabel")}
            <span className={styles.summary__values}>
              {formData.phoneNumber}
            </span>
          </div>
        </div>
        <div className={styles.summary__details}>
          <div>
            {t("AgreeTermsLabel")}
            <span className={styles.summary__values}>
              {formData.agreeTerms && t("agreedText")}
            </span>
          </div>
        </div>
        <div className={styles.summary__details}>
          <div>
            {t("receiveEmailPromosLabel")}
            <span className={styles.summary__values}>
              {formData.receivePromoEmails ? t("yesText") : t("noText")}
            </span>
          </div>
        </div>
        <div className={styles.wrapper}>
          <button
            className={styles.button__done}
            onClick={() => handleStartOver()}
          >
            {t("doneButton")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Summary;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
