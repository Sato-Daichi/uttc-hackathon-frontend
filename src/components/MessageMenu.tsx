import styled from "styled-components";
import { ColorConsts } from "../consts/colorConsts";

import React from "react";

const MessageMenu = () => {
  return (
    <MessageMenuContainer>
      <MessageMenuButton>メッセージを編集</MessageMenuButton>
      <MessageMenuButton>メッセージを削除</MessageMenuButton>
    </MessageMenuContainer>
  );
};

export default MessageMenu;

// メッセージのメニューポップアップ
const MessageMenuContainer = styled.div`
  position: relative;
  top: 0;
  right: 0;
  width: 200px;
  z-index: 1;
  background-color: ${ColorConsts.ColorTheme.white};
  border: 1px solid ${ColorConsts.ColorTheme.backgroundBorder};
  border-radius: 5px;
`;

// メッセージのメニューポップアップの中身のボタン
const MessageMenuButton = styled.button`
  width: 100%;
  height: 30px;
  border: none;
  outline: none;
  background-color: ${ColorConsts.ColorTheme.white};
  cursor: pointer;
  :hover {
    background-color: ${ColorConsts.ColorTheme.backgroundHover};
  }
`;
