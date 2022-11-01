import styles from "../../styles/sellPage/SellPageBlock.module.scss";

interface IButtonComponent {
  errMessage: string;
}

const ButtonComponent = ({ errMessage }: IButtonComponent) => {
  return (
    <div className={styles.option_block}>
      <span>{errMessage}</span>
      <button type="submit">Post</button>
    </div>
  );
};

export default ButtonComponent;
