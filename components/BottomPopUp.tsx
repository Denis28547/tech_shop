import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { closePopup, setTimerId } from "../store/reducers/PopupSlice";
import TickIcon from "../public/assets/redirect/TickIcon";
import CrossIcon from "../public/assets/redirect/CrossIcon";

import styles from "../styles/BottomPopUpStyles.module.scss";

const BottomPopUp = () => {
  const { isOpen, opensCount, text, isSuccess, secondsToShow, timerId } =
    useAppSelector((state) => state.popup);

  const dispatch = useAppDispatch();

  function startTimer() {
    const timer = window.setTimeout(() => {
      dispatch(closePopup());
    }, secondsToShow);
    dispatch(setTimerId(timer));
  }

  function resetTimeout() {
    if (timerId) {
      clearTimeout(timerId);
      startTimer();
    }
  }

  useEffect(() => {
    if (isOpen && opensCount >= 2) {
      resetTimeout();
      return;
    }
    if (isOpen && opensCount === 1) {
      startTimer();
    }
  }, [isOpen, opensCount]);

  return (
    <div className={`${styles.popup} ${isOpen ? styles.open : ""}`}>
      {isSuccess ? (
        <TickIcon className={styles.icon} />
      ) : (
        <CrossIcon className={styles.icon} />
      )}
      {text && <p className={styles.text}>{text}</p>}
    </div>
  );
};

export default BottomPopUp;
