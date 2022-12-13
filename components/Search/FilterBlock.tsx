import styles from "../../styles/search/FilterBlock.module.scss";
import CustomButton from "../CustomButton";

interface IFilterBlock {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const FilterBlock = ({ handleSubmit }: IFilterBlock) => {
  const categories = ["phones", "fridges"];
  return (
    <form className={styles.filter_block} onSubmit={handleSubmit}>
      <h2>Filters</h2>
      <hr />
      <div>
        <h3>Category</h3>
        {categories.map((category) => (
          <>
            <input key={1} type="radio" value={category} id={category} />
            <label htmlFor={category}>{category}</label>
          </>
        ))}
      </div>
      <hr />
      <div>
        <h3>Price</h3>
        <div className={styles.currency_block}>
          <h4>from</h4>
          <input type="number" min={0} max={9999999} name="currencyFrom" />
        </div>
        <div className={styles.currency_block}>
          <h4>to</h4>
          <input type="number" min={0} max={9999999} name="currencyTo" />
        </div>
        <CustomButton
          fontSize="1rem"
          buttonType="grey"
          fontWeight={600}
          width="100%"
          loading={false}
          text="Accept"
          height={50}
          margin="10px 0 0 0"
        />
      </div>
      <hr />
      <h3>Currency</h3>
    </form>
  );
};
