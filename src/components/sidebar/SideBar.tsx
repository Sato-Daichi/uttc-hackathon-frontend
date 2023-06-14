import styled from "styled-components";
import { ColorConsts } from "../../consts/colorConsts";
import SideName from "./SideName";
import { Channel } from "../../consts/model";
import CreateChannelButton from "./CreateChannelButton";
import CreateChannelModal from "./CreateChannelModal";
import { useState } from "react";

type Props = {
  channels: Channel[] | undefined;
};

const SideBar = (props: Props) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <SideBarContainer>
      <SideNameListContainer>
        <SideNameListSubContainer>
          <SideName name="チャンネル" hover={false} />
          {props.channels
            ? props.channels.map((channel) => (
                <SideName
                  key={channel.id}
                  name={channel.name}
                  channel={channel}
                  hover={true}
                />
              ))
            : null}
        </SideNameListSubContainer>
        <CreateChannelButton setShowModal={setShowModal} />
        <CreateChannelModal showModal={showModal} setShowModal={setShowModal} />
      </SideNameListContainer>
    </SideBarContainer>
  );
};

export default SideBar;

const SideBarContainer = styled.div`
  grid-column: 1 / 2;
  grid-row: 3 / 4;
  display: flex;
  flex-direction: column;
  background-color: ${ColorConsts.ColorTheme.background};
  border-right: 1px solid ${ColorConsts.ColorTheme.backgroundBorder};
`;

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
  overflow-y: scroll;
  height: calc(100vh - 93px); // 93pxは上部のヘッダーとワークスペース名の高さ
  box-sizing: border-box; // paddingを含めたheightにするため
`;

// SideBarContainerの中に表示するチャンネルやDMのContainer
const SideNameListSubContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
