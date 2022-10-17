import { createContext, useContext, useState } from "react";

const ApiContext = createContext();

export const useApi = () => {
  return useContext(ApiContext);
};

export const ApiProvider = ({ children }) => {
  const [createType, setCreateType] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const value = {
    createType,
    setCreateType,
    isCreating,
    setIsCreating,
    isEditing,
    setIsEditing,
  };
  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};
