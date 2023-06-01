import styled from "styled-components";
import { ColorConsts } from "../consts/colorConsts";
import SideBar from "../components/SideBar";
import WorkspaceNameArea from "../components/WorkspaceNameArea";
import MessageArea from "../components/MessageArea";
import MessageAreaHeader from "../components/MessageAreaHeader";

// grid layoutで画面を5分割
const Home = () => {
  return (
    <Container>
      <SearchBarContainer />
      <WorkspaceNameArea workspaceName={"UTokyo Tech Club"} />
      <SideBar />
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
  grid-template-columns: 260px 1fr;
  grid-template-rows: 50px 50px 1fr;
  height: 100vh;
`;

// 一番上に表示する検索バーのcontainer
const SearchBarContainer = styled.div`
  grid-column: 1 / 3;
  grid-row: 1 / 2;
  background: ${ColorConsts.ColorTheme.basic};
`;
