import { useState, useEffect, useRef } from "react";
import Image from "next/image";

import CameraIcon from "../../public/assets/sellPageIcons/CameraIcon";
import TrashIcon from "../../public/assets/sellPageIcons/TrashIcon";

import styles from "../../styles/sellPage/ImageComponent.module.scss";

const ImageComponent = ({ id }: { id: string }) => {
  const initialImage = `${process.env.NEXT_PUBLIC_FILEPATH_TO_USER_ITEM_IMAGES}4872ad66-c019-4cf5-8c83-72532d5afcaf.png`;

  const [image, setImage] = useState<File | null>();
  const [preview, setPreview] = useState<string | null>();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSetImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (
      (file && file[0].type === "image/png") ||
      (file && file[0].type === "image/jpg") ||
      (file && file[0].type === "image/jpeg")
    ) {
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

  // if (initialImage) {
  //   return (
  //     <div className={styles.file_container}>
  //       <>
  //         <Image
  //           src={initialImage}
  //           alt="photo"
  //           layout="fill"
  //           objectFit="cover"
  //         />
  //         <div
  //           className={styles.trash_icon_container}
  //           onClick={() => {
  //             if (inputRef?.current?.value) inputRef.current.value = "";
  //             setImage(null);
  //           }}
  //         >
  //           <TrashIcon className={styles.trash_icon} />
  //         </div>
  //       </>

  //       <input
  //         type="file"
  //         id={id}
  //         ref={inputRef}
  //         onChange={handleSetImage}
  //         accept=".png,.jpg,.jpeg"
  //       />
  //     </div>
  //   );
  // }

  return (
    <div className={styles.file_container}>
      {preview ? (
        <>
          <Image src={preview} alt="photo" layout="fill" objectFit="cover" />
          <div
            className={styles.trash_icon_container}
            onClick={() => {
              if (inputRef?.current?.value) inputRef.current.value = "";
              setImage(null);
            }}
          >
            <TrashIcon className={styles.trash_icon} />
          </div>
        </>
      ) : (
        <>
          <CameraIcon className={styles.camera_icon} />
        </>
      )}
      <input
        type="file"
        id={id}
        ref={inputRef}
        onChange={handleSetImage}
        accept=".png,.jpg,.jpeg"
      />
    </div>
  );
};

export default ImageComponent;
