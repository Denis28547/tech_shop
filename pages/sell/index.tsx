import { NextPage } from "next";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

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

const SellPage: NextPage = () => {
  const [responseErrMessage, setResponseErrMessage] = useState("");
  const [photoError, setPhotoError] = useState("");
  const [loadingResponse, setLoadingResponse] = useState(false);
  const { status, data } = useSession();
  console.log(data);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingResponse(true);

    const target = e.target as typeof e.target & ITarget;
    if (target.image0.files.length === 0) {
      alert("Please add main photo");
      setPhotoError("*Not valid (please add main photo)");
      setLoadingResponse(false);
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
    formData.append("price", `${target.price.value}`);
    images.forEach((image) => {
      formData.append("images", image);
    });
    formData.append("description", target.description.value);
    formData.append("location", target.location.value);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/item`,
        formData
      );

      router.push(`/redirect?text=${response.data.message}&success=${true}`);
    } catch (error: any) {
      setResponseErrMessage(error.response.data.message);
      setLoadingResponse(false);
    }
  };

  if (status === "unauthenticated") {
    router.push(
      `/redirect?text=Please log in or register to sell an item&success=${false}`
    );
  }

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit}>
      <h1 className={styles.main_text}>Sell something</h1>
      <NameCategoryPriceComponent />
      <PhotosComponent photoError={photoError} />
      <DescriptionComponent />
      <LocationComponent />
      <ButtonComponent
        responseErrMessage={responseErrMessage}
        loadingResponse={loadingResponse}
      />
    </form>
  );
};

export default SellPage;
