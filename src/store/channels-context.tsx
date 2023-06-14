import { createContext } from "react";
import { Channel } from "../consts/model";

type ChannelsContextValue = {
  channels: Channel[];
  setChannels: (channels: Channel[]) => void;
};

const ChannelsContext = createContext<ChannelsContextValue>(
  {} as ChannelsContextValue
);

export default ChannelsContext;
