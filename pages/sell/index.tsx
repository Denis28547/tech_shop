import { NextPage } from "next";
// import { useState } from "react";

import styles from "../../styles/sellPage/SellPage.module.scss";

import NameCategoryPriceComponent from "../../components/SellPage/NameCategoryPriceComponent";
import PhotosComponent from "../../components/SellPage/PhotosComponent";
import DescriptionComponent from "../../components/SellPage/DescriptionComponent";
import LocationComponent from "../../components/SellPage/LocationComponent";
import ButtonComponent from "../../components/SellPage/ButtonComponent";

const SellPage: NextPage = () => {
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit}>
      <h1 className={styles.main_text}>Sell something</h1>

      <NameCategoryPriceComponent />
      <PhotosComponent />
      <DescriptionComponent />
      <LocationComponent />
      <ButtonComponent />
    </form>
  );
};
//! try to make validation without useStates, make isDirty class for css
//! and in scss check if input isInvalid and has isDirty thing

export default SellPage;
