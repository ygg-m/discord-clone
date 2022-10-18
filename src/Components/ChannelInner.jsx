import React, { useState } from "react";
import {
  Avatar,
  Channel,
  ChannelList,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  useChannelActionContext,
  useChannelStateContext,
  useChatContext,
  VirtualizedMessageList,
  Window,
} from "stream-chat-react";

import { CustomMessage } from "./CustomMessage";

import { AiOutlineEdit } from "react-icons/ai";

export const GiphyContext = React.createContext({});

export const ChannelInner = ({ setIsEditing }) => {
  const [giphyState, setGiphyState] = useState(false);
  const { sendMessage } = useChannelActionContext();
  const { messages } = useChannelStateContext();
  const { client } = useChatContext();

  const overrideSubmitHandler = (message) => {
    let updatedMessage = {
      attachments: message.attachments,
      mentioned_users: message.mentioned_users,
      parent_id: message.parent?.id,
      parent: message.parent,
      text: message.text,
    };

    if (giphyState) {
      updatedMessage = { ...updatedMessage, text: `/giphy ${message.text}` };
    }

    if (sendMessage) {
      sendMessage(updatedMessage);
      setGiphyState(false);
    }
  };

  return (
    <GiphyContext.Provider value={{ giphyState, setGiphyState }}>
      <div style={{ display: "flex", width: "100%" }}>
        <Window>
          <TeamChannelHeader setIsEditing={setIsEditing} />
          <MessageList Message={CustomMessage} />
          <MessageInput overrideSubmitHandler={overrideSubmitHandler} />
        </Window>
        <Thread />
      </div>
    </GiphyContext.Provider>
  );
};

const TeamChannelHeader = ({ setIsEditing }) => {
  const { channel, watcher_count } = useChannelStateContext();
  const { client } = useChatContext();

  const getWatcherText = (watchers) => {
    if (!watchers) return "No users online";
    if (watchers === 1) return "1 user online";
    return `${watchers} users online`;
  };

  const MessagingHeader = () => {
    const members = Object.values(channel.state.members).filter(
      ({ user }) => user.id !== client.userID
    );
    const additionalMembers = members.length - 3;

    if (channel.type === "messaging") {
      return (
        <div className="team-channel-header__name-wrapper">
          {members.map(({ user }, i) => (
            <div key={i} className="team-channel-header__name-multi">
              <Avatar
                image={user.image}
                name={user.email || user.id}
                size={32}
              />
              <p className="team-channel-header__name user">
                {user.email || user.id}
              </p>
            </div>
          ))}

          {additionalMembers > 0 && (
            <p className="team-channel-header__name user">
              and {additionalMembers} more
            </p>
          )}
        </div>
      );
    }

    return (
      <div className="team-channel-header__channel-wrapper">
        <p className="team-channel-header__name">
          <span className="team-channel-header__name__tag">#</span>{" "}
          {channel.data.name}
          <span className="team-channel-header__right-text">
            {getWatcherText(watcher_count)}
          </span>
        </p>
        <div
          className="team-channel-header__name__edit"
          onClick={() => setIsEditing(true)}
        >
          <AiOutlineEdit />
        </div>
      </div>
    );
  };

  return (
    <div className="team-channel-header__container">
      <MessagingHeader />
      <div className="team-channel-header__right"></div>
    </div>
  );
};
