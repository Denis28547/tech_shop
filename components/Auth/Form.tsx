import { signIn } from "next-auth/react";
import { useState, useEffect, useRef } from "react";

import ProfileIcon from "../../public/assets/authIcons/ProfileIcon";
import EmailIcon from "../../public/assets/authIcons/EmailIcon";
import PasswordIcon from "../../public/assets/authIcons/PasswordIcon";
// import OpenEyeIcon from "../../public/assets/authIcons/OpenEyeIcon";
// import CloseEyeIcon from "../../public/assets/authIcons/CloseEyeIcon";

import styles from "../../styles/auth/Form.module.scss";
import axios from "axios";
import InputForm from "./InputForm";

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
  const formRef = useRef(null);
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
    setResponseError("");
  }, [modalActive]);

  interface inputEls {
    target: Array<HTMLInputElement>;
  }

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      username: { value: string };
      email: { value: string };
      password: { value: string };
    };

    let username;
    if (target.username) username = target.username.value;
    const email = target.email.value;
    const password = target.password.value;

    if (currentPage === "login") {
      try {
        const res = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (res?.status === 200) {
          modalHandler();
        }

        if (res?.error) {
          setResponseError(res.error);
        }
      } catch (error) {
        // console.log(error);
      }
    } else {
      try {
        const userInfo = {
          name: username,
          email,
          password,
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
    <form
      className={styles.login_container}
      onSubmit={handleSubmit}
      ref={formRef}
    >
      {responseError && (
        <span className={styles.res_error}>{responseError}</span>
      )}

      {currentPage === "register" && (
        <>
          <InputForm
            type="text"
            label="Username"
            id="username"
            pattern="^[A-Za-z]{3,16}$"
            modalActive={modalActive}
            errorMessage=" No white spaces, max length is 15No white spaces, max length is 15"
            maxLength={15}
            icon={<ProfileIcon style={{ marginLeft: "5px" }} />}
          />
          {/* <label htmlFor="username">Username</label>
          <span>No white spaces, max length is 15</span>
          <div className={styles.input_container}>
            <ProfileIcon style={{ marginLeft: "5px" }} />
            <input
              id="username"
              type="text"
              ref={usernameRef}
              pattern="/^\S+$/"
              maxLength={15}
              onBlur={handleChangeDirty}
              required
            />
          </div> */}
        </>
      )}

      {/* <label htmlFor="email">Email</label>
      <div className={styles.input_container}>
        <EmailIcon style={{ marginLeft: "5px" }} />
        <input
          id="email"
          type="email"
          ref={emailRef}
          pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
          required
        />
      </div> */}
      <InputForm
        type="email"
        label="Email"
        id="email"
        pattern="/^[^\s@]+@[^\s@]+\.[^\s@]+$/"
        modalActive={modalActive}
        errorMessage="something is wrong"
        maxLength={15}
        icon={<EmailIcon style={{ marginLeft: "5px" }} />}
      />

      {/* <div className={styles.input_container}> */}
      <InputForm
        type="password"
        label="Password"
        id="password"
        pattern="^[A-Za-z]{3,16}$"
        modalActive={modalActive}
        errorMessage="something is wrong"
        maxLength={15}
        icon={<PasswordIcon style={{ marginLeft: "5px" }} />}
      />
      {/* </div> */}
      {/* <label htmlFor="password">Password</label>
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
      </div> */}

      <button>Sign {currentPage === "register" ? "up" : "in"}</button>
    </form>
  );
};

export default Form;
