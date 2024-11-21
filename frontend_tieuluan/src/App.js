import "./App.css";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import AppRouter from "./routers";
import { NotificationProvider } from "./hooks/useNotification";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <NotificationProvider>
      <Provider store={store}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </Provider>
    </NotificationProvider>
  );
}

export default App;
