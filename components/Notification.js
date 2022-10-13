import { XIcon } from "@heroicons/react/outline";
import { Router } from "next/dist/client/router";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { Context } from "../Context";
import { db } from "../firebase";
import Moment from "react-moment";

function Notification({
  avatar,
  message,
  text,
  timestamp,
  id,
  typeLocation,
  hasSeen,
  setNotifications,
  notifications,
  notification,
  idToScrollTo,
  isRewardNotification,
}) {
  const router = useRouter();
  const { user, setElementIdToScrollTo, elementIdToScrollTo } =
    useContext(Context);

  const handleHasSeen = () => {
    db.collection("users")
      .doc(user.uid)
      .collection("notifications")
      .doc(id)
      .set({
        ...notification,
        hasSeen: !notification.hasSeen,
      });
  };

  const handleRedirect = async (e) => {
    /* console.log(e.target.tagName.toLowerCase()); */
    if (e.target.tagName.toLowerCase() === "svg") {
      //console.log("you clicked cross");
      return;
    }
    if (e.target.tagName.toLowerCase() === "path") {
      //console.log("you clicked cross");
      return;
    }
    if (e.target.tagName.toLowerCase() === "span") {
      //console.log("you clicked blueSpan");
      return;
    }

    const editHasSeenToFalse = async () => {
      await db
        .collection("users")
        .doc(user.uid)
        .collection("notifications")
        .doc(id)
        .set({
          ...notification,
          hasSeen: true,
        });
    };
    editHasSeenToFalse();
    setElementIdToScrollTo(idToScrollTo);
    router.push(typeLocation);
  };

  const handleDelete = () => {
    db.collection("users")
      .doc(user.uid)
      .collection("notifications")
      .doc(id)
      .delete();
  };

  return (
    <div
      onClick={(e) => handleRedirect(e)}
      className={`flex items-center xs:mx-auto mx-3   w-notificationWidth pl-6 pr-4 py-3 rounded-xl border border-grayish mt-4 cursor-pointer hover:shadow transform transition duration-100 ease-in  ${
        hasSeen ? "bg-white" : "bg-gray-100"
      }  `}
    >
      <img
        className="h-11 w-11 rounded-full object-cover"
        src={avatar}
        alt=""
      />

      <div className="flex flex-col ml-3 mr-2">
        <h3 className="font-semibold text-sm max-w-notificationHeader   truncate">
          {message}
        </h3>
        <p
          className={`text-xs font-light max-w-notificationText truncate  ${
            hasSeen && isRewardNotification && "line-through text-gray-400 "
          }`}
        >
          {text}
        </p>
        <Moment fromNow className="font-extralight text-verySmall">
          {timestamp.toDate()}
        </Moment>
      </div>

      <span
        onClick={handleHasSeen}
        className={` w-2.5 h-2.5 inline-block rounded-full ml-auto ${
          hasSeen
            ? "bg-gray-300 hover:bg-blue-300"
            : "bg-blueish hover:opacity-75"
        }      `}
      ></span>
      <XIcon
        onClick={handleDelete}
        className="h-4 w-4 ml-2.5 text-gray-400 hover:text-black transform transition duration-100 ease-in cursor-pointer"
      />
    </div>
  );
}

export default Notification;
