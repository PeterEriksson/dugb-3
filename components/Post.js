import {
  ChatIcon,
  PencilIcon,
  RefreshIcon,
  TrashIcon,
  FireIcon as FireIconSolid,
  InformationCircleIcon,
  SwitchHorizontalIcon,
} from "@heroicons/react/outline";
import { ShieldCheckIcon, FireIcon } from "@heroicons/react/solid";
import { forwardRef, useContext, useEffect, useRef, useState } from "react";
import { Context } from "../Context";
import { db } from "../firebase";

import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import firebase from "firebase";

import styles from "../styles/effects.module.css";
/* OBSERVER */
import { InView } from "react-intersection-observer";
import Moment from "react-moment";
import PostComment from "./PostComment";

const Post = forwardRef(({ item }, ref) => {
  const {
    posts,
    setPosts,
    user,
    userGuest,

    elementIdToScrollTo,

    /* OBSERVER  */
    loadingNotific,
    myNotificElementRef,
    myNotificElementIsVisible,

    /* fetch users */
    users,
  } = useContext(Context);
  const [postLikes, setPostLikes] = useState([]);

  /* Comments */
  /* variable for max amount of comment characters, ought to be a bit shorter then post-max-length(200) */
  const commentMaxLength = 120;
  const [commentBoxVisible, setCommentBoxVisible] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState([]);
  const commentInputRef = useRef(null);
  //timeout..fcn

  /* react-responsive-modal */
  const [open, setOpen] = useState(false);

  /* fire effect when liking post (only triggered when user clicked like/fire. Not triggered when opening home page) */
  const [triggerLikeEffect, setTriggerLikeEffect] = useState(false);

  const handleDeletePost = () => {
    db.collection("posts").doc(item.postId).delete();
  };

  useEffect(() => {
    const unsubscribe = db
      .collection("posts")
      .doc(item.postId)
      .collection("comments")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setComments(
          snapshot.docs.map((doc) => ({ ...doc.data(), commentId: doc.id }))
        )
      );
    return unsubscribe;
  }, []);

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

    /* can remove, but after testing noticed it avoids effect delay */
    setTriggerLikeEffect(true);

    //check if user has liked the post or not
    ////user has not liked the post, add. User has liked the post, delete. ->
    ///////// if every item in PostLikes does not contain user.displayName then it hasn't been liked by the current user, thus we add it to postLikes */
    postLikes.every((item) => item.userName !== user.displayName)
      ? db
          .collection("posts")
          .doc(item.postId)
          .collection("postLikes")
          .add({
            userName: user?.displayName,
            photoURL: user?.photoURL,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          })
          .then(() => setTriggerLikeEffect(true))
      : /* the user.displayName already exists in one of the postLikes, thus it has been liked by the current user and we therefore delete it */
        db
          .collection("posts")
          .doc(item.postId)
          .collection("postLikes")
          .doc(
            postLikes.find((item) => item.userName === user?.displayName)
              .postLikeId
          )
          .delete()
          .then(() => setTriggerLikeEffect(false));
  };

  const userHasNotLikedPost = () => {
    return postLikes.every((item) => item.userName !== user?.displayName);
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (commentInput > commentMaxLength) return;
    const newCommentObj = {
      commentText: commentInput,
      userName: user?.displayName,
      fullName: users.find((item) => item.displayName === user?.displayName)
        .fullName,
      avatar: user?.photoURL,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };

    db.collection("posts")
      .doc(item.postId)
      .collection("comments")
      .add(newCommentObj);

    setCommentInput("");
    setCommentBoxVisible(false);
  };

  const handleOnChatIconClick = () => {
    /* for the input to be focused after we click chatIcon -> we need to do a setTimeout */
    setTimeout(() => {
      setCommentBoxVisible((prev) => !prev);
      commentInputRef?.current?.focus();
    }, 50);
  };

  return (
    <div
      id={item.postId}
      ref={ref}
      className={`flex flex-col w-full pb-3.5 font-mainFontHelv border-b border-gray-300  `}
    >
      {/*MODAL TO DISPLAY LIKES */}
      <Modal
        /* center */
        showCloseIcon={false}
        open={open}
        onClose={() => setOpen(false)}
      >
        <div className="flex //bg-blue-500 flex-col space-y-3 items-center px-16">
          <h2 className="font-bold text-lg underline ">Liked by</h2>
          {postLikes.length === 0 && <p className="font-light">no likes yet</p>}

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

      <InView triggerOnce>
        {({
          inView: myNotificElementIsVisible,
          ref: myNotificElementRef,
          entry,
        }) => (
          <div
            ref={myNotificElementRef}
            className={` ${
              myNotificElementIsVisible &&
              elementIdToScrollTo == item.postId &&
              !loadingNotific &&
              styles.animateHighlight
            }          `}
          >
            <div className="flex w-11/12 flex-grow mt-2.5 ml-1 ">
              <img
                className="w-8 h-8 ml-5 mt-2 rounded-full object-cover"
                src={item.avatar}
                alt=""
              />
              <div className="flex /ml-5 ml-3 items-center w-full ">
                {/* fullName + shield + userName */}
                <p className="font-bold ">{item.fullName}</p>
                <ShieldCheckIcon className="h-4 w-4 text-blueish " />
                <p className="text-sm  text-gray-400 ">@{item.userName}</p>

                <p className="text-gray-300 cursor-default text-xs ml-auto hidden widthForShowDate:inline ">
                  {item.timestamp?.toDate().toLocaleDateString()}
                </p>
                <p className="text-gray-300 cursor-default text-xs ml-1 hidden widthForShowDate:inline  ">
                  {item.timestamp
                    ?.toDate()
                    .toLocaleTimeString()
                    .substring(0, 5)}
                </p>
              </div>
            </div>
            <p className=" -mt-1.5 mr-5 ml-test ">{item.postText}</p>
            <img
              className="rounded-lg max-w-xs ml-test mt-3"
              src={item?.postImg}
              alt=""
            />
            {/* DIV FOR ICONS ON BOTTOM OF (main)POST */}
            <div className="flex items-center mt-5 justify-between      /ml-test /mr-6  w-5/6 mx-auto pb-2 ">
              <div
                onClick={handleOnChatIconClick}
                className="flex items-center space-x-1.5 cursor-pointer  transform transition duration-100 ease-in hover:scale-110"
              >
                <ChatIcon className="postIcon " />
                <p className="text-sm opacity-70  ">
                  {comments.length > 0 && comments.length}
                </p>
              </div>
              {/* <PencilIcon className="postIcon opacity-50 !cursor-default" /> */}
              <SwitchHorizontalIcon className="postIcon opacity-50 !cursor-default" />
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

              {/* div for FireIcon + nr of likes */}
              <div
                onClick={handleLikePost}
                className={` flex group items-center space-x-0.5 cursor-pointer`}
              >
                <div className="flex  items-center justify-center group-hover:bg-orangeHover w-7 py-1 rounded-full ">
                  <FireIcon
                    className={`postIcon

                    ${userHasNotLikedPost() ? "text-gray-800" : "text-orange"}
                    ${
                      !userHasNotLikedPost() &&
                      triggerLikeEffect &&
                      styles.animateFireIcon
                    }
                    
                       group-hover:bg-orangeHover group-hover:text-orange `}
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

            {/* COMMENT BOX LOGIC */}
            {/* Have a smooth effect when clicking chatIcon...-> insert another div with className relative -> make use of absolute positioning below in form tag. Comment out {commentBoxVisible && (... css effects in form tag...  */}
            <div className="relative">
              {/* {commentBoxVisible && ( */}
              <form
                onSubmit={handleSubmitComment}
                className={`mt-2 flex space-x-2 w-10/12 mx-auto    ->smoothCommentTransition-> ${
                  commentBoxVisible
                    ? "scale-y-100 origin-top transform transition duration-500 ease-out "
                    : "scale-y-0 absolute   "
                }  `}
              >
                <input
                  ref={commentInputRef}
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  className="flex-1 text-sm rounded-lg bg-gray-100 p-2 border-gray-300  focus:border-gray-400 focus:ring-0"
                  type="text"
                  placeholder="Write a comment"
                />
                <button
                  type="submit"
                  disabled={
                    !commentInput.trim() ||
                    commentInput.length > commentMaxLength
                  }
                  className={`text-blueish text-sm ${
                    commentInput.trim() && "hover:opacity-70"
                  }    disabled:text-gray-300 ${
                    !commentInput.trim() && "cursor-default"
                  } ${
                    commentInput.length > commentMaxLength &&
                    "cursor-default !text-red-400 hover:!opacity-100"
                  } `}
                >
                  Submit
                </button>
              </form>
              {/* )} */}
            </div>
            {/* --- */}
          </div>
        )}
      </InView>

      {/* COMMENT SECTION */}
      {/* Blue line that is connecting comments -> for future builds dont need to do absolute positioning. (look at swtv comments, img + line wrapped in div, name plus text wrapped in div) */}
      {comments?.length > 0 && (
        <section className="flex w-5/6 mx-auto  ">
          <div className="my-2 /mt-2.5 max-h-44 space-y-5 overflow-y-scroll border-t w-full border-gray-100 py-4 px-5  ">
            {comments.map((comment, i) => (
              <PostComment
                key={comment.commentId}
                commentText={comment.commentText}
                avatar={comment.avatar}
                fullName={comment.fullName}
                userName={comment.userName}
                timestamp={comment.timestamp}
                commentId={comment.commentId}
                comments={comments}
                i={i}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
});

export default Post;
