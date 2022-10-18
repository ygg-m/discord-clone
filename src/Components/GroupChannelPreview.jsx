import React from "react";
import { Avatar, useChatContext } from "./index";

export const GroupChannelPreview = ({ channel, type }) => {
  const { channel: activeChannel, client } = useChatContext();

  const ChannelPreview = () => {
    <p className="channel-preview__item">
      <span className="channel-preview__hashtag">#</span>{" "}
      {channel?.data?.name || channel?.data?.id}
    </p>;
  };

  const DirectPreview = () => {
    const members = Object.values(channel.state.members).filter(
      ({ user }) => user.id !== client.userID
    );

    return (
      <div className="channel-preview__item single">
        <Avatar
          image={members[0]?.user?.image}
          name={members[0]?.user?.email}
          size={24}
        />
        <p>{members[0]?.user?.email}</p>
      </div>
    );
  };
  return (
    <div
      className={
        channel?.id === activeChannel?.id
          ? "channel-preview__wrapper__selected"
          : "channel-preview__wrapper"
      }
      onClick={() => {
        console.log(channel);
      }}
    >
      {type === "group" ? <ChannelPreview /> : <DirectPreview />}
    </div>
  );
};
