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
}

const Form = ({ currentPage, handleChangePage }: IForm) => {
  const [showPassword, setShowPassword] = useState(false);
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let inputEl = document.getElementById("password") as HTMLInputElement;
    if (showPassword) {
      inputEl.type = "text";
    } else {
      inputEl.type = "password";
    }
  }, [showPassword]);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (currentPage === "login") {
      const userInfo = {
        email: emailRef?.current?.value,
        password: passwordRef?.current?.value,
      };

      try {
        signIn("credentials", userInfo);
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
      {currentPage === "register" && (
        <>
          <label htmlFor="username">Username</label>
          <div className={styles.input_container}>
            <ProfileIcon style={{ marginLeft: "5px" }} />
            <input id="username" type="text" ref={usernameRef} />
          </div>
        </>
      )}

      <label htmlFor="email">Email</label>
      <div className={styles.input_container}>
        <EmailIcon style={{ marginLeft: "5px" }} />
        <input id="email" type="email" ref={emailRef} />
      </div>

      <label htmlFor="password">Password</label>
      <div className={styles.input_container}>
        <PasswordIcon style={{ marginLeft: "5px" }} />
        <input id="password" type="password" ref={passwordRef} />
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
