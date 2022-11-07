import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import styles from "../../styles/smallPages/redirect.module.scss";

import TickIcon from "../../public/assets/redirect/TickIcon";
import CrossIcon from "../../public/assets/redirect/CrossIcon";

const Redirect = () => {
  const [mainText, setMainText] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [redirectSeconds, setRedirectSeconds] = useState(5);

  const router = useRouter();

  useEffect(() => {
    const { text, success } = router.query as any;
    setMainText(text);
    if (success === "true") setIsSuccess(true);
    else setIsSuccess(false);
  }, [router.isReady]);

  useEffect(() => {
    if (redirectSeconds == 0) {
      router.push("/");
      return;
    }

    if (mainText) {
      setTimeout(() => {
        setRedirectSeconds(redirectSeconds - 1);
      }, 1000);
    }
  }, [mainText, redirectSeconds]);

  if (!mainText)
    return (
      <div className={styles.main}>
        <div className={styles.info}>
          <h3>LOADING</h3>
        </div>
      </div>
    );

  return (
    <div className={styles.main}>
      <div className={styles.info}>
        <h3>{mainText}</h3>
        <p>
          You will be automatically redirected to main page in {redirectSeconds}{" "}
          seconds
        </p>
        {isSuccess ? <TickIcon /> : <CrossIcon />}
        <Link href="/">
          <div className={styles.link_text}>To main page</div>
        </Link>
      </div>
    </div>
  );
};

export default Redirect;
