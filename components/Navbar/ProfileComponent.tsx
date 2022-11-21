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

  useEffect(() => {
    modalActive === true
      ? (document.body.style.overflowY = "hidden")
      : (document.body.style.overflowY = "scroll");
  }, [modalActive]);

  return (
    <>
      <ProfileIcon
        className={styles.icon}
        onClick={() => whichHandlerToUse()}
      />

      <Modal active={modalActive} setActive={modalHandler}>
        <Auth modalActive={modalActive} modalHandler={modalHandler} />
      </Modal>

      {authContainer && (
        <>
          <div className={styles.auth_container}>
            <>
              <Link href="profile">
                <div
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
                </div>
              </Link>
              <hr />
              <div className={styles.list}>
                <Link
                  href={`${process.env.NEXT_PUBLIC_BASE_URL}/profile/messages`}
                >
                  <p
                    className={styles.links}
                    onClick={() => setAuthContainer(false)}
                  >
                    Messages
                  </p>
                </Link>
                <Link
                  href={`${process.env.NEXT_PUBLIC_BASE_URL}/profile/favorites`}
                >
                  <p
                    className={styles.links}
                    onClick={() => setAuthContainer(false)}
                  >
                    Favorites
                  </p>
                </Link>
                <Link
                  href={`${process.env.NEXT_PUBLIC_BASE_URL}/profile/settings`}
                >
                  <p
                    className={styles.links}
                    onClick={() => setAuthContainer(false)}
                  >
                    Settings
                  </p>
                </Link>
              </div>
              <hr />
              <a onClick={() => signOut({ redirect: true, callbackUrl: "/" })}>
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
