import { FC, useState } from "react";
import { Dropdown } from "../components/Dropdown";

import styles from "../styles/ErrorPage.module.scss";

const ErrorPage: FC = () => {
  const dropDownOptions = ["option 1", "option 2", "option 3"];
  const [chosenOption, setOption] = useState("");

  return (
    <div>
      ErrorPage
      <Dropdown
        labelText="test text"
        dropDownOptions={dropDownOptions}
        chosenOption={chosenOption}
        setOption={setOption}
      />
      <p className={styles.test}>sssss</p>
      <a className={styles.test}>sssss</a>
    </div>
  );
};

export default ErrorPage;
