import styled from "styled-components";
import Message from "./Message";
import { MessageUser } from "../consts/model";

type Props = {
  messages: MessageUser[];
};

const MessageArea = (props: Props) => {
  console.log("messages", props.messages);
  return (
    <MessageAreaContainer>
      {props.messages?.map((message) => (
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
