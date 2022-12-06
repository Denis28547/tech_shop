import { NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { useAddItemMutation } from "../../store/services/ItemService";
import NameCategoryPriceComponent from "../../components/SellPage/NameCategoryPriceComponent";
import PhotosComponent from "../../components/SellPage/PhotosComponent";
import DescriptionComponent from "../../components/SellPage/DescriptionComponent";
import UserInfoComponent from "../../components/SellPage/UserInfoComponent";
import ButtonComponent from "../../components/SellPage/ButtonComponent";

import styles from "../../styles/sellPage/SellPage.module.scss";
interface ITarget {
  name: { value: string };
  category: { value: string };
  price: { value: string };
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
  number: { value: string };
}

const SellPage: NextPage = () => {
  const [addItem, { isLoading, isError, data, error }] = useAddItemMutation();
  const [photoError, setPhotoError] = useState("");
  const { status } = useSession();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as typeof e.target & ITarget;
    if (target.image0.files.length === 0) {
      alert("Please add main photo");
      setPhotoError("*Not valid (please add main photo)");
      return;
    }

    let images: File[] = [];

    Object.values(target).forEach((value: any) => {
      if (value.type !== "file") return;
      if (!value.files[0]) return;
      images.push(value.files[0]);
    });

    const formData = new FormData();
    formData.append("name", target.name.value);
    formData.append("category", target.category.value);
    formData.append("price", target.price.value);
    images.forEach((image) => {
      formData.append("images", image);
    });
    formData.append("description", target.description.value);
    formData.append("location", target.location.value);
    formData.append("number", target.number.value);

    await addItem(formData);
  };

  if (status === "unauthenticated") {
    router.push(
      `/redirect?text=Please log in or register to sell an item&success=${false}`
    );
  }

  if (data) {
    router.push(`/redirect?text=${data.message}&success=${true}`);
  }

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit}>
      <h1 className={styles.main_text}>Sell something</h1>
      <NameCategoryPriceComponent />
      <PhotosComponent photoError={photoError} />
      <DescriptionComponent />
      <UserInfoComponent />
      <ButtonComponent
        //@ts-ignore idk how to handle data.message type
        responseErrMessage={isError && error && error.data.message}
        loadingResponse={isLoading}
      />
    </form>
  );
};

export default SellPage;
