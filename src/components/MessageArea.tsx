import styled from "styled-components";
import Message from "./Message";
import { useEffect, useState } from "react";

type MessageUser = {
  id: string;
  text: string;
  channelId: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  userUsername: string;
  userPassword: string;
  userEmail: string;
  userCreatedAt: string;
  userUpdatedAt: string;
};

const MessageArea = () => {
  const BACKEND_URL = "http://localhost:8000";
  const [messages, setMessages] = useState<MessageUser[]>([]);

  // バックエンドサーバーからメッセージを取得する
  const fetchMessages = async () => {
    try {
      const res = await fetch(
        BACKEND_URL + "/messages?channel=00000000000000000000000001"
      );
      if (!res.ok) {
        throw Error(`failed to fetch messages : ${res.status}`);
      }

      const messages = await res.json();
      setMessages(messages);
      console.log("messages", messages);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <MessageAreaContainer>
      {messages.map((message) => (
        <Message
          key={message.id}
          message={message.text}
          username={message.userUsername}
          createdAt={new Date(message.createdAt)}
        />
      ))}
    </MessageAreaContainer>
  );
};

export default MessageArea;

// styled-componentsを使ってSlackのようなメッセージ画面を作成する
// MessageのContainerを作成する
const MessageAreaContainer = styled.div`
  grid-column: 2 / 3;
  grid-row: 3 / 4;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;
