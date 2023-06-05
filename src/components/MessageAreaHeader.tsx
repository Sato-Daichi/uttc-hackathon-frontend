import styled from "styled-components";
import { ColorConsts } from "../consts/colorConsts";
import { FontConsts } from "../consts/fontConsts";

type Props = {
  channelName: string;
};

const MessageAreaHeader = (props: Props) => {
  return (
    <MessageAreaHeaderContainer>
      <ChannelName>{props.channelName}</ChannelName>
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
