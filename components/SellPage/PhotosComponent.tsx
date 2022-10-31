import { useState, useEffect } from "react";
import Image from "next/image";

import ImageComponent from "./ImageComponent";

import styles from "../../styles/sellPage/SellPageBlock.module.scss";

const PhotosComponent = () => {
  let photoTemplates = [];

  for (let photoCount = 0; photoCount < 8; photoCount++) {
    photoTemplates.push(photoCount);
  }

  //! IMAGE SHOULD HAVE fit=cover
  return (
    <div className={styles.option_block}>
      <h2>Photos</h2>
      <label>The first photo will be on the cover of the ad</label>
      <div className={styles.files_grid}>
        {photoTemplates.map((photo) => {
          return <ImageComponent key={photo} />;
        })}
      </div>
    </div>
  );
};

export default PhotosComponent;
