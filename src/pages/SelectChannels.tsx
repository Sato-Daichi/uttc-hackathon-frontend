import React, { useContext, useEffect, useState } from "react";
import { Channel } from "../consts/model";
import { BACKEND_URL } from "../env";
import {
  Button,
  Container,
  FormContainer,
  PopUpContainer,
  Title,
} from "../components/PopUpForm";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import WorkspaceContext from "../store/workspace-context";

// ユーザ登録直後に表示するページ
// どのチャンネルに参加するかをチェックボックスで選択する
const SelectChannels = () => {
  // workspace_idに紐づくチャンネルを全て取得する
  const { workspaceId } = useContext(WorkspaceContext);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [checkedChannels, setCheckedChannels] = useState<Channel[]>([]);
  const fetchChannels = async () => {
    try {
      const res = await fetch(
        BACKEND_URL + `/channels?workspace=${workspaceId}`
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetChannelId = e.target.value;

    // チェックを外す場合
    if (checkedChannels.some((channel) => channel.id === targetChannelId)) {
      const newCheckedChannels = checkedChannels.filter(
        (channel) => channel.id !== targetChannelId
      );
      setCheckedChannels(newCheckedChannels);
      console.log("newCheckedChannels", newCheckedChannels);
    } else {
      // チェックをつける場合
      const newCheckedChannel = channels.find(
        (channel) => channel.id === targetChannelId
      );
      if (newCheckedChannel) {
        setCheckedChannels([...checkedChannels, newCheckedChannel]);
        console.log("newCheckedChannel", newCheckedChannel);
      } else {
        console.error("failed to find channel");
      }
    }
  };

  const navigate = useNavigate();

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // チェックをつけたチャンネルに参加する
    try {
      const res = await fetch(BACKEND_URL + "/channels/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: localStorage.getItem("logInUserId"),
          channelIds: checkedChannels.map((channel) => channel.id),
        }),
      });
      if (!res.ok) {
        console.error("failed to join channel");
        return;
      }

      // ホームページに遷移
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <PopUpContainer>
        <Title>参加するチャンネルを選択</Title>
        <FormContainer>
          {channels.map((channel) => (
            <ChannelSelectContainer key={channel.id}>
              <CheckBox
                type="checkbox"
                name="channel"
                value={channel.id}
                onChange={handleChange}
              />
              <label key={channel.id}>{channel.name}</label>
            </ChannelSelectContainer>
          ))}
          <Button onClick={onSubmit}>参加する</Button>
        </FormContainer>
      </PopUpContainer>
    </Container>
  );
};

export default SelectChannels;

const ChannelSelectContainer = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
`;

const CheckBox = styled.input`
  width: 20px;
  height: 20px;
  margin-right: 10px;
  cursor: pointer;
`;
