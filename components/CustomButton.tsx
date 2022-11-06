import Loader from "./Loader";

import styles from "../styles/CustomButton.module.scss";

interface ICustomButton {
  text: string;
  loading: boolean;
  height: number;
  width: string | number;
  margin: string | number;
}

const CustomButton = ({
  text,
  loading,
  height,
  width,
  margin,
}: ICustomButton) => {
  return (
    <button
      className={styles.custom_button}
      disabled={loading}
      style={{ height: height, width: width, margin: margin }}
      type="submit"
    >
      {loading ? <Loader height={height} /> : text}
    </button>
  );
};

export default CustomButton;
