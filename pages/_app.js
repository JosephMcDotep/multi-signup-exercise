import { appWithTranslation } from "next-i18next";
import Main from "@/components/layout/Main";
import {
  FormDetailsContext,
  useFormDetailsContext,
} from "@/context/formDetails";

import "@/styles/globals.css";

const App = ({ Component, pageProps }) => {
  return (
    <FormDetailsContext.Provider value={useFormDetailsContext()}>
      <Main>
        <Component {...pageProps} />
      </Main>
    </FormDetailsContext.Provider>
  );
};

export default appWithTranslation(App);
