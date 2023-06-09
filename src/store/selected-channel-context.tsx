import { createContext } from "react";
import { Channel } from "../consts/model";

type SelectedChannelContextValue = {
  selectedChannel: Channel | undefined;
  setSelectedChannel: (channel: Channel) => void;
};

const SelectedChannelContext = createContext<SelectedChannelContextValue>(
  {} as SelectedChannelContextValue
);

export default SelectedChannelContext;
