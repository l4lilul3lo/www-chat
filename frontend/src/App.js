import Nav from "./components/nav/Nav";
import Main from "./components/main/Main";
import { Navigate } from "react-router-dom";
import { useQuery } from "react-query";
import { WebSocketProvider } from "./components/socket/WebSocketProvider";
import { checkAuth } from "./api";
import InitialLoading from "./components/initial_loading/InitialLoading";
import "./App.css";

function App() {
  const { isLoading, error, data } = useQuery("checkAuth", checkAuth, {
    cacheTime: 0,
  });

  if (isLoading) return <InitialLoading />;

  if (error) return "an error has occured";
  console.log("is auth data", data);
  if (data.isAuth) {
    return (
      <WebSocketProvider>
        <div className="app">
          <Nav />
          <Main />
        </div>
      </WebSocketProvider>
    );
  } else {
    return <Navigate to="/login" />;
  }
}

export default App;
