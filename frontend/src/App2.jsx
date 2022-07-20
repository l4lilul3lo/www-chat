import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import Register from "./routes/auth/register";
import Login from "./routes/auth/login";
import { store } from "./store";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App2 = () => {
  return (
    <div id="app2" style={{ width: "100%", height: "100%" }}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </Provider>
    </div>
  );
};

export default App2;
