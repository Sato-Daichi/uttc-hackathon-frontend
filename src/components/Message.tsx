import styled from "styled-components";
import { ColorConsts } from "../consts/colorConsts";
import { FontConsts } from "../consts/fontConsts";
import deleteIcon from "../assets/delete-icon.png";
import editIcon from "../assets/edit-icon.png";
import { useContext } from "react";
import MessagesContext from "../store/messages-context";
import { MessageUser } from "../consts/model";

type Props = {
  message: MessageUser;
};

const Message = (props: Props) => {
  const { messages, setMessages } = useContext(MessagesContext);
  const deleteMessage = () => {
    if (!messages) return;
    const newMessages = messages?.filter(
      (message) => message.id !== props.message.id
    );
    setMessages(newMessages);
  };

  const createdAt = new Date(props.message.createdAt);

  return (
    <MessageContainer>
      <MessageMetaContainer>
        <MessageMetaSubContainer>
          <MessageUserName>{props.message.userUsername}</MessageUserName>
          <MessageTimestamp>{`${createdAt.getHours()}:${createdAt.getMinutes()}`}</MessageTimestamp>
        </MessageMetaSubContainer>
        {props.message.userUsername === "00000000000000000000000001" && (
          <MessageMetaContainer>
            <IconButton image={deleteIcon} onClick={deleteMessage} />
            <IconButton image={editIcon} />
          </MessageMetaContainer>
        )}
      </MessageMetaContainer>
      <MessageTextContainer>{props.message.text}</MessageTextContainer>
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
  justify-content: space-between;
`;

const MessageMetaSubContainer = styled.div`
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

// 画像からミートボールボタンを作成
// hoverすると背景色が変わる
// ボタンのデフォルトのUIは削除する
// 画像の背景色は透明にする
const IconButton = styled.button<{ image: string }>`
  background-image: url(${(props) => props.image});
  background-size: cover;
  width: 21px;
  height: 21px;
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
`;

const MessageTextContainer = styled.div`
  padding-top: 3px;
  font-size: ${FontConsts.FontSize.message};
  font-weight: ${FontConsts.FontWeight.basic};
`;
