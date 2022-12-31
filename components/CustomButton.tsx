import Loader from "./Loader";

import styles from "../styles/CustomButton.module.scss";

interface ICustomButton {
  text: string;
  loading: boolean;
  isDisabled?: boolean;
  height: number;
  width: string | number;
  margin?: string | number;
  borderColor?: string;
  fontSize: string;
  fontWeight: number;
  onClick?: (e: any) => void;
  buttonType: "outline" | "blue" | "grey";
  children?: React.ReactNode;
}

const CustomButton = ({
  text,
  loading,
  isDisabled,
  height,
  width,
  margin,
  borderColor,
  fontSize,
  fontWeight,
  onClick,
  buttonType,
  children,
}: ICustomButton) => {
  if (children)
    return (
      <button
        className={styles.custom_button}
        disabled={loading}
        data-button_type={buttonType}
        onClick={onClick}
        style={{
          height,
          width,
          margin,
          borderColor,
          fontSize,
          fontWeight,
        }}
        type="submit"
      >
        {!loading && children}
        {loading ? <Loader height={height} /> : text}
      </button>
    );
  return (
    <button
      className={styles.custom_button}
      disabled={loading || isDisabled}
      data-button_type={buttonType}
      onClick={onClick}
      style={{
        height,
        width,
        margin,
        borderColor,
        fontSize,
        fontWeight,
      }}
      type="submit"
    >
      {loading ? <Loader height={height} /> : text}
    </button>
  );
};
export default CustomButton;
