import { useChangeThemeHook } from "../Navbar/ChangeThemeHook";
import LogoIcon from "../../public/assets/navbarIcons/Logo_WhiteIcon";

import styles from "../../styles/footer/Footer.module.scss";

interface IFooter {
  disabled: boolean;
}

export const Footer = ({ disabled }: IFooter) => {
  const [theme] = useChangeThemeHook();

  return (
    <footer
      className={styles.footer}
      style={{ display: disabled ? "none" : "flex" }}
      id="footer"
    >
      <LogoIcon theme={theme} className={styles.logo} />
      <p>
        Sell IT - here you can find what you were looking for! By clicking on
        the Submit an ad button, you can place an ad on any topic easily and
        quickly. With the help of the Sell IT services, you can buy or sell
        practically anything.
      </p>

      <div className={styles.footer_info_container}>
        <div className={styles.info_block}>
          <a>Mobile applications</a>
          <a>Help and Feedback</a>
          <a>Paid services</a>
          <a>Sell IT PRO</a>
          <a>Business on Sell IT</a>
          <a>For the press</a>
        </div>
        <div className={styles.info_block}>
          <a>Advertising on the website</a>
          <a>Sell IT blog</a>
          <a>Terms of use</a>
          <a>Privacy Policy</a>
          <a>How to sell and buy?</a>
          <a>Safety rules</a>
        </div>
        <div className={styles.info_block}>
          <a>Site map</a>
          <a>Map of regions</a>
          <a>Sell IT delivery</a>
          <a>Popular requests</a>
          <a>Work at Sell IT</a>
          <a>Sell IT Delivery: rules</a>
        </div>
      </div>
    </footer>
  );
};
