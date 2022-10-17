import React from "react";
import { Channel, MessageSimple, useChatContext } from "stream-chat-react";
import {
  ChannelInner,
  CreateChannel,
  EditChannel,
  GroupMessage,
} from "./index";

export const ChannelContainer = ({
  isCreating,
  setIsCreating,
  isEditing,
  setIsEditing,
  createType,
}) => {
  const { channel } = useChatContext();

  if (isCreating) {
    return (
      <div className="channel__container">
        <CreateChannel
          createType={createType}
          setIsCreating={setIsCreating}
          setIsEditing={setIsEditing}
        />
      </div>
    );
  }
  if (isEditing) {
    return (
      <div className="channel__container">
        <EditChannel setIsEditing={setIsEditing} />
      </div>
    );
  }

  const EmptyState = () => (
    <div className="channel-empty__container">
      <p className="channel-empty__first">
        This is the beginning of your chat history.
      </p>
      <p className="channel-empty__second">
        Send messages, attachments, links, emojis and more!
      </p>
    </div>
  );

  return (
    <div className="channel__container">
      <Channel
        EmptyStateIndicator={EmptyState}
        // Message={(messageProps, i) => (
        //   <GroupMessage key={i} {...messageProps} />
        //    <MessageTeam key={i} {...messageProps} />
        // )}
        Message={MessageSimple}
      >
        {/* <MessageList /> */}
        <ChannelInner setIsEditing={setIsEditing} />
      </Channel>
    </div>
  );
};
