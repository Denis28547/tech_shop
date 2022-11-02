import { NextPage } from "next";
import { useState } from "react";
import axios from "axios";

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

    let images: File[] = [];

    Object.values(target).forEach((value: any) => {
      if (value.type !== "file") return;
      if (!value.files[0]) return;
      images.push(value.files[0]);
    });
    3;
    const formData = new FormData();
    formData.append("name", target.name.value);
    formData.append("category", target.category.value);
    formData.append("price", `${target.price.value}`);
    images.forEach((image) => {
      formData.append("images", image);
    });
    formData.append("description", target.description.value);
    formData.append("location", target.location.value);
    console.log(formData.getAll("images"));

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/item`,
        formData
      );

      // console.log(response);
    } catch (error) {
      console.log(error);
    }

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
