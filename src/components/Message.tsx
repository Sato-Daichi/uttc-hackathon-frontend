import styled from "styled-components";
import { ColorConsts } from "../consts/colorConsts";
import { FontConsts } from "../consts/fontConsts";

type Props = {
  message: string;
  username: string;
  createdAt: Date;
};

const Message = (props: Props) => {
  return (
    <MessageContainer>
      <MessageMetaContainer>
        <MessageUserName>{props.username}</MessageUserName>
        <MessageTimestamp>{`${props.createdAt.getHours()}:${props.createdAt.getMinutes()}`}</MessageTimestamp>
      </MessageMetaContainer>
      <MessageTextContainer>{props.message}</MessageTextContainer>
    </MessageContainer>
  );
};

export default Message;

// MessageContainerの中に表示するメッセージ
const MessageContainer = styled.div`
  padding: 10px 30px;
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
`;

// 投稿時間の表示
const MessageTimestamp = styled.div`
  margin-left: 10px;
  margin-top: 3px;
  font-weight: ${FontConsts.FontWeight.basic};
  font-size: ${FontConsts.FontSize.small};
  color: ${ColorConsts.ColorTheme.black} 0.7;
`;

const MessageTextContainer = styled.div`
  padding-top: 3px;
  font-size: ${FontConsts.FontSize.message};
  font-weight: ${FontConsts.FontWeight.basic};
`;
