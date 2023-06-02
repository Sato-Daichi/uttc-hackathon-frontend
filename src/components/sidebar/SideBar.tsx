import React from "react";
import styled from "styled-components";
import { ColorConsts } from "../../consts/colorConsts";
import SideName from "./SideName";

const SideBar = () => {
  return (
    <SideNameListContainer>
      <SideNameListSubContainer>
        <SideName name="チャンネル名" hover={false} />
        <SideName name="チャンネル1" hover={true} />
        <SideName name="チャンネル2" hover={true} />
      </SideNameListSubContainer>
      <SideNameListSubContainer>
        <SideName name="DM" hover={false} />
        <SideName name="伊藤博文" hover={true} />
        <SideName name="藤原業平" hover={true} />
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
  padding: 10px 5px;
  border-right: 1px solid ${ColorConsts.ColorTheme.backgroundBorder};
  overflow-y: scroll;
`;

// SideBarContainerの中に表示するチャンネルやDMのContainer
const SideNameListSubContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
