import React, { useEffect, useState } from "react";
import { Alert, Typography } from "antd";
import io from "socket.io-client";

const { Title } = Typography;

export const NotificationScreen = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const socket = io("ws://localhost:8080");

    socket.on("notification", (data) => {
      setNotifications((prevNotifications) => [...prevNotifications, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <Title>Notification Screen</Title>
      {notifications.map((notification, index) => (
        <Alert
          message={notification.title}
          description={notification.content}
          type="success"
          showIcon
          style={{ margin: "10px" }}
        />
      ))}
    </div>
  );
};
