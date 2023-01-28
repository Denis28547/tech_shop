import NightIcon from "../../public/assets/navbarIcons/NightIcon";
import DayIcon from "../../public/assets/navbarIcons/DayIcon";

import styles from "../../styles/navbar/MobileNavbar.module.scss";

interface IThemeIcon {
  theme: string;
  handleSetTheme: () => void;
}

const ThemeIcon = ({ theme, handleSetTheme }: IThemeIcon) => {
  return (
    <>
      {theme === "light" ? (
        <DayIcon className={styles.theme_icon} onClick={handleSetTheme} />
      ) : (
        <NightIcon className={styles.theme_icon} onClick={handleSetTheme} />
      )}
    </>
  );
};

export default ThemeIcon;
