import axios from "axios";
import { ChangeEvent, useState } from "react";

interface User {
  name: string;
  email: string;
  password: string;
}

const defaultState: User = {
  name: "",
  email: "",
  password: "",
};

const Register = () => {
  const [userInfo, setUserInfo] = useState(defaultState);

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
    try {
      const response = await axios.post(
        "http://localhost:3000/api/signup",
        userInfo
      );
      alert(response.data.message);
    } catch (error: any) {
      alert(error?.response?.data?.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          value={userInfo.name}
          name="name"
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
    </>
  );
};

export default Register;
