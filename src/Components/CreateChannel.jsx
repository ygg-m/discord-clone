import React, { useState } from "react";
import { useChatContext } from "stream-chat-react";

import { CloseIcon, UserList } from "./index";

const ChannelNameInput = ({ channelName = "", setChannelName }) => {
  const handleChange = (e) => {
    e.preventDefault();
    setChannelName(e.target.value);
  };
  return (
    <div className="channel-name-input__wrapper">
      <p>Name</p>
      <input
        type="text"
        value={channelName}
        onChange={handleChange}
        placeholder="channel-name"
      />
      <p>Add Members</p>
    </div>
  );
};

export const CreateChannel = ({ createType, setIsCreating, setIsEditing }) => {
  const [channelName, setChannelName] = useState("");
  return (
    <div className="create-channel__container">
      <div className="create-channel__header">
        <p>
          {createType === "group"
            ? "Create a New Channel"
            : "Send a Direct Message"}
        </p>
        <button
          onClick={() => {
            if (setIsCreating) setIsCreating(false);
            if (setIsEditing) setIsEditing(false);
          }}
        >
          <CloseIcon />
        </button>
      </div>
      {createType === "group" && (
        <ChannelNameInput
          channelName={channelName}
          setChannelName={setChannelName}
        />
      )}
      <UserList />
    </div>
  );
};
