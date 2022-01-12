import {
  ChatIcon,
  PencilIcon,
  RefreshIcon,
  TrashIcon,
  FireIcon as FireIconSolid,
  InformationCircleIcon,
} from "@heroicons/react/outline";
import { ShieldCheckIcon, FireIcon } from "@heroicons/react/solid";
import { forwardRef, useContext, useEffect, useState } from "react";
import { Context } from "../Context";
import { db } from "../firebase";

import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import firebase from "firebase";

const Post = forwardRef(({ item }, ref) => {
  const { posts, setPosts, user, userGuest } = useContext(Context);
  const [postLikes, setPostLikes] = useState([]);

  /* react-responsive-modal */
  const [open, setOpen] = useState(false);

  const handleDeletePost = () => {
    db.collection("posts").doc(item.postId).delete();
  };

  useEffect(() => {
    const unsubscribe = db
      .collection("posts")
      .doc(item.postId)
      .collection("postLikes")
      .onSnapshot((snapshot) =>
        setPostLikes(
          snapshot.docs.map((doc) => ({ ...doc.data(), postLikeId: doc.id }))
        )
      );
    return unsubscribe;
  }, []);

  const handleLikePost = () => {
    //Only perform the action if userGuest is offline
    if (userGuest) return;

    //check if user has liked the post or not
    ////user has not liked the post, add. User has liked the post, delete. ->
    ///////// if every item in PostLikes does not contain user.displayName then it hasn't been liked by the current user, thus we add it to postLikes */
    postLikes.every((item) => item.userName !== user.displayName)
      ? db.collection("posts").doc(item.postId).collection("postLikes").add({
          userName: user?.displayName,
          photoURL: user?.photoURL,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
      : /* the user.displayName already exists in one of the postLikes, thus it has been liked by the current user and we therefore delete it */
        db
          .collection("posts")
          .doc(item.postId)
          .collection("postLikes")
          .doc(
            postLikes.find((item) => item.userName === user?.displayName)
              .postLikeId
          )
          .delete();
  };

  const userHasNotLikedPost = () => {
    return postLikes.every((item) => item.userName !== user?.displayName);
  };

  return (
    <div
      /* TEST TEMP id FOR SCROLLING */
      /* id={item.postId} */
      /* END TEST TEMP */
      ref={ref}
      className="flex flex-col w-full pb-4 font-mainFontHelv //hover:bg-grayish border-b border-gray-300"
    >
      <div className="flex w-11/12 flex-grow mt-2.5 ml-1">
        <img
          className="w-8 h-8 ml-5 mt-2 rounded-full object-cover"
          src={item.avatar}
          alt=""
        />
        <div className="flex ml-5 items-center w-full ">
          {/* fullName + shield + userName */}
          <p className="font-bold ">{item.fullName}</p>
          <ShieldCheckIcon className="h-4 w-4 text-blueish " />
          <p className="text-sm  text-gray-400 ">@{item.userName}</p>

          <p className="text-gray-300 cursor-default text-xs ml-auto hidden widthForShowDate:inline ">
            {item.timestamp?.toDate().toLocaleDateString()}
          </p>
          <p className="text-gray-300 cursor-default text-xs ml-1 hidden widthForShowDate:inline  ">
            {item.timestamp?.toDate().toLocaleTimeString().substring(0, 5)}
          </p>
        </div>
      </div>
      <p className="ml-test -mt-1.5 mr-5">{item.postText}</p>
      <img
        className="rounded-lg max-w-xs ml-test mt-3"
        src={item?.postImg}
        alt=""
      />

      <div className="flex items-center ml-test mr-6 mt-5  justify-between">
        <ChatIcon className="postIcon opacity-50 !cursor-default" />
        <PencilIcon className="postIcon opacity-50 !cursor-default" />
        {/*  <RefreshIcon className="postIcon" /> */}
        <TrashIcon
          onClick={handleDeletePost}
          className={`postIcon hover:text-black ${
            user?.displayName !== item.userName && "hidden"
          }`}
        />
        <InformationCircleIcon
          onClick={() => setOpen(true)}
          className="postIcon hover:text-black"
        />

        {/*MODAL TO DISPLAY LIKES */}
        <Modal
          /* center */
          showCloseIcon={false}
          open={open}
          onClose={() => setOpen(false)}
        >
          <div className="flex //bg-blue-500 flex-col space-y-3 items-center px-16">
            <h2 className="font-bold text-lg underline ">Liked by</h2>
            {postLikes.length === 0 && (
              <p className="font-light">no likes yet</p>
            )}

            {postLikes.map((item) => (
              <div
                key={item.postLikeId}
                className="flex w-full items-center //w-40 //bg-red-400"
              >
                <img
                  className="h-8 w-8 rounded-full object-cover"
                  src={item.photoURL}
                  alt=""
                />
                <p className="ml-2 truncate ">{item.userName}</p>
              </div>
            ))}
          </div>
        </Modal>

        {/* div for FireIcon + nr of likes */}
        <div
          onClick={handleLikePost}
          className="flex group items-center space-x-0.5 cursor-pointer"
        >
          <div className="flex  items-center justify-center group-hover:bg-orangeHover w-7 py-1 rounded-full ">
            <FireIcon
              className={`postIcon  ${
                userHasNotLikedPost() ? "text-gray-800" : "text-orange"
              } group-hover:bg-orangeHover group-hover:text-orange `}
            />
          </div>
          <p
            className={`${
              userHasNotLikedPost() ? "text-gray-800" : "text-orange"
            } text-xs font-extralight group-hover:text-orange cursor-pointer ${
              postLikes.length === 0 && "opacity-0"
            }`}
          >
            {postLikes.length}
          </p>
        </div>
      </div>
    </div>
  );
});

export default Post;
