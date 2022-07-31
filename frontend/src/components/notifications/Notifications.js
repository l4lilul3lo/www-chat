import "./notifications.css";
import { useSelector, useDispatch } from "react-redux";
import { selectNotifications } from "../../features/notifications/notificationsSlice";
import { removeNotification } from "../../features/notifications/notificationsSlice";
import { useRef } from "react";

const Notifications = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(selectNotifications);

  const isActive = notifications.length > 0;

  return (
    <div className="notifications">
      <div className="gradient"></div>
      <div
        className={`notification ${isActive ? "is-active" : ""}`}
        onAnimationIteration={() => {
          dispatch(removeNotification());
        }}
      >
        {notifications[0]}
      </div>
    </div>
  );
};

export default Notifications;
