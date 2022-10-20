import React, { useMemo } from "react";
import {
  isDate,
  useMessageContext,
  useTranslationContext,
} from "stream-chat-react";

import { getDateString } from "../../i18n/utils";

export const MessageTimestamp = () => {
  const { tDateTimeParser } = useTranslationContext("MessageTimestamp");
  const { formatDate, message } = useMessageContext("MessageTimestamp");

  const messageCreatedAt =
    message.created_at && isDate(message.created_at)
      ? message.created_at.toISOString()
      : message.created_at;

  const when = useMemo(
    () =>
      getDateString({
        formatDate,
        messageCreatedAt,
        tDateTimeParser,
      }),
    [formatDate, tDateTimeParser, messageCreatedAt]
  );

  if (!when) return null;

  return (
    <time
      className="timestamp"
      dateTime={messageCreatedAt}
      title={messageCreatedAt}
    >
      {when}
    </time>
  );
};
