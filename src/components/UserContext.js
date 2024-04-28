// UserContext.js
import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    // Initialize with default values
    Name: "",
    Email: "",
    Gender: "",
    Category: "",
    Program: "",
    Payment: "False",
    Password: "",
    counsellor:"demosmvdu@gmail.com",
    Cname:""
  });

  // Add functions to update user data

  const value = {
    user,
    setUser,
    // Add your functions to update user data here
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
