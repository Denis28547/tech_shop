import { useState } from "react";

import styles from "../../styles/sellPage/SellPageBlock.module.scss";

const LocationComponent = () => {
  const [isLocationDirty, setIsLocationDirty] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checkValidity()) setIsValid(true);
    else setIsValid(false);
  };

  return (
    <div className={styles.option_block}>
      <h2>Location</h2>
      <input
        type="text"
        id="location"
        autoComplete="off"
        placeholder="Name of the city"
        data-dirty={isLocationDirty}
        onBlur={() => setIsLocationDirty(true)}
        onChange={handleChange}
        pattern="^[^\s]+(\s+[^\s]+)*$"
        minLength={3}
        maxLength={50}
        required
      />
      {!isValid && isLocationDirty && (
        <span>
          *Not valid (field should not be empty, no white spaces at the start
          and at the end, min length is 3, max is 30)
        </span>
      )}
    </div>
  );
};

export default LocationComponent;
