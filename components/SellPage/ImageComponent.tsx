import { useState, useEffect, useRef } from "react";
import Image from "next/image";

import CameraIcon from "../../public/assets/sellPageIcons/CameraIcon";
import TrashIcon from "../../public/assets/sellPageIcons/TrashIcon";

import styles from "../../styles/sellPage/ImageComponent.module.scss";

interface IImageComponent {
  id: string;
  initialImage?: string;
}

const ImageComponent = ({ id, initialImage }: IImageComponent) => {
  const [initialImageState, setInitialImageState] = useState<
    string | undefined
  >(initialImage);
  const [image, setImage] = useState<File | null>();
  const [preview, setPreview] = useState<string | null>();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSetImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (
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

  if (initialImageState) {
    const initialImagePath = `${process.env.NEXT_PUBLIC_BASE_URL}/api/image/${initialImageState}`;

    return (
      <div
        className={styles.file_container}
        onClick={() => {
          setInitialImageState(undefined);
        }}
      >
        <>
          <Image
            src={initialImagePath}
            alt="photo"
            layout="fill"
            objectFit="cover"
          />
          <div className={styles.trash_icon_container}>
            <TrashIcon className={styles.trash_icon} />
          </div>
          <input id={id} defaultValue={initialImageState} type="text" />
        </>
      </div>
    );
  }

  return (
    <div
      className={styles.file_container}
      onClick={() => {
        if (inputRef?.current?.value) inputRef.current.value = "";
        setImage(null);
      }}
    >
      {preview ? (
        <>
          <Image src={preview} alt="photo" layout="fill" objectFit="cover" />
          <div className={styles.trash_icon_container}>
            <TrashIcon className={styles.trash_icon} />
          </div>
        </>
      ) : (
        <CameraIcon className={styles.camera_icon} />
      )}

      <input
        type="file"
        id={id}
        ref={inputRef}
        onChange={handleSetImage}
        accept=".jpg,.jpeg"
        style={{ zIndex: preview ? -1 : 0 }}
      />
    </div>
  );
};

export default ImageComponent;
