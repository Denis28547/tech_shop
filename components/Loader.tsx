import styles from "../styles/Loader.module.scss";

interface ILoader {
  height: number;
}

const Loader = ({ height }: ILoader) => {
  return (
    <div className={styles.loader_wrapper}>
      <div
        className={styles.loader}
        style={{ height: height - 16, width: height - 16 }}
      ></div>
    </div>
  );
};

export default Loader;
