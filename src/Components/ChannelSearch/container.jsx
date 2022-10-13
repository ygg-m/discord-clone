import React, { useState } from "react";
import { SearchIcon, useChatContext } from "../index";

export const ChannelSearch = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const getChannels = async () => {
    try {
      // TODO: fetch channels
    } catch (err) {
      setQuery("");
    }
  };

  const onSearch = (e) => {
    e.preventDefault();

    setLoading(true);
    setQuery(e.target.value);
    getChannels(e.target.value);
  };

  return (
    <div className="channel-search__container">
      <div className="channel-search__input__wrapper">
        <div className="channel-search__input__icon">
          <SearchIcon />
        </div>
        <input
          className="channel-search__input__text"
          placeholder="Search"
          type="text"
          value={query}
          onChange={onSearch}
        />
      </div>
    </div>
  );
};
