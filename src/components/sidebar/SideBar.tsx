import styled from "styled-components";
import { ColorConsts } from "../../consts/colorConsts";
import SideName from "./SideName";
import { Workspace } from "../WorkspaceNameArea";
import { useEffect, useState } from "react";

type Channel = {
  id: string;
  name: string;
  description: string;
  createUserId: string;
  createdAt: string;
  updatedAt: string;
  workspaceId: string;
};

type Props = {
  workspace: Workspace | undefined;
};

const SideBar = (props: Props) => {
  const BACKEND_URL = "http://localhost:8000";
  const [channels, setChannels] = useState<Channel[]>([]);

  // workspace_idからchannelsを取得する
  const fetchChannels = async () => {
    try {
      const res = await fetch(
        BACKEND_URL + `/channels?workspace=${props.workspace?.id}`
      );
      if (!res.ok) {
        throw Error(`failed to fetch channels : ${res.status}`);
      }
      const channels = await res.json();
      setChannels(channels);
      console.log("fetchChannels", channels);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchChannels();
  }, []);

  return (
    <SideBarContainer>
      {props.workspace && (
        <SideNameListContainer>
          <SideNameListSubContainer>
            <SideName name="チャンネル" hover={false} />
            {channels
              ? channels.map((channel) => (
                  <SideName key={channel.id} name={channel.name} hover={true} />
                ))
              : null}
          </SideNameListSubContainer>
          <SideNameListSubContainer>
            <SideName name="DM" hover={false} />
            <SideName name="伊藤博文" hover={true} />
            <SideName name="藤原業平" hover={true} />
          </SideNameListSubContainer>
        </SideNameListContainer>
      )}
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
