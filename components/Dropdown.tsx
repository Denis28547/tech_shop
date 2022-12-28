import React, { useState, useRef, useEffect } from "react";
import { ArrowIcon } from "../public/assets/ArrowIcon";

import styles from "../styles/CustomDropdown.module.scss";

interface IDropdown {
  labelText: string;
  dropDownOptions: string[];
  selectedOption: string;
  setSelectedOption: (optionName: string) => void;
  width: string;
}

export const Dropdown = ({
  labelText,
  dropDownOptions,
  selectedOption,
  setSelectedOption,
  width,
}: IDropdown) => {
  const [isActive, setIsActive] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeDropDown = (e: any) => {
      if (selectRef.current && !selectRef.current.contains(e.target))
        setIsActive(false);
    };

    document.body.addEventListener("click", closeDropDown);
    return () => {
      document.body.removeEventListener("click", closeDropDown);
    };
  }, []);

  return (
    <div className={styles.dropdown_container} style={{ width: width }}>
      <div
        className={styles.dropdown_button}
        onClick={() => setIsActive(!isActive)}
        ref={selectRef}
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
