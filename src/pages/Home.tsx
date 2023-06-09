import styled from "styled-components";
import SideBar from "../components/sidebar/SideBar";
import WorkspaceNameArea from "../components/WorkspaceNameArea";
import MessageArea from "../components/MessageArea";
import MessageAreaHeader from "../components/MessageAreaHeader";
import { useEffect, useState } from "react";
import { Channel, MessageUser } from "../consts/model";
import Header from "../components/Header";
import SelectedChannelContext from "../store/selected-channel-context";
import ChannelsContext from "../store/messages-context";

// grid layoutで画面を5分割
const Home = () => {
  // const user_id = "00000000000000000000000001";
  const BACKEND_URL = "http://localhost:8000";
  const workspace_id = "00000000000000000000000001";

  const [channels, setChannels] = useState<Channel[]>([]);
  const [selectedChannel, setSelectedChannel] = useState<Channel | undefined>(
    undefined
  );
  const [messages, setMessages] = useState<MessageUser[]>([]);

  // workspace_idとuser_idからchannelsを取得する
  const fetchChannels = async () => {
    try {
      const res = await fetch(
        BACKEND_URL + `/channels?workspace=${workspace_id}`
      );
      if (!res.ok) {
        throw Error(`failed to fetch channels : ${res.status}`);
      }
      const channels = await res.json();
      setChannels(channels);
      console.log("fetchChannels", channels);

      setSelectedChannel(channels[0]);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMessages = async (selectedChannel: Channel | undefined) => {
    if (selectedChannel) {
      try {
        const res = await fetch(
          BACKEND_URL + `/messages?channel=${selectedChannel.id}`
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

  useEffect(() => {
    fetchChannels();
  }, []);

  useEffect(() => {
    fetchMessages(selectedChannel);
  }, [selectedChannel]);

  return (
    <ChannelsContext.Provider value={{ Channels: channels }}>
      <SelectedChannelContext.Provider
        value={{
          selectedChannel: selectedChannel,
          setSelectedChannel: setSelectedChannel,
        }}
      >
        <Container>
          <Header />
          <WorkspaceNameArea />
          <SideBar channels={channels} />
          <MessageAreaHeader selectedChannel={selectedChannel} />
          <MessageArea messages={messages} />
        </Container>
      </SelectedChannelContext.Provider>
    </ChannelsContext.Provider>
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
