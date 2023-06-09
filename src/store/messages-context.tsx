import { createContext } from "react";
import { MessageUser } from "../consts/model";

type MessagesContextValue = {
  messages: MessageUser[] | undefined;
  setMessages: (messages: MessageUser[]) => void;
};

const MessagesContext = createContext<MessagesContextValue>(
  {} as MessagesContextValue
);

export default MessagesContext;
