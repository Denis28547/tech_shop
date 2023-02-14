import { IItem, IItemWithCategory } from "../../types/index";

export interface IItemCard {
  item_image: string;
  item: IItem | IItemWithCategory;
  fullDate: string;
  isFavorite: boolean;
  changeFavorite: () => void;
  isEditable?: boolean;
}
export interface IItemCardWithCategory extends IItemCard {
  item: IItemWithCategory;
}
