import { useRouter } from "next/router";
import router from "next/router";
import { BellIcon } from "@heroicons/react/outline";
import { useState, useEffect, useContext } from "react";
import { Context } from "../Context";
import { db } from "../firebase";

function SidebarNotificationOption() {
  const { asPath } = useRouter();
  const { user, loadingNotific, setElementIdToScrollTo } = useContext(Context);
  const [notificationsNotChecked, setNotificationsNotChecked] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("users")
      .doc(user.uid)
      .collection("notifications")
      .onSnapshot((snapshot) =>
        setNotificationsNotChecked(
          snapshot.docs.filter((doc) => !doc.data().hasSeen)
        )
      );
    return unsubscribe;
  }, []);

  const handleClick = () => {
    if (loadingNotific) return;
    setElementIdToScrollTo("");
    router.push("/notifications");
  };

  return (
    <div
      onClick={handleClick}
      className={`sidebarBtn group    //TESTtemp for notify-btn: //relative ->create-new-div-below-instead`}
    >
      <div className="relative">
        <BellIcon
          className={`icon ${asPath === "/notifications" && "text-blueish"}`}
        />
        {notificationsNotChecked.length > 0 && (
          <div className="absolute -top-1 right-1 text-xs w-5 h-5 bg-red-500 rounded-full flex items-center justify-center //animate-pulse text-white">
            {notificationsNotChecked.length}
          </div>
        )}
      </div>
      <a
        className={`iconText hidden smallerTest:inline-flex ${
          asPath === "/notifications" && "text-blueish"
        }`}
      >
        Notifications
      </a>
    </div>
  );
}

export default SidebarNotificationOption;
