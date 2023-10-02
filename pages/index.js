import React, { useState, useEffect, useContext } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

import { FormDetailsContext } from "@/context/formDetails";
import InputField from "@/components/common/inputField";
import Header from "@/components/common/header";
import Navigation from "@/components/common/navigation";
import isEmpty from "@/utils/isEmpty";

import styles from "../styles/Home.module.css";

export default function Home() {
  const { t } = useTranslation("");
  const router = useRouter();
  const { formData, setFormData, regStep, setRegStep } =
    useContext(FormDetailsContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [disableNextBtn, setDisableNextBtn] = useState(true);

  useEffect(() => {
    if (!isEmpty(formData?.firstName)) {
      setFirstName(formData?.firstName);
    }

    if (!isEmpty(formData?.lastName)) {
      setLastName(formData?.lastName);
    }
  }, [formData]);

  useEffect(() => {
    if (isEmpty(firstName) || isEmpty(lastName)) {
      setDisableNextBtn(true);
    } else {
      setDisableNextBtn(false);
    }
  }, [firstName, lastName]);

  const handleButtonClick = () => {
    setFormData({
      ...formData,
      firstName,
      lastName,
    });

    setRegStep((prevState) => prevState + 1);

    router.push("/signup/step-two");
  };

  return (
    <div className={styles.content}>
      <Header
        step={t("stepLabel").replace("%s", regStep)}
        text={t("createAccountTitle")}
        subText={t("stepOneText")}
      />
      <div>
        <div className={styles.input__wrapper}>
          <label htmlFor="firstName">{t("firstNameLabel")}</label>
          <InputField
            id="firstName"
            value={firstName}
            onChange={(e) => {
              setFirstName(e?.currentTarget?.value);
            }}
          />
        </div>
        <div className={styles.input__wrapper}>
          <label htmlFor="lastName">{t("lastNameLabel")}</label>
          <InputField
            id="lastName"
            value={lastName}
            onChange={(e) => {
              setLastName(e?.currentTarget?.value);
            }}
          />
        </div>
        <Navigation
          isNextDisabled={disableNextBtn}
          showBackButton={false}
          handleNextClick={() => handleButtonClick()}
        />
      </div>
    </div>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
