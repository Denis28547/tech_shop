import { NextPage } from "next";

import styles from "../../styles/sellPage/SellPage.module.scss";

const SellPage: NextPage = () => {
  return (
    <form className={styles.wrapper}>
      <h1 className={styles.main_text}>Sell something</h1>

      <div className={styles.input_container}>
        <h2>Choose name and category</h2>
        <label>Name</label>
        <input type="text" placeholder="Name you item" />
        <label>Category</label>
        <select name="cars" id="cars">
          <option value="volvo">Option</option>
          <option value="saab">Option</option>
          <option value="mercedes">Option</option>
          <option value="audi">Option</option>
        </select>
        <label>Price</label>
        <input type="number" placeholder="Price your item" />
      </div>

      <div className={styles.input_container}>
        <h2>Photos</h2>
        <label>The first photo will be on the cover of the ad</label>
        <input type="file" />
        <input type="file" />
        <input type="file" />
        <input type="file" />
        <input type="file" />
        <input type="file" />
        <input type="file" />
        <input type="file" />
      </div>

      <div className={styles.input_container}>
        <h2>Description</h2>
        <textarea
          placeholder="Write some description about item you want to sell"
          minLength={30}
          maxLength={900}
        />
      </div>

      <div className={styles.input_container}>
        <h2>Location</h2>
        <input type="text" placeholder="Name of the city" />
      </div>

      <div className={styles.input_container}>
        <button>Post</button>
      </div>
    </form>
  );
};

export default SellPage;
