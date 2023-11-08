import Head from "next/head";
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
    /* if many notifics...can't see last one. Add mb */
    <div className="w-full  border-l border-r border-grayish  h-screen   mb-16">
      <Head>
        <title>Notifications</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <p className="text-2xl font-bold  py-3 pb-2 pl-3  border-b border-grayish">
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
          isRewardNotification={item.isRewardNotification}
        />
      ))}
    </div>
  );
}

export default notifications;
