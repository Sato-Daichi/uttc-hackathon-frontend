import React, { useContext } from "react";
import styled from "styled-components";
import { ColorConsts } from "../../consts/colorConsts";
import SelectedChannelContext from "../../store/selected-channel-context";
import { Channel } from "../../consts/model";

type Props = {
  channel?: Channel;
  hover: boolean;
  name: string;
};

const SideName = (props: Props) => {
  let name = props.name;
  if (props.hover) {
    name = "# " + name;
  }

  // ボタンが押されたら、selectedChannelを更新する
  const { selectedChannel, setSelectedChannel } = useContext(
    SelectedChannelContext
  );
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!props.channel) {
      return;
    }
    if (selectedChannel === props.channel) {
      return;
    }

    try {
      setSelectedChannel(props.channel);
    } catch (error) {
      alert("メールアドレスまたはパスワードが間違っています");
    }
  };

  return (
    <SideNameContainer
      hover={props.hover}
      onClick={props.hover ? handleSubmit : null}
    >
      {name}
    </SideNameContainer>
  );
};

export default SideName;

// チャンネル名やDMの相手の名前を表示する
export const SideNameContainer = styled.button<{ hover: boolean; onClick: any }>`
  padding: 0px 20px;
  font-weight: 500;
  font-size: 15px;
  border-radius: 3px;
  height: 28px;
  line-height: 28px;
  ${(props) =>
    props.hover &&
    `:hover {
    background: ${ColorConsts.ColorTheme.basic};
    color: ${ColorConsts.ColorTheme.white};
    cursor: pointer;
  }`}

  /* ボタン特有のUIを削除する */
  border: none;
  background: none;
  outline: none;
  text-align: left;
  text-decoration: none;
`;
