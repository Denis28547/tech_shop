import { NextPage } from "next";
import { useState } from "react";

import styles from "../../styles/sellPage/SellPage.module.scss";

import NameCategoryPriceComponent from "../../components/SellPage/NameCategoryPriceComponent";
import PhotosComponent from "../../components/SellPage/PhotosComponent";
import DescriptionComponent from "../../components/SellPage/DescriptionComponent";
import LocationComponent from "../../components/SellPage/LocationComponent";
import ButtonComponent from "../../components/SellPage/ButtonComponent";

interface ITarget {
  name: { value: string };
  category: { value: string };
  price: { value: number };
  image0: { files: FileList };
  image1: { files: FileList };
  image2: { files: FileList };
  image3: { files: FileList };
  image4: { files: FileList };
  image5: { files: FileList };
  image6: { files: FileList };
  image7: { files: FileList };
  description: { value: string };
  location: { value: string };
}

const defaultResponseError = {
  error: false,
  message: "",
};

const SellPage: NextPage = () => {
  const [responseError, setResponseError] = useState(defaultResponseError);
  // console.log(responseError);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as typeof e.target & ITarget;
    if (target.image0.files.length === 0) return alert("Please add main photo");
    // console.log(target.image0.files[0]);

    let images: File[] = [];

    Object.values(target).forEach((value: any) => {
      if (value.type !== "file") return;
      if (!value.files[0]) return;
      // console.log(value.files[0]);
      images.push(value.files[0]);
    });

    const { name, category, price, description, location } = target;

    const data = {
      name,
      category,
      price,
      images,
      description,
      location,
    };

    setResponseError(defaultResponseError);
  };

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit}>
      <h1 className={styles.main_text}>Sell something</h1>

      <NameCategoryPriceComponent />
      <PhotosComponent />
      <DescriptionComponent />
      <LocationComponent />
      <ButtonComponent errMessage={responseError.message} />
    </form>
  );
};
//! try to make validation without useStates, make isDirty class for css
//! and in scss check if input isInvalid and has isDirty thing

export default SellPage;
