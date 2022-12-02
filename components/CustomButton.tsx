import Loader from "./Loader";

import styles from "../styles/CustomButton.module.scss";
import { ButtonHTMLAttributes, FC } from "react";

interface ICustomButton {
  text: string;
  loading: boolean;
  height: number;
  width: string | number;
  margin?: string | number;
  fontSize: string;
  fontWeight: number;
  onClick?: (e: any) => void;
  buttonType: "outline" | "blue" | "grey";
}

const CustomButton = ({
  text,
  loading,
  height,
  width,
  margin,
  fontSize,
  fontWeight,
  onClick,
  buttonType,
}: ICustomButton) => {
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
