import { signIn } from "next-auth/react";

const Login = () => {
  return (
    <div>
      Login
      <button onClick={() => signIn()}>SIGN IN</button>
    </div>
  );
};

export default Login;
