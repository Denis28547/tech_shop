import { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";

import Login from "./Login";
import Register from "./Register";

import styles from "../../styles/Auth.module.scss";

const Auth = () => {
  const [currentPage, setCurrentPage] = useState("login");
  console.log(currentPage);

  return (
    <>
      {currentPage === "login" ? (
        <div className={styles.auth_container}>
          <h2 className={styles.page_name}>Login</h2>
          <hr />
          <Login />
          <hr />
          <div onClick={() => setCurrentPage("register")}>
            Do not have an account ? Register
          </div>
        </div>
      ) : (
        <div className={styles.auth_container}>
          <h2 className={styles.page_name}>Register</h2>
          <hr />
          <Register />
          <hr />
          <button onClick={() => setCurrentPage("login")}>
            Already have an account ? Login
          </button>
        </div>
      )}
    </>
  );
};

export default Auth;
