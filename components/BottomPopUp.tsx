import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { closePopup } from "../store/reducers/PopupSlice";
import TickIcon from "../public/assets/redirect/TickIcon";
import CrossIcon from "../public/assets/redirect/CrossIcon";

import styles from "../styles/BottomPopUpStyles.module.scss";

const BottomPopUp = () => {
  const { isOpen, text, isSuccess, secondsToShow } = useAppSelector(
    (state) => state.popup
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        dispatch(closePopup());
      }, secondsToShow);
    }
  }, [isOpen]);

  return (
    <div className={`${styles.popup} ${isOpen && styles.open}`}>
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
