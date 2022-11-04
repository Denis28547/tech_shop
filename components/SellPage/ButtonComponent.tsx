import styles from "../../styles/sellPage/SellPageBlock.module.scss";

interface IButtonComponent {
  responseErrMessage: string;
  loadingResponse: boolean;
}

const ButtonComponent = ({
  responseErrMessage,
  loadingResponse,
}: IButtonComponent) => {
  return (
    <div className={styles.option_block}>
      <span className={styles.response_error}>{responseErrMessage}</span>
      <button type="submit" disabled={loadingResponse}>
        Post
      </button>
    </div>
  );
};

export default ButtonComponent;
