import { notification } from "antd";
import React, { createContext, useContext, useState } from "react";

const NotificationContext = createContext(undefined);

export const NotificationProvider = ({ children }) => {
  const [api, contextHolder] = notification.useNotification({ duration: 3 });
  const [isLoading, setIsLoading] = useState(false);

  const setShowNotification = ({ isShow = false, message, status }) => {
    if (isShow) {
      api[status]({
        message,
        showProgress: true,
        pauseOnHover: false,
      });
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        setShowNotification,
        isLoading,
        setIsLoading,
      }}
    >
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotificationContext must be used within a NotificationProvider"
    );
  }
  return context;
};
