import { useEffect } from "react";
import styles from "../styles/Modal.module.scss";

interface IModal {
  active: boolean;
  setActive: () => void;
  children: React.ReactNode;
  putChildrenInContainer: boolean;
}

const Modal = ({
  active,
  setActive,
  children,
  putChildrenInContainer,
}: IModal) => {
  useEffect(() => {
    active === true
      ? (document.body.style.overflowY = "hidden")
      : (document.body.style.overflowY = "scroll");
  }, [active]);

  return (
    <div
      className={`${styles.modal} ${active ? styles.active : ""}`}
      onClick={setActive}
    >
      {putChildrenInContainer ? (
        <div
          className={`${styles.modal_content} ${active ? styles.active : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          <span className={styles.close_modal} onClick={setActive} />
          {children}
        </div>
      ) : (
        <>{children}</>
      )}
    </div>
  );
};

export default Modal;
