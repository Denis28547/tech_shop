import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import ProfileIcon from "../../public/assets/navbarIcons/ProfileIcon";
import styles from "../../styles/navbar/ProfileComponent.module.scss";
import Modal from "../Modal";
import Auth from "../Auth/Auth";

const ProfileComponent = () => {
  const [authContainer, setAuthContainer] = useState(false);
  const [modalActive, setModalActive] = useState(false);

  const modalHandler = () => setModalActive(!modalActive);

  const session = useSession();

  const whichHandlerToUse = () => {
    session.status === "authenticated"
      ? setAuthContainer((prevState) => !prevState)
      : modalHandler();
  };

  useEffect(() => {
    modalActive === true
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "scroll");
  }, [modalActive]);

  return (
    <>
      <ProfileIcon
        className={styles.icon}
        onClick={() => whichHandlerToUse()}
      />

      <Modal active={modalActive} setActive={modalHandler}>
        <Auth />
      </Modal>

      {authContainer && (
        <div className={styles.auth_container}>
          <>
            <Link href="profile">
              <div className={styles.profile_container}>
                {session.data?.user?.image ? (
                  <Image
                    alt="user icon"
                    src={session.data.user.image}
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
                  <h4>{session.data?.user?.name}</h4>
                  <h6>{session.data?.user?.email}</h6>
                </div>
              </div>
            </Link>
            <hr />
            <a onClick={() => signOut()}>Sign out</a>
          </>
        </div>
      )}
    </>
  );
};

export default ProfileComponent;
