import { createContext } from "react";
import { Channel } from "../consts/model";

type ChannelsContextValue = {
  Channels: Channel[];
};

const ChannelsContext = createContext<ChannelsContextValue>(
  {} as ChannelsContextValue
);

export default ChannelsContext;
