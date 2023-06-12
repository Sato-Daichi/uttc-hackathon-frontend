import { createContext } from "react";

type LogInUserValue = {
  logInUsername: string;
  setLogInUsername: (logInUsername: string) => void;
};

const LogInUserContext = createContext<LogInUserValue>({} as LogInUserValue);

export default LogInUserContext;
