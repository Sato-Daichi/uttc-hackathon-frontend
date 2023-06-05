import styled from "styled-components";
import { ColorConsts } from "../consts/colorConsts";
import SideBar from "../components/sidebar/SideBar";
import WorkspaceNameArea, { Workspace } from "../components/WorkspaceNameArea";
import MessageArea from "../components/MessageArea";
import MessageAreaHeader from "../components/MessageAreaHeader";
import { useEffect, useState } from "react";

// grid layoutで画面を5分割
const Home = () => {
  const user_id = "00000000000000000000000001";
  const BACKEND_URL = "http://localhost:8000";
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);

  // user_idからworkspaceを取得する
  const fetchWorkspaces = async () => {
    try {
      const res = await fetch(BACKEND_URL + `/workspaces?user=${user_id}`);
      if (!res.ok) {
        throw Error(`failed to fetch workspaces : ${res.status}`);
      }
      const workspaces = await res.json();
      setWorkspaces(workspaces);
      console.log("workspaces", workspaces);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  return (
    <Container>
      <SearchBarContainer />
      <WorkspaceNameArea workspace={workspaces[0]} />
      <SideBar workspace={workspaces[0]} />
      <MessageAreaHeader channelName="チャンネル名" />
      <MessageArea />
    </Container>
  );
};

export default Home;

// 画面全体のcontainer
// 上部には検索バーを表示する
// 下部の左側側にはチャンネル名メッセージを表示する
const Container = styled.div`
  display: grid;
  grid-template-columns: 220px 1fr;
  grid-template-rows: 44px 49px 1fr;
  height: 100vh;
`;

// 一番上に表示する検索バーのcontainer
const SearchBarContainer = styled.div`
  grid-column: 1 / 3;
  grid-row: 1 / 2;
  background: ${ColorConsts.ColorTheme.basic};
`;
