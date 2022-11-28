import { IItem } from "../../store/redux_types";

export interface IItemCard {
  item_image: string;
  item: IItem;
  category?: string;
  fullDate: string;
  isFavorite: boolean;
  changeFavorite: (e: React.MouseEvent<Element, MouseEvent>) => void;
  handleOpenFullItem: () => void;
}