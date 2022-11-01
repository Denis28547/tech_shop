import { useState } from "react";

import styles from "../../styles/sellPage/SellPageBlock.module.scss";

const DescriptionComponent = () => {
  const [isDescriptionDirty, setIsDescriptionDirty] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [stringCount, setStringCount] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setStringCount(e.target.value.length);
    if (e.target.checkValidity()) setIsValid(true);
    else setIsValid(false);
  };

  return (
    <div className={styles.option_block}>
      <h2>Description</h2>
      <textarea
        placeholder="Write some description about item you want to sell"
        id="description"
        minLength={30}
        maxLength={1600}
        data-dirty={isDescriptionDirty}
        onBlur={() => setIsDescriptionDirty(true)}
        onChange={handleChange}
        required
      />
      {!isValid && isDescriptionDirty && (
        <span>*Not valid (min length is 30, max is 1600)</span>
      )}
      <span className={styles.string_count}>{stringCount} / 1600</span>
    </div>
  );
};

export default DescriptionComponent;
