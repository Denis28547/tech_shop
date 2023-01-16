import { NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/router";

import { wrapper } from "../../store/store";
import { requireAuth } from "../../utils/requireAuth";
import {
  getItemByIdWithUser,
  getRunningOperationPromises,
  useAddItemMutation,
} from "../../store/services/ItemService";
import { ICategory, IItemWithUser } from "../../types/index";

import NameCategoryPriceComponent from "../../components/SellPage/NameCategoryPriceComponent";
import PhotosComponent from "../../components/SellPage/PhotosComponent";
import DescriptionComponent from "../../components/SellPage/DescriptionComponent";
import UserInfoComponent from "../../components/SellPage/UserInfoComponent";
import ButtonComponent from "../../components/SellPage/ButtonComponent";

import styles from "../../styles/sellPage/SellPage.module.scss";
import { getSession } from "next-auth/react";
import { getAllCategories } from "../../store/services/CategoryService";

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

interface ISellPage {
  item?: IItemWithUser;
  categories: ICategory[];
}

const SellPage: NextPage<ISellPage> = ({ item, categories }) => {
  const [addItem, { isLoading, isError, data, error }] = useAddItemMutation();
  const [photoError, setPhotoError] = useState("");
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

  if (data) {
    router.replace(`/redirect?text=${data.message}&success=${true}`);
  }

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit}>
      <h1 className={styles.main_text}>Sell something</h1>
      <NameCategoryPriceComponent
        nameInitial={item?.name}
        priceInitial={item?.price}
        categoryInitial={item?.category_id}
        categories={categories}
      />
      <PhotosComponent photoError={photoError} initialImages={item?.images} />
      <DescriptionComponent descriptionInitial={item?.description} />
      <UserInfoComponent
        locationInitial={item?.location}
        numberInitial={item?.phone_number}
      />
      <ButtonComponent
        //@ts-ignore idk how to handle data.message type
        responseErrMessage={isError && error && error.data.message}
        loadingResponse={isLoading}
      />
    </form>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { item_id } = context.query;

    const redirectDestination =
      "/redirect?text=Please log in or register to sell an item&success=false";

    const session = await getSession(context);

    if (!session || !session.user)
      return {
        redirect: {
          destination: redirectDestination,
          permanent: false,
        },
      };

    let data: any = null;

    const categories = await store.dispatch(getAllCategories.initiate());

    if (item_id) {
      const result = await store.dispatch(
        getItemByIdWithUser.initiate(item_id)
      );
      if (result.status === "rejected")
        return {
          redirect: {
            destination:
              "/redirect?text=Something went wrong editing your item&success=false",
            permanent: false,
          },
        };
      data = result.data;
    }
    await Promise.all(getRunningOperationPromises());

    if (data && session.user.id !== data.user_id)
      return {
        redirect: {
          destination:
            "/redirect?text=You don't have permission to edit this item&success=false",
          permanent: false,
        },
      };

    return {
      props: {
        session,
        ...(data && { item: data }),
        categories: categories.data,
      },
    };
  }
);

export default SellPage;
