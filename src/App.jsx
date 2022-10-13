import React from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";

import {
  Auth,
  ChannelContainer,
  ChannelListContainer,
} from "./Components/index";

const apiKey = "yk434yezbbm5";
const client = StreamChat.getInstance(apiKey);

const authToken = false;

export const App = () => {
  if (!authToken) return <Auth />;
  return (
    <div className="app__wrapper">
      <Chat client={client}>
        <ChannelListContainer />
        <ChannelContainer />
      </Chat>
    </div>
  );
};
