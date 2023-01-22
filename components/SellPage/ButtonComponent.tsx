import CustomButton from "../../components/CustomButton";

import styles from "../../styles/sellPage/SellPageBlock.module.scss";

interface IButtonComponent {
  responseErrMessage: string;
  loadingResponse: boolean;
  buttonText: string;
}

const ButtonComponent = ({
  responseErrMessage,
  loadingResponse,
  buttonText,
}: IButtonComponent) => {
  return (
    <div className={styles.option_block}>
      {responseErrMessage && (
        <span className={styles.response_error}>{responseErrMessage}</span>
      )}

      <CustomButton
        text={buttonText}
        loading={loadingResponse}
        height={61}
        width={"25%"}
        margin={"0 auto"}
        buttonType="blue"
        fontSize="1.3rem"
        fontWeight={500}
      />
    </div>
  );
};

export default ButtonComponent;
