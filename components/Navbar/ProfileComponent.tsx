import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

import ProfileIcon from "../../public/assets/navbarIcons/ProfileIcon";
import Modal from "../Modal";
import Auth from "../Auth/Auth";

import styles from "../../styles/navbar/ProfileComponent.module.scss";

const ProfileComponent = () => {
  const [authContainer, setAuthContainer] = useState(false);
  const [modalActive, setModalActive] = useState(false);

  const modalHandler = () => setModalActive(!modalActive);

  const { status, data } = useSession();

  const whichHandlerToUse = () => {
    status === "authenticated"
      ? setAuthContainer((prevState) => !prevState)
      : modalHandler();
  };

  return (
    <>
      <ProfileIcon
        className={styles.icon}
        onClick={() => whichHandlerToUse()}
      />

      <Modal
        active={modalActive}
        setActive={modalHandler}
        putChildrenInContainer={true}
      >
        <Auth modalActive={modalActive} modalHandler={modalHandler} />
      </Modal>

      {authContainer && (
        <>
          <div className={styles.auth_container}>
            <>
              <Link href="/profile" replace={true}>
                <a
                  className={styles.profile_container}
                  onClick={() => setAuthContainer(false)}
                >
                  {data?.user?.image ? (
                    <Image
                      alt="user icon"
                      src={data.user.image}
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
                    <h4>{data?.user?.name}</h4>
                    <h6>{data?.user?.email}</h6>
                  </div>
                </a>
              </Link>
              <hr />
              <div className={styles.list}>
                <Link
                  href={`${process.env.NEXT_PUBLIC_BASE_URL}/profile/messages`}
                >
                  <a
                    className={styles.links}
                    onClick={() => setAuthContainer(false)}
                  >
                    Messages
                  </a>
                </Link>
                <Link
                  href={`${process.env.NEXT_PUBLIC_BASE_URL}/profile/favorites`}
                >
                  <a
                    className={styles.links}
                    onClick={() => setAuthContainer(false)}
                  >
                    Favorites
                  </a>
                </Link>
                <Link
                  href={`${process.env.NEXT_PUBLIC_BASE_URL}/profile/settings`}
                >
                  <a
                    className={styles.links}
                    onClick={() => setAuthContainer(false)}
                  >
                    Settings
                  </a>
                </Link>
              </div>
              <hr />
              <a
                className={styles.links}
                onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
              >
                Sign out
              </a>
            </>
          </div>
          <div
            className={styles.auth_container_background}
            onClick={() => setAuthContainer(!authContainer)}
          ></div>
        </>
      )}
    </>
  );
};

export default ProfileComponent;
