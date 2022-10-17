import React from "react";
import { PlusIcon } from "./index";

export const GroupChannelList = ({
  children,
  error = false,
  loading,
  type,
  isCreating,
  setIsCreating,
  setCreateType,
  setIsEditing,
}) => {
  if (error) {
    return type === "group" ? (
      <div className="group-channel-list">
        <p className="group-channel-list__message">
          Connection error, please wait a moment and try again.
        </p>
      </div>
    ) : null;
  }

  if (loading) {
    return (
      <div className="group-channel-list">
        <p className="group-channel-list__message">
          {type === "group" ? "Channels" : "Messages"} loading...
        </p>
      </div>
    );
  }

  return (
    <div className="group-channel-list">
      <div className="group-channel-list__header">
        <p className="group-channel-list__header__title">
          {type === "group" ? "Channels" : "Direct Messages"}
        </p>
        <button
          onClick={() => {
            setCreateType(type);
            setIsCreating((prevState) => !prevState);
            setIsEditing(false);
          }}
          type={type === "group" ? "group" : "direct"}
        >
          <PlusIcon />
        </button>
      </div>
      {children}
    </div>
  );
};
