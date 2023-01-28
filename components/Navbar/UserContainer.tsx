import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";

import ProfileIcon from "../../public/assets/navbarIcons/ProfileIcon";

import styles from "../../styles/navbar/MobileNavbar.module.scss";

interface IUserContainer {
  userData: Session;
  sidebarModalHandler: () => void;
}

const UserContainer = ({ userData, sidebarModalHandler }: IUserContainer) => {
  return (
    <Link href="/profile" replace={true}>
      <a className={styles.profile_container} onClick={sidebarModalHandler}>
        {userData?.user?.image ? (
          <Image
            alt="user icon"
            src={userData.user.image}
            width={50}
            height={50}
            style={{ borderRadius: "50%" }}
          />
        ) : (
          <ProfileIcon //! MAKE PLACEHOLDER FOR AVATAR
            className={styles.icon}
            style={{ width: "50px", height: "50px" }}
          />
        )}
        <div className={styles.profile_info}>
          <h4>{userData?.user?.name}</h4>
          <h6>{userData?.user?.email}</h6>
        </div>
      </a>
    </Link>
  );
};

export default UserContainer;
