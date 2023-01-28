import { useAppDispatch } from "../../store/hooks";
import { setIsAuthModalOpen } from "../../store/reducers/SmallThingsSlice";

import ProfileIcon from "../../public/assets/navbarIcons/ProfileIcon";

import styles from "../../styles/navbar/MobileNavbar.module.scss";

interface INoAuthUserContainer {
  sidebarModalHandler: () => void;
}

const NoAuthUserContainer = ({ sidebarModalHandler }: INoAuthUserContainer) => {
  const dispatch = useAppDispatch();

  const closeSidebarAndOpenAuthModal = () => {
    sidebarModalHandler();
    dispatch(setIsAuthModalOpen(true));
  };

  return (
    <div
      className={styles.profile_container}
      onClick={closeSidebarAndOpenAuthModal}
    >
      <ProfileIcon className={styles.icon} />
      <div className={styles.profile_info}>
        <h4>Login | Register</h4>
      </div>
    </div>
  );
};

export default NoAuthUserContainer;
