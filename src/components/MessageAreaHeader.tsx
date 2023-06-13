import styled from "styled-components";
import { ColorConsts } from "../consts/colorConsts";
import { FontConsts } from "../consts/fontConsts";
import { Channel } from "../consts/model";

type Props = {
  selectedChannel: Channel | undefined;
};

const MessageAreaHeader = (props: Props) => {
  console.log("select channel", props.selectedChannel?.name);

  return (
    <MessageAreaHeaderContainer>
      <ChannelName># {props.selectedChannel?.name}</ChannelName>
    </MessageAreaHeaderContainer>
  );
};

export default MessageAreaHeader;

// MessageAreaの上部にチャンネル名を表示する
const MessageAreaHeaderContainer = styled.div`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  padding: 0px 20px;
  font-size: 15px;
  border-bottom: 1px solid ${ColorConsts.ColorTheme.backgroundBorder};
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ChannelName = styled.div`
  font-weight: ${FontConsts.FontWeight.bold};
  font-size: 18px;
`;
