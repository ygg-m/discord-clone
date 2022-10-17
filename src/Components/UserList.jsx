import React, { useEffect, useState } from "react";
import { Avatar, useChatContext } from "stream-chat-react";

const ListContainer = ({ children }) => {
  return (
    <div className="user-list__container">
      <div className="user-list__header">
        <p>User</p>
        <p>Invite</p>
      </div>
      {children}
    </div>
  );
};

const UserItem = () => {
  return (
    <div className="user-item__wrapper">
      <div className="user-item__name-wrapper">
        <Avatar />
      </div>
    </div>
  );
};

export const UserList = () => {
  const { client } = useChatContext();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      if (loading) return;

      setLoading(true);

      try {
        const res = await client.queryUsers({ id: { $ne: client.userID } });
      } catch (error) {}
    };
  }, []);

  return <ListContainer>UserList</ListContainer>;
};
