import styled from "styled-components";
import { ColorConsts } from "../consts/colorConsts";
import { FontConsts } from "../consts/fontConsts";

type Props = {
  message: string;
  username: string;
};

const Message = (props: Props) => {
  return (
    <MessageContainer>
      <MessageMetaContainer>
        <MessageUserName>{props.username}</MessageUserName>
        <MessageTimestampContainer>
          <MessageTimestamp>{new Date().toLocaleTimeString()}</MessageTimestamp>
        </MessageTimestampContainer>
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
  font-weight: ${FontConsts.FontWeight.bold};
  font-size: ${FontConsts.FontSize.message};
  padding-left: 10px;
`;

// messageの中で表示するメッセージの時間
const MessageTimestampContainer = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const MessageTimestamp = styled.div`
  font-weight: ${FontConsts.FontWeight.basic};
  font-size: ${FontConsts.FontSize.small};
  padding-bottom: 2px;
  color: ${ColorConsts.ColorTheme.black} 0.7;
`;

const MessageTextContainer = styled.div`
  padding: 0px 10px;
  font-size: ${FontConsts.FontSize.message};
  font-weight: ${FontConsts.FontWeight.basic};
`;
