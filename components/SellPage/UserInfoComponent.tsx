import { useEffect, useState } from "react";

import styles from "../../styles/sellPage/SellPageBlock.module.scss";

interface IUserInfoComponent {
  locationInitial?: string;
  numberInitial?: string | null;
}

const UserInfoComponent = ({
  locationInitial,
  numberInitial,
}: IUserInfoComponent) => {
  const [locationState, setLocationState] = useState(locationInitial || "");
  const [isLocationDirty, setIsLocationDirty] = useState(false);
  const [isLocationValid, setIsLocationValid] = useState(true);

  const [numberState, setNumberState] = useState(numberInitial || "");
  const [isNumberDirty, setIsNumberDirty] = useState(false);
  const [isNumberValid, setIsNumberValid] = useState(true);

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocationState(e.target.value);
    if (e.target.checkValidity()) setIsLocationValid(true);
    else setIsLocationValid(false);
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumberState(e.target.value);
    if (e.target.checkValidity()) setIsNumberValid(true);
    else setIsNumberValid(false);
  };

  useEffect(() => {
    if (!locationInitial) setLocationState("");
    if (!numberInitial) setNumberState("");
  }, [locationInitial, numberInitial]);

  return (
    <div className={styles.option_block}>
      <h2>Your info</h2>
      <label htmlFor="location">Location</label>
      <input
        type="text"
        id="location"
        value={locationState}
        autoComplete="off"
        placeholder="Your location"
        data-dirty={isLocationDirty}
        onBlur={() => setIsLocationDirty(true)}
        onChange={handleLocationChange}
        pattern="^[^\s]+(\s+[^\s]+)*$"
        minLength={3}
        maxLength={30}
        required
      />
      {!isLocationValid && isLocationDirty && (
        <span>
          *Not valid (field should not be empty, no white spaces at the start
          and at the end, min length is 3, max is 30)
        </span>
      )}

      <label htmlFor="number">Number</label>
      <input
        type="tel"
        id="number"
        value={numberState}
        autoComplete="off"
        placeholder="Contact number"
        data-dirty={isNumberDirty}
        onBlur={() => setIsNumberDirty(true)}
        onChange={handleNumberChange}
        pattern="^[0-9]*$"
        minLength={4}
        maxLength={12}
        // required
      />
      {!isNumberValid && isNumberDirty && (
        <span>*Not valid number (min length is 4, max is 12)</span>
      )}
    </div>
  );
};

export default UserInfoComponent;
