import { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";

import Form from "./Form";

import GoogleIcon from "../../public/assets/authIcons/GoogleIcon";
import GithubIcon from "../../public/assets/authIcons/GithubIcon";

import styles from "../../styles/Auth.module.scss";
import { signIn } from "next-auth/react";

interface IAuth {
  modalActive: boolean;
  modalHandler: () => void;
}

const Auth = ({ modalActive, modalHandler }: IAuth) => {
  const [currentPage, setCurrentPage] = useState("login");

  const handleChangePage = () =>
    setCurrentPage(currentPage === "login" ? "register" : "login");

  return (
    <div className={styles.auth_container}>
      <h2 className={styles.page_name}>{currentPage}</h2>
      <hr />

      <Form
        currentPage={currentPage}
        handleChangePage={handleChangePage}
        modalActive={modalActive}
        modalHandler={modalHandler}
      />

      <div className={styles.or_container}>
        <span>or</span>
        <hr />
      </div>

      <div className={styles.icons_container}>
        <div
          onClick={() => signIn("github")}
          className={styles.icon_login_container}
        >
          <GithubIcon className={styles.icon} />
        </div>

        <div
          onClick={() => signIn("google")}
          className={styles.icon_login_container}
        >
          <GoogleIcon className={styles.icon} />
        </div>
      </div>
      <hr />

      <div className={styles.change_page_container}>
        <p onClick={() => handleChangePage()} className={styles.change_page}>
          {currentPage === "login"
            ? "Do not have an account ? Register"
            : "Already have an account ? Login"}
        </p>
      </div>
    </div>
  );
};

export default Auth;
