import { useState } from "react";
import { ArrowIcon } from "../public/assets/ArrowIcon";

import styles from "../styles/CustomDropdown.module.scss";

interface IDropdown {
  labelText: string;
  dropDownOptions: string[];
  selectedOption: string;
  setSelectedOption: (optionName: string) => void;
  min_width: string;
}

export const Dropdown = ({
  labelText,
  dropDownOptions,
  selectedOption,
  setSelectedOption,
  min_width,
}: IDropdown) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={styles.dropdown_container} style={{ minWidth: min_width }}>
      <div
        className={styles.dropdown_button}
        onClick={() => setIsActive(!isActive)}
      >
        <p>{selectedOption ? selectedOption : labelText}</p>
        <ArrowIcon
          className={`${styles.arrow} ${isActive && styles.close_arrow}`}
        />
      </div>

      {isActive && (
        <div className={styles.options_container}>
          {dropDownOptions.map((option, index) => (
            <option
              key={index}
              onClick={() => {
                setSelectedOption(option);
                setIsActive(false);
              }}
              className={styles.option}
            >
              {option}
            </option>
          ))}
        </div>
      )}
    </div>
  );
};
