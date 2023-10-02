import { createContext, useState } from "react";

const FORM_STATES = {
  formData: {},
  regStep: 1,
};

export const FormDetailsContext = createContext(FORM_STATES);

export function useFormDetailsContext() {
  const [formData, setFormData] = useState(FORM_STATES.formData);
  const [regStep, setRegStep] = useState(FORM_STATES.regStep);

  return {
    formData,
    setFormData,
    regStep,
    setRegStep,
  };
}
