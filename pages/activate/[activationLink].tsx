import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import styles from "../../styles/smallPages/redirect.module.scss";

const defaultResponseMessage = {
  message: "",
  success: false,
};

const Activate: NextPage = () => {
  const [responseMessage, setResponseMessage] = useState(
    defaultResponseMessage
  );

  const router = useRouter();

  const errorMap = new Map([
    ["invalid link", "Invalid link, please contact us or make a new account"],
    ["account is already activated", "Your account was already activated"],
    [
      "something unexpected happened",
      "Something unexpected happened, please contact us",
    ],
  ]);

  const findError = (errMsg: string) => {
    return errorMap.get(errMsg);
  };

  const activateAccount = async () => {
    const { activationLink } = router.query;
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/activate/${activationLink}`
      );
      setResponseMessage({ message: response.data.message, success: true });
    } catch (error: any) {
      const message = findError(error.response.data.message) as string;
      setResponseMessage({ message, success: false });
    }
  };

  useEffect(() => {
    if (!router.isReady || !router.query) return;
    activateAccount();
  }, [router.isReady]);

  useEffect(() => {
    if (responseMessage.message) {
      router.push(
        `/redirect?text=${responseMessage.message}&success=${responseMessage.success}`
      );
    }
  }, [responseMessage]);

  return (
    <div className={styles.main}>
      <div className={styles.info}>
        <h3>Activating your account</h3>
        <h3>LOADING</h3>
        <h2>.....</h2>
      </div>
    </div>
  );
};

export default Activate;
