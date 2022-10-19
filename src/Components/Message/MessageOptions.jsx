import React from "react";
import { BiHash as ThreadIcon } from "react-icons/bi";
import { BsThreeDots as ActionsIcon } from "react-icons/bs";
import { RandomEmoji } from "./RandomEmoji";

import { MESSAGE_ACTIONS, showMessageActionsBox } from "stream-chat-react";

import { MessageActions } from "stream-chat-react";

import { useMessageContext } from "stream-chat-react";

export const MessageOptions = () => {
  const displayReplies = true;

  const {
    customMessageActions,
    getMessageActions,
    handleOpenThread,
    initialMessage,
    message,
    onReactionListClick,
    threadList,
  } = useMessageContext("MessageOptions");

  const messageActions = getMessageActions();
  const showActionsBox =
    showMessageActionsBox(messageActions, threadList) || !!customMessageActions;

  const shouldShowReactions =
    messageActions.indexOf(MESSAGE_ACTIONS.react) > -1;
  const shouldShowReplies =
    messageActions.indexOf(MESSAGE_ACTIONS.reply) > -1 &&
    displayReplies &&
    !threadList;

  if (
    !message.type ||
    message.type === "error" ||
    message.type === "system" ||
    message.type === "ephemeral" ||
    message.status === "failed" ||
    message.status === "sending" ||
    initialMessage
  ) {
    return null;
  }

  const rootClassName = `message-options`;

  return (
    <div className={rootClassName} data-testid="message-options">
      {showActionsBox && <MessageActions ActionsIcon={ActionsIcon} />}
      {shouldShowReplies && (
        <button
          aria-label="Open Thread"
          className={`open-thread-button`}
          data-testid="thread-action"
          onClick={handleOpenThread}
        >
          <ThreadIcon className="icon" />
        </button>
      )}
      {shouldShowReactions && (
        <button
          aria-label="Open Reaction Selector"
          className={`open-thread-button`}
          data-testid="message-reaction-action"
          onClick={onReactionListClick}
        >
          <RandomEmoji classname="icon" />
        </button>
      )}
    </div>
  );
};
