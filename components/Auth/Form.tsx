import { signIn } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

import CustomButton from "../CustomButton";
import InputForm from "./InputForm";

import ProfileIcon from "../../public/assets/authIcons/ProfileIcon";
import EmailIcon from "../../public/assets/authIcons/EmailIcon";
import PasswordIcon from "../../public/assets/authIcons/PasswordIcon";

import styles from "../../styles/auth/Form.module.scss";

interface IForm {
  currentPage: string;
  handleChangePage: () => void;
  modalActive: boolean;
  modalHandler: () => void;
}

const defaultRes = {
  success: false,
  message: "",
};

const Form = ({
  currentPage,
  handleChangePage,
  modalActive,
  modalHandler,
}: IForm) => {
  const [response, setResponse] = useState(defaultRes);
  const [disableButton, setDisableButton] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setDisableButton(true);

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
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.status === 200) {
        modalHandler();
      }

      if (res?.error) {
        setResponse({ success: false, message: res.error });
        setDisableButton(false);
      }
    } else {
      try {
        const userInfo = {
          name: username,
          email,
          password,
        };

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/signup`,
          userInfo
        );

        setDisableButton(false);
        setResponse({
          success: true,
          message: `${response.data.message}, check your email (${email}) to verify account`,
        });
        handleChangePage();
      } catch (error: any) {
        setDisableButton(false);
        setResponse({
          success: false,
          message: error?.response?.data?.message,
        });
      }
    }
  };

  useEffect(() => {
    if (!modalActive) {
      setResponse(defaultRes);
    }
  }, [modalActive]);

  useEffect(() => {
    if (!response.success) {
      setResponse(defaultRes);
    }
  }, [currentPage]);

  return (
    <form className={styles.login_container} onSubmit={handleSubmit}>
      {response.message && (
        <span
          className={`${styles.res_error} ${
            response.success ? styles.res_success : ""
          }`}
        >
          {response.message}
        </span>
      )}

      {currentPage === "register" && (
        <>
          <InputForm
            type="text"
            label="Username"
            id="username"
            pattern="^[A-Za-z0-9]{3,16}$"
            minLength={6}
            maxLength={60}
            modalActive={modalActive}
            errorMessage="*Invalid username (no white spaces, no special characters, min length is 6, max length is 60)"
            icon={<ProfileIcon style={{ marginLeft: "5px" }} />}
          />
        </>
      )}

      <InputForm
        type="email"
        label="Email"
        id="email"
        pattern={undefined}
        minLength={6}
        maxLength={32}
        modalActive={modalActive}
        errorMessage="*Invalid email (min length is 6, max length is 32)"
        icon={<EmailIcon style={{ marginLeft: "5px" }} />}
      />

      <InputForm
        type="password"
        label="Password"
        id="password"
        pattern="^[-a-zA-Z0-9!@#$%^&*()\.+_]+$"
        minLength={6}
        maxLength={60}
        modalActive={modalActive}
        errorMessage="*Invalid password (no white spaces, min length is 6, max length is 60)"
        icon={<PasswordIcon style={{ marginLeft: "5px" }} />}
      />

      <CustomButton
        text={`Sign ${currentPage === "register" ? "up" : "in"}`}
        loading={disableButton}
        height={50}
        width={"100%"}
        margin={"10px 0 0 0"}
        buttonType="blue"
        fontSize="1.1rem"
        fontWeight={600}
      />
    </form>
  );
};

export default Form;
