import React from "react";
import Head from "next/head";
import { useTranslation } from "next-i18next";

import { main } from "./Main.module.css";

const Main = ({ children }) => {
  const { t } = useTranslation("");

  return (
    <>
      <Head>
        <title>{t("appTitle")}</title>
        <meta name="description" content={t("appDescription")} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={main}>{children}</div>
    </>
  );
};

export default Main;
