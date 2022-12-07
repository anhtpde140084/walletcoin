import { useState } from "react";
import { validateEmail } from "./../../utils/rules/commonValidate";
export default function useRegister() {
  const [error, setError] = useState("gaga");

  const validateForm = (data) => {
    if (data.email === "" || data.password === "") {
      setError("Please enter your email and password");
      return false;
    } else if (!validateEmail(data.email)) {
      setError("Email is invalid!");
      return false;
    }
    setError("");
    return true;
  };

  const doSubmit = async (data) => {

    if (validateForm(data)) {
        
    }
  };

  return {
    doSubmit,
    error,
  };
}
