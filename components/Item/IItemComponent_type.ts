import { IItem } from "../../store/redux_types";

export interface IItemComponent {
  item_image: string;
  item: IItem;
  fullDate: string;
  isFavorite: boolean;
  changeFavorite: (e: React.MouseEvent<Element, MouseEvent>) => void;
  handleOpenFullItem: () => void;
}