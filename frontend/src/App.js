import Nav from "./components/nav/Nav";
import Main from "./components/main/Main";
import { Navigate } from "react-router-dom";
import { useQuery } from "react-query";
import { WebSocketProvider } from "./components/socket/WebSocketProvider";
import { checkAuth } from "./api";
import InitialLoading from "./components/initial_loading/InitialLoading";
import Overlay from "./components/overlay/Overlay";
import React from "react";
import "./App.css";

function App() {
  const { isLoading, error, data } = useQuery("checkAuth", checkAuth, {
    cacheTime: 0,
  });

  if (isLoading) return <InitialLoading />;

  if (error) return "an error has occured";

  if (data.isAuth) {
    return (
      <WebSocketProvider>
        <div className="app">
          <Nav />
          <Main />
          <Overlay />
        </div>
      </WebSocketProvider>
    );
  } else {
    return <Navigate to="/login" />;
  }
}

export default App;
