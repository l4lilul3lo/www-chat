import "./App.css";
import Nav from "./components/nav/Nav";
import Main from "./components/main/Main";
import { Navigate } from "react-router-dom";
import { useQuery } from "react-query";
import { WebSocketProvider } from "./components/socket/WebSocketProvider";

function App() {
  async function checkAuth() {
    try {
      const response = await fetch("users/checkAuth");
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  const { isLoading, error, data } = useQuery("checkAuth", checkAuth, {
    cacheTime: 0,
  });

  if (isLoading) return "Loading...";

  if (error) return "an error has occured";

  if (data.isAuth) {
    return (
      <div className="App">
        <WebSocketProvider>
          <Nav />
          <Main />
        </WebSocketProvider>
      </div>
    );
  } else {
    return <Navigate to="/login" />;
  }
}

export default App;
