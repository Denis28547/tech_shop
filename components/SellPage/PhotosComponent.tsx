import { useState } from "react";

import styles from "../../styles/sellPage/SellPageBlock.module.scss";

import CameraIcon from "../../public/assets/sellPageIcons/CameraIcon";

const PhotosComponent = () => {
  let photoTemplates = [];

  for (let photoCount = 0; photoCount < 8; photoCount++) {
    photoTemplates.push(photoCount);
  }

  const show = (e) => {
    console.log(e.target.files);
  };

  return (
    <div className={styles.option_block}>
      <h2>Photos</h2>
      <label>The first photo will be on the cover of the ad</label>
      <div className={styles.files_grid}>
        {photoTemplates.map((photo) => {
          return (
            <div key={photo} className={styles.file_container}>
              <input type="file" onChange={show} accept=".png,.jpg" />
              <CameraIcon className={styles.camera_icon} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PhotosComponent;
