import { useContext, useEffect, useState } from "react";
import Notification from "../components/Notification";
import { Context } from "../Context";
import { db } from "../firebase";

function notifications() {
  const { user } = useContext(Context);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("users")
      .doc(user.uid)
      .collection("notifications")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setNotifications(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            notificationId: doc.id,
          }))
        )
      );
    return unsubscribe;
  }, []);

  return (
    <div className="w-full flex flex-col border-l border-r border-grayish">
      <p className="text-2xl font-bold  mt-3 pb-2 text-center  border-b border-grayish">
        Notifications
      </p>
      {notifications.map((item) => (
        <Notification
          key={item.notificationId}
          id={item.notificationId}
          avatar={item.avatar}
          message={item.message}
          text={item.text}
          timestamp={item.timestamp}
          typeLocation={item.typeLocation}
          hasSeen={item.hasSeen}
          setNotifications={setNotifications}
          notifications={notifications}
          notification={item}
          idToScrollTo={item.idToScrollTo}
        />
      ))}
    </div>
  );
}

export default notifications;
