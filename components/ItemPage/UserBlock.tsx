import Image from "next/image";
import { IUser } from "../../store/redux_types";
import styles from "../../styles/itemPage/UserBlock.module.scss";

interface IUserBlock {
  user: IUser;
}

const UserBlock = ({ user }: IUserBlock) => {
  return (
    <div className={styles.user_block}>
      <b>USER</b>
      {/* <Image src={image} objectFit="cover" layout="fill" /> */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <Image
          src={user.image}
          width={"65px"}
          height={"65px"}
          style={{ borderRadius: "50%" }}
          alt={"user image"}
        />
        <h3 style={{ marginLeft: "10px" }}>{user.name}</h3>
      </div>

      <div style={{ display: "flex", gap: "15px" }}>
        <button
          style={{
            backgroundColor: "transparent",
            border: "3px solid black",
            padding: "16px 20px",
            borderRadius: "6px",
            fontWeight: "700",
            fontSize: "1.1rem",
            width: "50%",
          }}
        >
          Show number
        </button>
        <button
          style={{
            backgroundColor: "#2c78c8",
            padding: "16px 20px",
            borderRadius: "6px",
            fontWeight: "700",
            fontSize: "1.1rem",
            width: "50%",
          }}
        >
          Message
        </button>
      </div>
    </div>
  );
};

export default UserBlock;
