import React, { useRef } from "react";
import {
  Attachment,
  Avatar,
  messageHasReactions,
  MessageRepliesCountButton,
  // MessageOptions,
  MessageStatus,
  MessageText,
  MessageTimestamp,
  ReactionSelector,
  SimpleReactionsList,
  useMessageContext,
} from "stream-chat-react";

import { MessageOptions } from "./Message/MessageOptions";

export const CustomMessage = () => {
  const {
    isReactionEnabled,
    message,
    reactionSelectorRef,
    showDetailedReactions,
  } = useMessageContext();

  const messageWrapperRef = useRef(null);

  const hasReactions = messageHasReactions(message);
  const hasAttachments = message.attachments && message.attachments.length > 0;

  return (
    <div className="message-wrapper">
      <Avatar
        size={48}
        className="message-avatar"
        image={message.user?.image}
      />
      <div className="message-wrapper-content">
        <div className="message-header">
          <div className="message-header-name">{message.user?.name}</div>
          <div className="message-header-timestamp">
            <MessageTimestamp />
          </div>
        </div>
        <MessageOptions messageWrapperRef={messageWrapperRef} />

        {showDetailedReactions && isReactionEnabled && (
          <ReactionSelector ref={reactionSelectorRef} />
        )}
        <MessageText />
        <MessageStatus />
        {hasAttachments && <Attachment attachments={message.attachments} />}
        {hasReactions && !showDetailedReactions && isReactionEnabled && (
          <SimpleReactionsList />
        )}
        <MessageRepliesCountButton reply_count={message.reply_count} />
      </div>
    </div>
  );
};
