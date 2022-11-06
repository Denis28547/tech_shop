import CustomButton from "../../components/CustomButton";

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
      {responseErrMessage && (
        <span className={styles.response_error}>{responseErrMessage}</span>
      )}

      <CustomButton
        text={"Post"}
        loading={loadingResponse}
        height={61}
        width={"25%"}
        margin={"0 auto"}
      />
    </div>
  );
};

export default ButtonComponent;
