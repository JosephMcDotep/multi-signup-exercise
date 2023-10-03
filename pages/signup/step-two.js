import React, { useEffect, useState, useContext } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

import { FormDetailsContext } from "@/context/formDetails";
import Header from "@/components/common/header";
import Navigation from "@/components/common/navigation";
import InputField from "@/components/common/inputField";
import SelectField from "@/components/common/selectField";
import isEmpty from "@/utils/isEmpty";

import styles from "../../styles/Signup.module.css";

const StepTwo = () => {
  const { t } = useTranslation("");
  const router = useRouter();
  const { formData, setFormData, regStep, setRegStep } =
    useContext(FormDetailsContext);

  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [state, setState] = useState("");

  useEffect(() => {
    if (isEmpty(formData.firstName) || isEmpty(formData.lastName)) {
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

  useEffect(() => {
    if (!isEmpty(formData?.email)) {
      setEmail(formData?.email);
    }

    if (!isEmpty(formData?.phoneNumber)) {
      setPhoneNumber(formData?.phoneNumber);
    }

    if (!isEmpty(formData?.state)) {
      setState(formData?.state);
    }
  }, [formData]);

  const handleButtonClick = () => {
    setFormData({
      ...formData,
      email,
      phoneNumber,
      state,
    });

    setRegStep((prevState) => prevState + 1);

    router.push("/signup/step-three");
  };

  const handleClickBack = () => {
    setRegStep((prevState) => prevState - 1);
    router.push("/");
  };

  const handleSelectState = (e) => {
    e.preventDefault();
    setState(e?.currentTarget?.value);
  };

  return (
    <div className={styles.content}>
      <Header
        step={t("stepLabel").replace("%s", regStep)}
        text={t("provideContactTitle")}
        subText={t("stepTwoText")}
      />
      <div>
        <div className={styles.form__wrapper}>
          <div className={styles.input__wrapper}>
            <div className={styles.label__container}>
              <label htmlFor="email">{t("emailLabel")}</label>
            </div>
            <InputField
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e?.currentTarget?.value);
              }}
            />
          </div>
          <div className={styles.input__wrapper}>
            <div className={styles.label__container}>
              <label htmlFor="phoneNumber">{t("phoneNumberLabel")}</label>
            </div>
            <InputField
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e?.currentTarget?.value);
              }}
            />
          </div>
          <div className={styles.input__wrapper}>
            <div className={styles.label__container}>
              <label htmlFor="state">{t("stateLabel")}</label>
            </div>
            <SelectField
              name="state"
              options={t("states", { returnObjects: true })}
              onSelect={handleSelectState}
              defaultVal={state}
            />
          </div>
          <Navigation
            isNextDisabled={isEmpty(email) || isEmpty(phoneNumber)}
            showBackButton={true}
            handleBackClick={() => handleClickBack()}
            handleNextClick={() => handleButtonClick()}
          />
        </div>
      </div>
    </div>
  );
};

export default StepTwo;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
