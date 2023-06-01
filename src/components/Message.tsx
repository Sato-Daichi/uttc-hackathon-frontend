import styled from "styled-components";
import { ColorConsts } from "../consts/colorConsts";

type Props = {
  message: string;
  username: string;
};

const Message = (props: Props) => {
  return (
    <MessageContainer>
      <MessageMetaContainer>
        <MessageUserName>{props.username}</MessageUserName>
        <MessageTimestamp>{new Date().toLocaleDateString()}</MessageTimestamp>
      </MessageMetaContainer>
      <MessageTextContainer>{props.message}</MessageTextContainer>
    </MessageContainer>
  );
};

export default Message;

// MessageContainerの中に表示するメッセージ
const MessageContainer = styled.div`
  padding: 10px 20px;
  :hover {
    background: ${ColorConsts.ColorTheme.backgroundHover};
  }
`;

const MessageMetaContainer = styled.div`
  display: flex;
`;

// messageの中で表示するユーザー名
const MessageUserName = styled.div`
  font-weight: 800;
  font-size: 15px;
`;

// messageの中で表示するメッセージの時間
const MessageTimestamp = styled.div`
  font-weight: 300;
  font-size: 10px;
`;

const MessageTextContainer = styled.div`
  padding: 10px;
`;
