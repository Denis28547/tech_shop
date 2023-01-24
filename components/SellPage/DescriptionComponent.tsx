import { useEffect, useState } from "react";

import styles from "../../styles/sellPage/SellPageBlock.module.scss";

interface IDescriptionComponent {
  descriptionInitial?: string;
}

const DescriptionComponent = ({
  descriptionInitial,
}: IDescriptionComponent) => {
  const [descriptionState, setDescriptionState] = useState(
    descriptionInitial || ""
  );
  const [isDescriptionDirty, setIsDescriptionDirty] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [stringCount, setStringCount] = useState(descriptionState.length || 0);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setStringCount(e.target.value.length);
    setDescriptionState(e.target.value);
    if (e.target.checkValidity()) setIsValid(true);
    else setIsValid(false);
  };

  useEffect(() => {
    if (!descriptionInitial) setDescriptionState("");
  }, [descriptionInitial]);

  return (
    <div className={styles.option_block}>
      <h2>Description</h2>
      <textarea
        placeholder="Write some description of item you want to sell"
        id="description"
        value={descriptionState}
        minLength={30}
        maxLength={2400}
        data-dirty={isDescriptionDirty}
        onBlur={() => setIsDescriptionDirty(true)}
        onChange={handleChange}
        required
      />
      {!isValid && isDescriptionDirty && (
        <span>*Not valid (min length is 30, max is 2400)</span>
      )}
      <span className={styles.string_count}>{stringCount} / 2400</span>
    </div>
  );
};

export default DescriptionComponent;
