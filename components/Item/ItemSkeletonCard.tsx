import ItemSkeleton, { templatesFn } from "./ItemSkeleton";
import ItemSkeletonWide from "./ItemSkeletonWide";

interface IItemSkeletonCard {
  isItemWide: boolean;
}

const ItemSkeletonCard = ({ isItemWide }: IItemSkeletonCard) => {
  const itemTemplates = templatesFn();

  return (
    <>
      {itemTemplates.map((_, index) =>
        isItemWide ? (
          <ItemSkeleton key={index} />
        ) : (
          <ItemSkeletonWide key={index} />
        )
      )}
    </>
  );
};

export default ItemSkeletonCard;
