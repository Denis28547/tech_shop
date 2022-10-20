import { useState, useEffect } from "react";

import OpenEyeIcon from "../../public/assets/authIcons/OpenEyeIcon";
import CloseEyeIcon from "../../public/assets/authIcons/CloseEyeIcon";

import styles from "../../styles/auth/InputForm.module.scss";

interface IInputForm {
  type: string;
  label: string;
  id: string;
  pattern: string;
  modalActive: boolean;
  errorMessage: string;
  maxLength: number;
  icon: React.ReactNode;
  // secondIcon: React.ReactNode | null;
  // thirdIcon: React.ReactNode | null;
}

const InputForm = ({
  type,
  label,
  id,
  pattern,
  modalActive,
  errorMessage,
  maxLength,
  icon,
}: // secondIcon,
// thirdIcon,
IInputForm) => {
  const [inputValue, setInputValue] = useState("");
  const [isDirty, setIsDirty] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  if (id === "password" && showPassword) type = "text";

  const handleShowPassword = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    console.log(e.target.checkValidity());
    if (e.target.checkValidity()) setIsValid(true);
    setInputValue(e.target.value);
  };

  const setDirty = (e: React.SyntheticEvent) => {
    if (e.target.checkValidity()) setIsValid(true);
    else setIsValid(false);
    setIsDirty(true);
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
            onClick={handleShowPassword}
            // onClick={(e) => e.stopPropagation()}
            style={{ marginRight: "15px" }}
          />
        );
      } else {
        return (
          <OpenEyeIcon
            onClick={handleShowPassword}
            // onClick={(e) => e.stopPropagation()}
            style={{ position: "absolute", right: "15px" }}
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
    }
  }, [modalActive]);

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <div className={`${styles.input_container} ${returnInvalidStyle()}`}>
        {icon}
        <input
          // className={styles.input_style}
          type={type}
          id={id}
          value={inputValue}
          onChange={handleChange}
          onBlur={setDirty}
          // pattern="/^([A-z])*[^\s]\1*$/"
          // pattern={pattern}
          minLength={2}
          maxLength={200}
          // focused={isDirty.lname.toString()}
          required
          // focused="true"
        />
      </div>

      {isDirty && !isValid ? (
        <span className={styles.input_error}>{errorMessage}</span>
      ) : null}
    </>
  );
};

export default InputForm;
