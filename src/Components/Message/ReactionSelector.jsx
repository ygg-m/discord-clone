import clsx from "clsx";
import React, {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  useComponentContext,
  useEmojiContext,
  useMessageContext,
} from "stream-chat-react";

import { getStrippedEmojiData } from "../../Data/emojiData.js";

export const ReactionSelector = () => {
  const ref = React.ForwardedRef;
  const { Avatar, isMutableRef } = useComponentContext("ReactionSelector");
  const { Emoji, emojiConfig } = useEmojiContext("ReactionSelector");
  const { handleReaction, message } = useMessageContext("ReactionSelector");

  const {
    defaultMinimalEmojis,
    emojiData: fullEmojiData,
    emojiSetDef,
  } = emojiConfig || {};

  const latestReactions = message?.latest_reactions || [];
  const ownReactions = message?.own_reactions || [];
  const reactionCounts = message?.reaction_counts || {};
  const reactionOptions = defaultMinimalEmojis;

  const emojiData = useMemo(
    () => getStrippedEmojiData(fullEmojiData),
    [fullEmojiData]
  );

  const [tooltipReactionType, setTooltipReactionType] = useState(null);
  const [tooltipPositions, setTooltipPositions] = useState(null);

  const targetRef = useRef(null);
  const tooltipRef = useRef(null);

  const showTooltip = useCallback(
    (event: React.MouseEvent, reactionType: string) => {
      targetRef.current = event.currentTarget;
      setTooltipReactionType(reactionType);
    },
    []
  );

  const hideTooltip = useCallback(() => {
    setTooltipReactionType(null);
    setTooltipPositions(null);
  }, []);

  useEffect(() => {
    if (tooltipRef.current) {
      const tooltip = tooltipRef.current?.getBoundingClientRect();
      const target = targetRef.current?.getBoundingClientRect();

      const container = isMutableRef(ref)
        ? ref.current?.getBoundingClientRect()
        : null;

      if (!tooltip || !target || !container) return;

      const tooltipPosition =
        tooltip.width === container.width || tooltip.x < container.x
          ? 0
          : target.left + target.width / 2 - container.left - tooltip.width / 2;

      const arrowPosition =
        target.x - tooltip.x + target.width / 2 - tooltipPosition;

      setTooltipPositions({ arrow: arrowPosition, tooltip: tooltipPosition });
    }
  }, [tooltipReactionType, ref]);

  const getUsersPerReactionType = () =>
    latestReactions
      .map((reaction) => {
        if (reaction.type === "string") {
          return reaction.user?.name || reaction.user?.id;
        } else return null;
      })
      .filter(Boolean);

  const iHaveReactedWithReaction = () =>
    ownReactions.find((reaction) => reaction.type === "string");

  const getLatestUserForReactionType = (type: string | null) =>
    latestReactions.find(
      (reaction) => reaction.type === "string" && !!reaction.user
    )?.user || undefined;

  return (
    <div className="reaction-selector" ref={ref}>
      {!!tooltipReactionType && (
        <div
          className="tooltip"
          ref={tooltipRef}
          style={{
            left: tooltipPositions?.tooltip,
            visibility: tooltipPositions ? "visible" : "hidden",
          }}
        >
          <div className="arrow" style={{ left: tooltipPositions?.arrow }} />
          {getUsersPerReactionType(tooltipReactionType)?.map(
            (user, i, users) => (
              <span className="latest-user-username" key={`key-${i}-${user}`}>
                {`${user}${i < users.length - 1 ? "," : ""}`}
              </span>
            )
          )}
        </div>
      )}
      <ul className="reactions-list">
        {reactionOptions.map((reactionOption) => {
          const latestUser = getLatestUserForReactionType(reactionOption.id);
          const count = reactionCounts && reactionCounts[reactionOption.id];
          return (
            <li key={`item-${reactionOption.id}`}>
              <button
                aria-label={`Select Reaction: ${reactionOption.name}`}
                className={
                  (clsx("reaction-item"),
                  {
                    "reaction-item-selected": iHaveReactedWithReaction(
                      reactionOption.id
                    ),
                  })
                }
                data-text={reactionOption.id}
                onClick={(event) => handleReaction(reactionOption.id, event)}
              >
                {!!count && (
                  <div
                    className="latest-user"
                    onClick={hideTooltip}
                    onMouseEnter={(e) => showTooltip(e, reactionOption.id)}
                    onMouseLeave={hideTooltip}
                  >
                    {latestUser ? (
                      <Avatar
                        image={latestUser.image}
                        name={latestUser.name}
                        size={20}
                        user={latestUser}
                      />
                    ) : (
                      <div className="latest-user-not-found" />
                    )}
                  </div>
                )}
                {
                  <Suspense fallback={null}>
                    <span className="reaction-emoji">
                      {/* <Emoji
                        data={emojiData}
                        emoji={reactionOption}
                        size={20}
                      /> */}
                    </span>
                  </Suspense>
                }
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
