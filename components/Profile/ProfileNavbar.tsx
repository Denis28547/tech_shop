import Link from "next/link";
import { useRouter } from "next/router";

import styles from "../../styles/profile/ProfileNavbar.module.scss";

export const ProfileNavbar = () => {
  const router = useRouter();

  type linksObjType = {
    [key: string]: string;
  };

  const linksObj: linksObjType = {
    "/profile": "Your items",
    "/profile/favorites": "Favorites",
    "/profile/settings": "Settings",
    "/profile/messages": "Messages",
  };

  function getKeyByValue(value: string) {
    return Object.keys(linksObj).filter((key) => linksObj[key] === value)[0];
  }

  return (
    <div className={styles.profile_navbar_wrapper}>
      <div className={styles.profile_navbar_content}>
        <h1 className={styles.profile_navbar_current_page}>
          {linksObj[router.asPath]}
        </h1>
        <div className={styles.profile_navbar_links_container}>
          {Object.values(linksObj).map((link, index) => {
            let isCurrentLink = false;
            const currentLinkKey = getKeyByValue(link);

            if (router.asPath === currentLinkKey) isCurrentLink = true;
            return (
              <Link key={index} href={currentLinkKey}>
                <a className={isCurrentLink ? styles.current_link : ""}>
                  {link}
                </a>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
