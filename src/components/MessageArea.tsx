import styled from "styled-components";
import Message from "./Message";
import { MessageUser } from "../consts/model";
import MessageForm from "./MessageForm";

type Props = {
  messages: MessageUser[];
};

const MessageArea = (props: Props) => {
  console.log("messages", props.messages);
  return (
    <MessageAreaContainer>
      <div>
        {props.messages?.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
      <MessageForm />
    </MessageAreaContainer>
  );
};

export default MessageArea;

// styled-componentsを使ってSlackのようなメッセージ画面を作成する
// MessageのContainerを作成する
const MessageAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: scroll;
`;
