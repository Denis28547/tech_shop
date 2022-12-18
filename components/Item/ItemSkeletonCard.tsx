import ItemSkeleton, { templatesFn } from "./ItemSkeleton";
import ItemSkeletonWide from "./ItemSkeletonWide";

interface IItemSkeletonCard {
  isMobile: boolean;
}

const ItemSkeletonCard = ({ isMobile }: IItemSkeletonCard) => {
  const itemTemplates = templatesFn();

  return (
    <>
      {itemTemplates.map((_, index) =>
        isMobile ? (
          <ItemSkeleton key={index} />
        ) : (
          <ItemSkeletonWide key={index} />
        )
      )}
    </>
  );
};

export default ItemSkeletonCard;
// {isMobile ? <ItemSkeleton /> : <ItemSkeletonWide />}
