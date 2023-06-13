import styled from "styled-components";
import { ColorConsts } from "../consts/colorConsts";
import { FontConsts } from "../consts/fontConsts";
import { FiDelete } from "react-icons/fi";
import { FiEdit } from "react-icons/fi";
import { useContext, useEffect, useRef, useState } from "react";
import MessagesContext from "../store/messages-context";
import { MessageUser } from "../consts/model";
import { MessageFormButton, MessageFormTextArea } from "./MessageForm";
import { BACKEND_URL } from "../env";
import LogInUserContext from "../store/login-user-context";
import { IconContext } from "react-icons";

type Props = {
  message: MessageUser;
};

const Message = (props: Props) => {
  const { logInUsername, setLogInUsername } = useContext(LogInUserContext);
  console.log("logInUsername", logInUsername);
  const { messages, setMessages } = useContext(MessagesContext);
  const deleteMessage = async (messageId: string) => {
    if (!messages) return;

    // メッセージを削除するAPIを叩く
    try {
      const res = await fetch(
        BACKEND_URL + `/message/delete?message=${messageId}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) {
        throw Error(`failed to delete message : ${res.status}`);
      }
    } catch (err) {
      console.error(err);
      return;
    }

    const newMessages = messages?.filter(
      (message) => message.id !== props.message.id
    );
    setMessages(newMessages);
  };

  const createdAt = new Date(props.message.createdAt);

  //  メッセージの編集機能
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingMessageText, setEditingMessageText] = useState<string>(
    props.message.text
  );
  const [textAreaHeight, setTextAreaHeight] = useState(0);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  // テキストのエリアの高さを自動調整する
  useEffect(() => {
    if (textAreaRef.current) {
      setTextAreaHeight(textAreaRef.current.scrollHeight);
    }
  }, [editingMessageText, isEditing]);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleMessageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setEditingMessageText(event.target.value);
  };

  // テキストをupdateする
  const handleEditSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsEditing(false);

    // メッセージを更新するAPIを叩く
    try {
      fetch(BACKEND_URL + `/message/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*", // CORS回避
        },
        body: JSON.stringify({
          Text: editingMessageText,
          Id: props.message.id,
        }),
      });

      setEditingMessageText("");
      const messageCopy = [...messages!];
      messageCopy.forEach((message) => {
        if (message.id === props.message.id) {
          message.text = editingMessageText;
          message.updatedAt = new Date().toISOString();
        }
      });
      setMessages(messageCopy);
    } catch (err) {
      console.error(err);
      return;
    }
  };

  return isEditing ? (
    // メッセージの編集モード
    <EditMessageForm onSubmit={handleEditSubmit}>
      <MessageFormTextArea
        value={editingMessageText}
        ref={textAreaRef}
        onChange={handleMessageChange}
        style={{ height: textAreaHeight ? `${textAreaHeight}px` : "auto" }}
        rows={1}
      />
      <MessageFormButton type="submit">保存する</MessageFormButton>
    </EditMessageForm>
  ) : (
    <MessageContainer>
      <MessageMetaContainer>
        <MessageMetaSubContainer>
          <MessageUserName>{props.message.userUsername}</MessageUserName>
          <MessageTimestamp>{`${createdAt.getHours()}:${createdAt
            .getMinutes()
            .toString()
            .padStart(2, "0")}`}</MessageTimestamp>
          {props.message.createdAt !== props.message.updatedAt && (
            <IsEditText>編集済み</IsEditText>
          )}
        </MessageMetaSubContainer>
        {props.message.userUsername === logInUsername && (
          <MessageMetaContainer>
            <IconButtonContainer
              onClick={() => deleteMessage(props.message.id)}
            >
              <IconContext.Provider value={{ color: "red", size: "16px" }}>
                <FiDelete />
              </IconContext.Provider>
            </IconButtonContainer>
            <IconButtonContainer onClick={() => handleEditClick()}>
              <IconContext.Provider value={{ color: "green", size: "16px" }}>
                <FiEdit />
              </IconContext.Provider>
            </IconButtonContainer>
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

// 編集済みかどうかを表す
const IsEditText = styled.div`
  margin-left: 10px;
  margin-top: 2px;
  font-weight: ${FontConsts.FontWeight.basic};
  font-size: ${FontConsts.FontSize.small};
  color: ${ColorConsts.ColorTheme.grayText};
`;

// 投稿時間の表示
const MessageTimestamp = styled.div`
  margin-left: 10px;
  margin-top: 3px;
  font-weight: ${FontConsts.FontWeight.basic};
  font-size: ${FontConsts.FontSize.small};
  color: ${ColorConsts.ColorTheme.grayText};
`;

// アイコンボタンのcontainer
const IconButtonContainer = styled.button`
  width: 21px;
  height: 21px;
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  padding: 0px;
`;

const MessageTextContainer = styled.div`
  padding-top: 3px;
  font-size: ${FontConsts.FontSize.message};
  font-weight: ${FontConsts.FontWeight.basic};
  white-space: pre-wrap;
`;

// 編集中のメッセージフォーム
const EditMessageForm = styled.form`
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid #e5e5e5;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  margin: 10px;
`;
