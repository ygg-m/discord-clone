import React from "react";
import Cookies from "universal-cookie";
import {
  ChannelList,
  ChannelSearch,
  ChatBubbleIcon,
  GroupChannelList,
  GroupChannelPreview,
  LogoutIcon,
  useChatContext,
} from "../index";

const SideBar = () => {
  return (
    <div className="channel-list__sidebar">
      <div className="channel-list__sidebar__icon1">
        <div className="icon1__inner">
          <ChatBubbleIcon />
        </div>
      </div>
      <div className="channel-list__sidebar__icon2">
        <div className="icon1__inner">
          <LogoutIcon />
        </div>
      </div>
    </div>
  );
};

const ChannelHeader = () => {
  return (
    <div className="channel-list__header">
      <p className="channel-list__header__text">First Channel</p>
    </div>
  );
};

export const ChannelListContainer = () => {
  return (
    <>
      <SideBar />
      <div className="channel-list_list__wrapper">
        <ChannelHeader />
        <ChannelSearch />
        {/* group messages */}
        <ChannelList
          filters={{}}
          channelRenderFilterFn={() => {}}
          List={(listProps) => <GroupChannelList {...listProps} type="group" />}
          Preview={(previewProps) => {
            <GroupChannelPreview {...previewProps} type="group" />;
          }}
        />
        {/* direct messages */}
        <ChannelList
          filters={{}}
          channelRenderFilterFn={() => {}}
          List={(listProps) => (
            <GroupChannelList {...listProps} type="direct" />
          )}
          Preview={(previewProps) => {
            <GroupChannelPreview {...previewProps} type="direct" />;
          }}
        />
      </div>
    </>
  );
};
