import Image from "next/image";
import { useState } from "react";

import { IUser } from "../../store/redux_types";
import Link from "next/link";
import CustomButton from "../CustomButton";
import UserPicPlaceholderIcon from "../../public/assets/UserPicPlaceholderIcon";
import StarIcon from "../../public/assets/StarIcon";

import styles from "../../styles/itemPage/UserBlock.module.scss";
interface IUserBlock {
  user: IUser;
}

const countRating = (rating: number) => {
  const starsArr = [];
  const ratingRounded = Math.round(rating * 2) / 2;

  for (let i = 1; i <= ratingRounded; i++) {
    starsArr.push(1);
  }
  while (starsArr.length < 5) {
    starsArr.push(0);
  }

  let ratedName = "great";

  if (ratingRounded < 3) ratedName = "bad";
  if (ratingRounded >= 3 && ratingRounded < 4) ratedName = "medium";

  return {
    ratedName,
    starsArr,
  };
};

const UserBlock = ({ user }: IUserBlock) => {
  const [isNumberShown, setIsNumberShown] = useState(false);
  const number = "+380683200302";
  const rating = 4;

  const { starsArr, ratedName } = countRating(rating);

  const date = new Date(user.createdAt);
  const fullDate = `${date.getDate()} ${date.toLocaleString("default", {
    month: "long",
  })} ${date.getFullYear()}`;

  return (
    <div className={styles.user_block}>
      <b>SELLER</b>
      <Link href="profile">
        <a>
          <div className={styles.user_container}>
            {user.image ? (
              <Image
                src={user.image}
                width={"65px"}
                height={"65px"}
                style={{ borderRadius: "50%" }}
                alt={"user image"}
              />
            ) : (
              <UserPicPlaceholderIcon
                className={styles.profile_pic_placeholder}
              />
            )}

            <div className={styles.user_info}>
              <h3>{user.name}</h3>
              <p>
                registered since <b>{fullDate}</b>
              </p>
            </div>
          </div>
        </a>
      </Link>

      <div
        className={styles.rating_box}
        data-rating={ratedName}
        title={`User rating is ${rating}`}
      >
        <b>User rating:</b>
        <div className={styles.stars_container}>
          {starsArr.map((star, index) => {
            let isFilled;
            star === 1 ? (isFilled = true) : (isFilled = false);
            return (
              <StarIcon
                key={index}
                className={styles.star}
                data-filled={isFilled}
              />
            );
          })}
        </div>
      </div>

      <div className={styles.buttons_container}>
        <CustomButton
          buttonType="outline"
          loading={false}
          text={isNumberShown ? number : "Show number"}
          width="100%"
          height={50}
          fontSize="1rem"
          fontWeight={600}
          onClick={(e) => {
            setIsNumberShown(true);
            if (isNumberShown) {
              navigator.clipboard.writeText(number);
              alert("number copied to clipboard");
            }
          }}
        />
        <CustomButton
          buttonType="blue"
          loading={false}
          text="Message"
          width="100%"
          height={50}
          fontSize="1rem"
          fontWeight={600}
        />
      </div>
    </div>
  );
};

export default UserBlock;
