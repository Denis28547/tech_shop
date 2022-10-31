import { useState, useEffect } from "react";
import Image from "next/image";

import CameraIcon from "../../public/assets/sellPageIcons/CameraIcon";

import styles from "../../styles/sellPage/SellPageBlock.module.scss";

const ImageComponent = () => {
  const [image, setImage] = useState<File | null>();
  const [preview, setPreview] = useState<string | null>();

  const show = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file) {
      setImage(file[0]);
    } else {
      setImage(null);
    }
  };

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);
  //! validate image so it will only be jpg and png

  return (
    <div className={styles.file_container}>
      {preview ? (
        <Image
          src={preview}
          alt="photo"
          layout="fill"
          onClick={() => setPreview(null)}
        />
      ) : (
        <>
          <input type="file" onChange={show} accept=".png,.jpg" />
          <CameraIcon className={styles.camera_icon} />
        </>
      )}
    </div>
  );
};

export default ImageComponent;
