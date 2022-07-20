import "./notifications.css";
import { useSelector, useDispatch } from "react-redux";
import { selectNotifications } from "../../features/notifications/notificationsSlice";
import { removeNotification } from "../../features/notifications/notificationsSlice";
import React, { useRef } from "react";

const Notifications = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(selectNotifications);
  const renders = useRef(1);
  renders.current += 1;
  console.log("notifications renders", renders);

  const isActive = notifications.length > 0;

  return (
    <div className="notifications">
      <div className="gradient"></div>
      <div
        className={`notification ${isActive ? "is-active" : ""}`}
        onAnimationIteration={() => {
          console.log("iteration");
          dispatch(removeNotification());
        }}
      >
        {notifications[0]}
      </div>
    </div>
  );
};

export default Notifications;
