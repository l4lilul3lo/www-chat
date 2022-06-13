import "./App.css";
import Nav from "./components/nav/Nav";
import Main from "./components/main/Main";
import { Navigate } from "react-router-dom";

import { useQuery } from "react-query";
function App() {
  async function checkAuth() {
    try {
      const response = await fetch("user/checkAuth");
      const data = await response.json();
      console.log("data", data);
      return data;
    } catch (err) {
      console.log("error has occured");
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
        <Nav />
        <Main />
      </div>
    );
  } else {
    return <Navigate to="/login" />;
  }
}

export default App;
