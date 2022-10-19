import { useState, useEffect } from "react";

import OpenEyeIcon from "../../public/assets/authIcons/OpenEyeIcon";
import CloseEyeIcon from "../../public/assets/authIcons/CloseEyeIcon";

import styles from "../../styles/auth/InputForm.module.scss";

interface IInputForm {
  type: string;
  label: string;
  id: string;
  modalActive: boolean;
  errorMessage: string;
  icon: React.ReactNode;
  // secondIcon: React.ReactNode | null;
  // thirdIcon: React.ReactNode | null;
}

const InputForm = ({
  type,
  label,
  id,
  modalActive,
  errorMessage,
  icon,
}: // secondIcon,
// thirdIcon,
IInputForm) => {
  const [inputValue, setInputValue] = useState("");
  const [isDirty, setIsDirty] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (id === "password" && showPassword) type = "text";

  const handleChangeDirty = () => setIsDirty(true);

  const handleShowPassword = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    setShowPassword(!showPassword);
  };

  function renderElement() {
    if (id === "password")
      if (showPassword) {
        return (
          <CloseEyeIcon
            // onClick={handleShowPassword}
            onClick={(e) => e.stopPropagation()}
            style={{ marginRight: "15px" }}
          />
        );
      } else {
        return (
          <OpenEyeIcon
            // onClick={handleShowPassword}
            onClick={(e) => e.stopPropagation()}
            style={{ position: "absolute", right: "15px" }}
          />
        );
      }
    return null;
  }

  useEffect(() => {
    setInputValue("");
    setIsDirty(false);
  }, [modalActive]);
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <div className={styles.input_container}>
        <span>{icon}</span>
        <input
          // className={styles.input_style}
          onBlur={(e) => console.log(e.target.checkValidity())}
          type={type}
          id={id}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          pattern="/^\S+$/"
          // maxLength={15}
          // focused={isDirty.lname.toString()}
          required
          // focused="true"
        />
      </div>
      {/* <div className={styles.input_container}></div> */}
      {/* <div className={styles.input_container} onBlur={handleChangeDirty}>
        {icon}
        <input
        type={type}
        id={id}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          pattern="/^\S+$/"
          maxLength={15}
          // focused={isDirty.lname.toString()}
          required
        />

        {renderElement()}
      </div> */}
      {isDirty && <span className={styles.input_error}>{errorMessage}</span>}
    </>
  );
};

export default InputForm;
