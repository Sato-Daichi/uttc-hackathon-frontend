import React, { useContext, useEffect, useRef, useState } from "react";
import MessagesContext from "../store/messages-context";
import SelectedChannelContext from "../store/selected-channel-context";
import { Channel } from "../consts/model";
import styled from "styled-components";
import { ColorConsts } from "../consts/colorConsts";
import { FontConsts } from "../consts/fontConsts";
import { BACKEND_URL } from "../env";

const MessageForm: React.FC = () => {
  const [messageText, setMessageText] = useState("");
  const { messages, setMessages } = useContext(MessagesContext);
  const { selectedChannel, setSelectedChannel } = useContext(
    SelectedChannelContext
  );

  const fetchMessages = async (selectedChannel: Channel | undefined) => {
    if (selectedChannel) {
      try {
        const res = await fetch(
          BACKEND_URL + `/messages?channel=${selectedChannel.id}`,
          {
            mode: "cors",
          }
        );
        if (!res.ok) {
          throw Error(`failed to fetch messages : ${res.status}`);
        }
        const messages = await res.json();
        setMessages(messages);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const postMessage = async (messageText: string) => {
    if (selectedChannel) {
      try {
        const res = await fetch(BACKEND_URL + `/message/post`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Text: messageText,
            ChannelId: selectedChannel.id,
            UserId: "00000000000000000000000001",
          }),
        });
        if (!res.ok) {
          throw Error(`failed to post message : ${res.status}`);
        }

        // メッセージを再取得する
        try {
          const res = await fetch(
            BACKEND_URL + `/messages?channel=${selectedChannel.id}`,
            {
              mode: "cors",
            }
          );
          if (!res.ok) {
            throw Error(`failed to fetch messages : ${res.status}`);
          }
          const messages = await res.json();
          setMessages(messages);
          setMessageText("");
        } catch (err) {
          console.error(err);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleMessageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMessageText(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (messageText.trim() !== "") {
      // messageを送信する
      postMessage(messageText);
      // messageを取得する
      fetchMessages(selectedChannel);
    }
  };

  const [textAreaHeight, setTextAreaHeight] = useState(0);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (textAreaRef.current) {
      setTextAreaHeight(0); // テキストエリアの高さを初期値に戻す
    }
  }, [messageText]);

  useEffect(() => {
    // 高さが初期値の場合にscrollHeightを高さに設定する
    if (!textAreaHeight && textAreaRef.current) {
      setTextAreaHeight(textAreaRef.current.scrollHeight);
    }
  }, [textAreaHeight]);

  return (
    <MessageFormContainer onSubmit={handleSubmit}>
      <MessageFormTextArea
        value={messageText}
        ref={textAreaRef}
        onChange={handleMessageChange}
        placeholder="メッセージを入力"
        style={{ height: textAreaHeight ? `${textAreaHeight}px` : "auto" }}
        rows={1}
      />
      <MessageFormButton type="submit">送信</MessageFormButton>
    </MessageFormContainer>
  );
};

export default MessageForm;

const MessageFormContainer = styled.form`
  grid-column: 2 / 3;
  grid-row: 4 / 5;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid #e5e5e5;
  /* background: ${ColorConsts.ColorTheme.background}; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  margin: 10px;
`;

export const MessageFormTextArea = styled.textarea`
  /* width: 100%; */
  resize: none;
  outline: none;
  padding: 10px;
  font-size: ${FontConsts.FontSize.message};
  box-sizing: border-box;
  font-family: "Noto Sans JP", sans-serif;
  margin-bottom: 10px;
`;

export const MessageFormButton = styled.button`
  width: 100%;
  height: 35px;
  border: none;
  outline: none;
  background: #f5f5f5;
  border-radius: 5px;
  cursor: pointer;
  :hover {
    background: #e5e5e5;
  }
`;
