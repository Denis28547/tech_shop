import Image from "next/image";
import { useState } from "react";

import Loader from "../Loader";

import styles from "../../styles/itemPage/PhotoBlock.module.scss";

interface IPhotoBlock {
  images: string[];
}

const PhotoBlock = ({ images }: IPhotoBlock) => {
  const [currentImage, setCurrentImage] = useState(0);
  const image = `${process.env.NEXT_PUBLIC_BASE_URL}/api/image/${images[currentImage]}`;

  const prevImage = () => {
    setCurrentImage((prevVal) => {
      const newVal = prevVal - 1;
      if (newVal < 0) return prevVal;
      return newVal;
    });
  };
  const nextImage = () => {
    setCurrentImage((prevVal) => {
      const newVal = prevVal + 1;
      if (newVal < images.length) return newVal;
      return prevVal;
    });
  };

  return (
    <div className={styles.photo_block}>
      <div
        className={` ${styles.arrow} ${styles.left_arrow} ${
          currentImage === 0 ? styles.arrow_disabled : null
        }`}
        onClick={prevImage}
      />
      <div
        className={` ${styles.arrow} ${styles.right_arrow} ${
          currentImage === images.length - 1 ? styles.arrow_disabled : null
        }`}
        onClick={nextImage}
      />
      <div className={styles.image_wrapper}>
        <Image
          src={image}
          layout="fill"
          objectFit="cover"
          alt={"item image"}
          style={{ zIndex: 1 }}
        />
        <div className={styles.loader_wrapper}>
          <Loader height={100} />
        </div>
        {images.length > 1 && (
          <div className={styles.dots_container}>
            {images.map((_, index) => {
              let isCurrentImage = false;
              if (index === currentImage) isCurrentImage = true;
              return (
                <span
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`${styles.dot} ${
                    isCurrentImage && styles.active_dot
                  }`}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoBlock;
