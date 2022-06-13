import React, { useContext } from "react";
import useSocket from "../hooks/useSocket";
const SocketContext = React.createContext();

export function SocketProvider({ children }) {
  const socket = useSocket();

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

export default SocketContext;
