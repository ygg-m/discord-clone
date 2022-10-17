import React, { useState } from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import { ApiProvider } from "./Contexts/ApiContext";

import {
  Auth,
  ChannelContainer,
  ChannelListContainer,
} from "./Components/index";

import { AuthProvider } from "./Contexts/AuthContext";
import "./Styles/index.css";

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
      email: cookies.get("email"),
    },
    authToken
  );
}

export const App = () => {
  const [createType, setCreateType] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // If there's no login token, go to Auth page
  if (!authToken)
    return (
      <AuthProvider>
        <Auth />
      </AuthProvider>
    );

  return (
    <div className="app__wrapper">
      <ApiProvider>
        <Chat client={client}>
          <ChannelListContainer
            isCreating={isCreating}
            setIsCreating={setIsCreating}
            setCreateType={setCreateType}
            setIsEditing={setIsEditing}
          />
          <ChannelContainer
            isCreating={isCreating}
            setIsCreating={setIsCreating}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            createType={createType}
          />
        </Chat>
      </ApiProvider>
    </div>
  );
};
