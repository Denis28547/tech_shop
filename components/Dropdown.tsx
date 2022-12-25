import styles from "../styles/CustomDropdown.module.scss";

interface IDropdown {
  labelText: string;
  dropDownOptions: string[];
  chosenOption: string;
  setOption: (optionName: string) => void;
}

export const Dropdown = ({
  labelText,
  dropDownOptions,
  chosenOption,
  setOption,
}: IDropdown) => {
  return (
    <div className={styles.dropdown_container}>
      <label htmlFor="dropdown_checkbox" className={styles.dropdown_main_text}>
        {chosenOption ? chosenOption : labelText}
      </label>
      <input type="checkbox" id="dropdown_checkbox" />

      <div className={styles.options_container}>
        {dropDownOptions.map((option, index) => (
          <div key={index} onClick={() => setOption(option)}>
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};
