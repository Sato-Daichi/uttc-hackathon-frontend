import { createContext } from "react";

type LoginUserValue = {
  loginUser: any;
  setLoginUser: any;
};

const LoginUserContext = createContext<LoginUserValue>({} as LoginUserValue);

export default LoginUserContext;
