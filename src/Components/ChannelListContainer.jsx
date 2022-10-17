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
} from "./index";

const cookies = new Cookies();

const SideBar = ({ logout }) => {
  return (
    <div className="channel-list__sidebar">
      <div className="channel-list__sidebar__icon">
        <ChatBubbleIcon />
      </div>
      <div className="channel-list__sidebar__icon">
        <LogoutIcon onClick={logout} />
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

export const ChannelListContainer = ({
  isCreating,
  setIsCreating,
  setCreateType,
  setIsEditing,
}) => {
  const logout = () => {
    cookies.remove("token");
    cookies.remove("userID");
    cookies.remove("username");
    cookies.remove("email");
    cookies.remove("avatarURL");
    cookies.remove("hashedPassword");

    window.location.reload();
  };
  return (
    <>
      <SideBar logout={logout} />
      <div className="channel-list_list__wrapper">
        <ChannelHeader />
        <ChannelSearch />
        {/* group messages */}
        <ChannelList
          filters={{}}
          channelRenderFilterFn={() => {}}
          List={(listProps) => (
            <GroupChannelList
              {...listProps}
              type="group"
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
            />
          )}
          Preview={(previewProps) => {
            <GroupChannelPreview {...previewProps} type="group" />;
          }}
        />
        {/* direct messages */}
        <ChannelList
          filters={{}}
          channelRenderFilterFn={() => {}}
          List={(listProps) => (
            <GroupChannelList
              {...listProps}
              type="direct"
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
            />
          )}
          Preview={(previewProps) => {
            <GroupChannelPreview {...previewProps} type="direct" />;
          }}
        />
      </div>
    </>
  );
};
