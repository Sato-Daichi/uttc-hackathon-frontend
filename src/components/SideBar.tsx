import React from "react";
import styled from "styled-components";
import { ColorConsts } from "../consts/colorConsts";

const SideBar = () => {
  return (
    <SideNameListContainer>
      <SideNameListSubContainer>
        <SideTitleName>チャンネル</SideTitleName>
        <SideName>チャンネル名1</SideName>
        <SideName>チャンネル名2</SideName>
      </SideNameListSubContainer>
      <SideNameListSubContainer>
        <SideTitleName>DM</SideTitleName>
        <SideName>ユーザー1</SideName>
        <SideName>ユーザー2</SideName>
      </SideNameListSubContainer>
    </SideNameListContainer>
  );
};

export default SideBar;

// 左端に表示するサイドバー
// 上部にはChannelsContainerを表示する
// 下部にはDirectMessagesContainerを表示する
const SideNameListContainer = styled.div`
  grid-column: 1 / 2;
  grid-row: 3 / 4;
  display: flex;
  flex-direction: column;
  background: ${ColorConsts.ColorTheme.background};
  padding: 5px;
  border-right: 1px solid ${ColorConsts.ColorTheme.backgroundBorder};
`;

// SideBarContainerの中に表示するチャンネルやDMのContainer
const SideNameListSubContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

//
const SideTitleName = styled.div`
  padding: 8px 20px;
  font-weight: 500;
  font-size: 15px;
  border-radius: 3px;
`;

// チャンネル名やDMの相手の名前を表示する
const SideName = styled(SideTitleName)`
  :hover {
    background: ${ColorConsts.ColorTheme.basic};
    color: ${ColorConsts.ColorTheme.white};
  }
`;
