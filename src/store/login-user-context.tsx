import { createContext } from "react";

type LogInUserValue = {
  logInUserId: string;
  setLogInUserId: (logInUserId: string) => void;
  logInUsername: string;
  setLogInUsername: (logInUsername: string) => void;
};

const LogInUserContext = createContext<LogInUserValue>({} as LogInUserValue);

export default LogInUserContext;
