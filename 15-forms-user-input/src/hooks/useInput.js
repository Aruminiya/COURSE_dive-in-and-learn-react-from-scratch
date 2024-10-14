import { useState } from "react";

export function useInput(defaultValue, validationFn) {
  const [enterValue, setEnterValue] = useState(defaultValue);
  const [didEdit, setDidEdit] = useState(false);

  const valueIsValid = validationFn(enterValue)

  function handleInputChange(event) {
    setEnterValue(event.target.value);
    setDidEdit(false);
  };

  function handleInputBlur() {
    setDidEdit(true);
  };

  return {
    value: enterValue,
    handleInputChange,
    handleInputBlur,
    hasError: didEdit && !valueIsValid
  }
}