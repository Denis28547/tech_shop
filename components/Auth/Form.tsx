import { signIn } from "next-auth/react";
import { useState, useEffect, useRef } from "react";

import ProfileIcon from "../../public/assets/authIcons/ProfileIcon";
import EmailIcon from "../../public/assets/authIcons/EmailIcon";
import PasswordIcon from "../../public/assets/authIcons/PasswordIcon";
import OpenEyeIcon from "../../public/assets/authIcons/OpenEyeIcon";
import CloseEyeIcon from "../../public/assets/authIcons/CloseEyeIcon";

import styles from "../../styles/auth/Form.module.scss";
import axios from "axios";

interface IForm {
  currentPage: string;
  handleChangePage: () => void;
  modalActive: boolean;
  modalHandler: () => void;
}

const Form = ({
  currentPage,
  handleChangePage,
  modalActive,
  modalHandler,
}: IForm) => {
  const [responseError, setResponseError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const clearFields = () => {
    if (usernameRef.current) usernameRef.current.value = "";
    if (emailRef.current) emailRef.current.value = "";
    if (passwordRef.current) passwordRef.current.value = "";
  };

  useEffect(() => {
    if (passwordRef.current) {
      if (showPassword) {
        passwordRef.current.type = "text";
      } else {
        passwordRef.current.type = "password";
      }
    }
  }, [showPassword]);

  useEffect(() => {
    clearFields();
    setShowPassword(false);
  }, [modalActive]);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (currentPage === "login") {
      try {
        const res = await signIn("credentials", {
          email: emailRef?.current?.value,
          password: passwordRef?.current?.value,
          redirect: false,
        });

        if (res?.status === 200) {
          modalHandler();
        }

        if (res?.error) {
          setResponseError(res.error);
        }
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const userInfo = {
          name: usernameRef?.current?.value,
          email: emailRef?.current?.value,
          password: passwordRef?.current?.value,
        };

        const response = await axios.post(
          "http://localhost:3000/api/signup",
          userInfo
        );

        handleChangePage();
        alert(response.data.message);
      } catch (error: any) {
        alert(error?.response?.data?.message);
      }
    }
  };

  return (
    <form className={styles.login_container} onSubmit={handleSubmit}>
      {responseError && (
        <span className={styles.res_error}>{responseError}</span>
      )}
      {currentPage === "register" && (
        <>
          <label htmlFor="username">Username</label>
          <div className={styles.input_container}>
            <ProfileIcon style={{ marginLeft: "5px" }} />
            <input id="username" type="text" ref={usernameRef} required />
          </div>
        </>
      )}

      <label htmlFor="email">Email</label>
      <div className={styles.input_container}>
        <EmailIcon style={{ marginLeft: "5px" }} />
        <input
          id="email"
          type="email"
          ref={emailRef}
          pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
          required
        />
      </div>

      <label htmlFor="password">Password</label>
      <div className={styles.input_container}>
        <PasswordIcon style={{ marginLeft: "5px" }} />
        <input id="password" type="password" ref={passwordRef} required />
        {!showPassword ? (
          <CloseEyeIcon
            style={{ marginRight: "15px" }}
            onClick={() => setShowPassword(!showPassword)}
          />
        ) : (
          <OpenEyeIcon
            style={{ marginRight: "15px" }}
            onClick={() => setShowPassword(!showPassword)}
          />
        )}
      </div>

      <button>Sign {currentPage === "register" ? "up" : "in"}</button>
    </form>
  );
};

export default Form;
