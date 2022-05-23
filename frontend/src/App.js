import logo from "./logo.svg";
import "./App.css";
import Nav from "./components/nav/Nav";
import Main from "./components/main/Main";
import { store } from "./store";
import { Provider } from "react-redux";
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Nav />
        <Main />
      </div>
    </Provider>
  );
}

export default App;
