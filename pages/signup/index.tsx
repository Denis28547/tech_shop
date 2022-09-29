import axios from "axios";
import type { NextPage } from "next";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";

interface User {
  username: string;
  email: string;
  password: string;
}

const defaultState: User = {
  username: "",
  email: "",
  password: "",
};

const SignUp: NextPage = () => {
  const [userInfo, setUserInfo] = useState(defaultState);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const { name, value } = e.target;

    setUserInfo((prevInfo) => {
      return {
        ...prevInfo,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:3000/api/signup",
      userInfo
    );
    // console.log(response);
    alert(response.data.message);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          value={userInfo.username}
          name="username"
          onChange={(e) => handleChange(e)}
        />
        <label>Email</label>
        <input
          value={userInfo.email}
          name="email"
          type="email"
          onChange={(e) => handleChange(e)}
        />
        <label>Password</label>
        <input
          value={userInfo.password}
          name="password"
          onChange={(e) => handleChange(e)}
        />
        <button type="submit">CONFIRM</button>
      </form>

      <button onClick={() => router.push("/")}>GO HOME</button>
    </>
  );
};

export default SignUp;
