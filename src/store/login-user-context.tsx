import { createContext } from "react";

type LogInUserValue = {
  logInUserId: string;
  setLogInUserId: (logInUserId: string) => void;
  logInUserName: string;
  setLogInUserName: (logInUserName: string) => void;
};

const LogInUserContext = createContext<LogInUserValue>({} as LogInUserValue);

export default LogInUserContext;
