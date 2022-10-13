import React from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import {
  Auth,
  ChannelContainer,
  ChannelListContainer,
} from "./Components/index";

const cookies = new Cookies();

const apiKey = "8vqsc3m3tw4n";
const authToken = cookies.get("token");
const client = StreamChat.getInstance(apiKey);

if (authToken) {
  client.connectUser(
    {
      id: cookies.get("userID"),
      name: cookies.get("username"),
      image: cookies.get("avatarURL"),
      hashedPassword: cookies.get("hashedPassword"),
      fullName: cookies.get("fullName"),
      phoneNumber: cookies.get("phoneNumber"),
    },
    authToken
  );
}

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
