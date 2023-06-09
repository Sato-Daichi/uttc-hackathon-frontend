import styled from "styled-components";
import { ColorConsts } from "../../consts/colorConsts";
import SideName from "./SideName";
import { Channel } from "../../consts/model";

type Props = {
  channels: Channel[] | undefined;
};

const SideBar = (props: Props) => {
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
  border-right: 1px solid ${ColorConsts.ColorTheme.backgroundBorder};
  overflow-y: scroll;
`;

// SideBarContainerの中に表示するチャンネルやDMのContainer
const SideNameListSubContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
