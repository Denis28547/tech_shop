import { useState, useEffect } from "react";

import OpenEyeIcon from "../../public/assets/authIcons/OpenEyeIcon";
import CloseEyeIcon from "../../public/assets/authIcons/CloseEyeIcon";

import styles from "../../styles/auth/InputForm.module.scss";

interface IInputForm {
  type: string;
  label: string;
  id: string;
  pattern: string | undefined;
  minLength: number;
  maxLength: number;
  modalActive: boolean;
  errorMessage: string;
  icon: React.ReactNode;
}

const InputForm = ({
  type,
  label,
  id,
  pattern,
  minLength,
  maxLength,
  modalActive,
  errorMessage,
  icon,
}: IInputForm) => {
  const [inputValue, setInputValue] = useState("");
  const [isDirty, setIsDirty] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  if (id === "password" && showPassword) type = "text";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checkValidity()) setIsValid(true);
    else setIsValid(false);
    setInputValue(e.target.value);
  };

  const returnInvalidStyle = () => {
    if (isDirty && !isValid) return styles.invalid;
    return null;
  };

  function renderElement() {
    if (id === "password")
      if (showPassword) {
        return (
          <CloseEyeIcon
            onClick={() => setShowPassword(!showPassword)}
            style={{ marginRight: "15px" }}
          />
        );
      } else {
        return (
          <OpenEyeIcon
            onClick={() => setShowPassword(!showPassword)}
            style={{ marginRight: "15px" }}
          />
        );
      }
    return null;
  }

  useEffect(() => {
    if (!modalActive) {
      setInputValue("");
      setIsDirty(false);
      setIsValid(true);
      setShowPassword(false);
    }
  }, [modalActive]);

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <div className={`${styles.input_container} ${returnInvalidStyle()}`}>
        {icon}
        <input
          type={type}
          id={id}
          value={inputValue}
          onChange={handleChange}
          onBlur={() => setIsDirty(true)}
          pattern={pattern}
          minLength={minLength}
          maxLength={maxLength}
          required
        />
        {renderElement()}
      </div>

      {isDirty && !isValid ? (
        <span className={styles.input_error}>{errorMessage}</span>
      ) : null}
    </>
  );
};

export default InputForm;
