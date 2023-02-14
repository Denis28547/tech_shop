import ItemStyle from "./ItemStyle";
import ItemWideStyle from "./ItemWideStyle";
import { IItem, IItemWithCategory } from "../../types/index";

import { useChangeIsFavoriteHook } from "./ChangeIsFavoriteHook";

interface IItemCard {
  item: IItem | IItemWithCategory;
  isWide?: boolean;
  isFavoriteData: boolean;
  isEditable?: boolean;
}

const ItemCard = ({ item, isWide, isFavoriteData, isEditable }: IItemCard) => {
  const [isFavorite, changeFavorite] = useChangeIsFavoriteHook(
    isFavoriteData,
    item.id
  );

  const item_image = `${process.env.NEXT_PUBLIC_BASE_URL}/api/image/${item.images[0]}`;

  const date = new Date(item.createdAt);

  const fullDate = `${date.getDate()} ${date.toLocaleString("default", {
    month: "long",
  })} ${date.getFullYear()}`;

  return (
    <>
      {isWide ? (
        <ItemWideStyle
          item_image={item_image}
          item={item as IItemWithCategory}
          fullDate={fullDate}
          isFavorite={isFavorite}
          changeFavorite={changeFavorite}
          isEditable={isEditable}
        />
      ) : (
        <ItemStyle
          item_image={item_image}
          item={item}
          fullDate={fullDate}
          isFavorite={isFavorite}
          changeFavorite={changeFavorite}
          isEditable={isEditable}
        />
      )}
    </>
  );
};

export default ItemCard;
