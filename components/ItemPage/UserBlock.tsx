import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";

import { useAppDispatch } from "../../store/hooks";
import { openPopupSuccess } from "../../store/reducers/PopupSlice";

import { IUser } from "../../types/index";
import Link from "next/link";
import CustomButton from "../CustomButton";
import UserPicPlaceholderIcon from "../../public/assets/UserPicPlaceholderIcon";
import StarIcon from "../../public/assets/StarIcon";

import styles from "../../styles/itemPage/UserBlock.module.scss";
interface IUserBlock {
  user: IUser;
  phone_number: string | null;
  location: string;
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

const UserBlock = ({ user, phone_number, location }: IUserBlock) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isNumberShown, setIsNumberShown] = useState(false);
  const rating = 4;

  const { starsArr, ratedName } = countRating(rating);

  const date = new Date(user.createdAt);
  const fullDate = `${date.getDate()} ${date.toLocaleString("default", {
    month: "long",
  })} ${date.getFullYear()}`;

  return (
    <div className={styles.user_block}>
      <b>SELLER</b>
      <Link href={"/profile"} replace={true}>
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
              <h3>{location}</h3>
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
        {phone_number && (
          <CustomButton
            buttonType="outline"
            loading={false}
            text={isNumberShown ? phone_number : "Show number"}
            width="100%"
            height={50}
            fontSize="1rem"
            fontWeight={600}
            onClick={() => {
              setIsNumberShown(true);
              if (isNumberShown) {
                navigator.clipboard.writeText(phone_number);
                dispatch(openPopupSuccess("Number copied to clipboard"));
              }
            }}
          />
        )}
        <CustomButton
          buttonType="blue"
          loading={false}
          text="Message"
          width={phone_number ? "100%" : "calc(200% + 20px)"}
          height={50}
          fontSize="1rem"
          fontWeight={600}
          onClick={() => router.replace("/profile")}
        />
      </div>
    </div>
  );
};

export default UserBlock;
