import { useRouter } from "next/router";
import styles from "../styles/Modal.module.scss";

interface IModal {
  active: boolean;
  setActive: () => void;
  children: React.ReactNode;
}

const Modal = ({ active, setActive, children }: IModal) => {
  // const router = useRouter();
  // console.log(router);
  return (
    <div
      className={`${styles.modal} ${active ? styles.active : ""}`}
      onClick={setActive}
    >
      <div
        className={`${styles.modal_content} ${active ? styles.active : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <span className={styles.close_modal} onClick={setActive} />
        {children}
      </div>
    </div>
  );
};

export default Modal;
