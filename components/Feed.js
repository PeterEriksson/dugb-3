import { useContext, useEffect, useState } from "react";
import { Context } from "../Context";
import Post from "./Post";
import FlipMove from "react-flip-move";
import { db } from "../firebase";
import LoadingSpinnerNotific from "./LoadingSpinnerNotific";

import { useInView } from "react-intersection-observer";

function Feed() {
  const { ref: myNotificElementRef, inView: myNotificElementIsVisible } =
    useInView();
  //make use of FlipMove -> do useEffect instead

  /* New solution: Don't need to read from firebase every time when visiting Home 
  just to be able to make us of FlipMove effect. Implement on lists feed aswell. */
  const {
    posts,
    elementIdToScrollTo,
    setElementIdToScrollTo,
    loadingNotific,
    setLoadingNotific,

    highlightNotification,
    setHighlightNotification,
  } = useContext(Context);
  const [__posts, __setPosts] = useState([]);
  useEffect(() => {
    __setPosts(posts);
  }, [posts]);

  /* if user comes here by clicking on a notification ->  handle auto scrolling down to 
  the correct post.  
  */
  /* useEffect(() => {
    //can do return here instead of nesting? try at list page
    if (elementIdToScrollTo !== "") {
      //future update:avoid bugs in case post is deleted with bad timing ->
      //if(!posts.includes(item => item.postId === elementIdToScrollTo)) return
      //post has been deleted, return
      setLoadingNotific(true);

      setTimeout(() => {
        document.getElementById(elementIdToScrollTo).scrollIntoView({
          behavior: "smooth",
        });
        //TEST TEMP comment out and move it to other timeout
        //setElementIdToScrollTo("");
        setLoadingNotific(false);

        //TEST TEMP...ok but solution not great,can use observer instead for cleaner code ...move away from context
        setHighlightNotification(true);
      }, 1100);

       //TEST TEMP...works but not great solution ...move away from context 
      setTimeout(() => {
        setHighlightNotification(false);
        setElementIdToScrollTo("");
      }, 3400);
    }
  }, []); */
  /* Timer is set to 1.4 seconds, in order to fetch posts before that. Maybe not optimal. 
  This can probably be coaded cleaner with 
  firebase loading hook. ex from slack-build
  const [roomMessages, loading] = useCollection(
    roomId &&
      db
        .collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
  );

  Here firebase v8 is used. Also a bit cleaner than using useEffect. 
  */

  /* observer sol testing */
  /* OK, now experiment with styling...scale again */
  useEffect(() => {
    //post has been deleted, return
    if (!posts.some((item) => item.postId == elementIdToScrollTo)) return;
    //user comes here WITHOUT clicking notification, return
    if (elementIdToScrollTo == "") return;
    //potential bug: user has like notification but the post is deleted.
    //..when clicked, app can't find the id
    //future update:avoid bugs in case post is deleted with bad timing ->
    //if(!posts.includes(item => item.postId === elementIdToScrollTo)) return

    setLoadingNotific(true);

    setTimeout(() => {
      document.getElementById(elementIdToScrollTo).scrollIntoView({
        behavior: "smooth",
      });
      setLoadingNotific(false);
    }, 1100);
  }, []);

  return (
    <div className="flex flex-col  ">
      {loadingNotific && <LoadingSpinnerNotific />}
      <FlipMove>
        {__posts.map((item) => (
          <Post
            item={item}
            key={item.postId}
            myNotificElementRef={myNotificElementRef}
            myNotificElementIsVisible={myNotificElementIsVisible}
          />
        ))}
      </FlipMove>
    </div>
  );
}

export default Feed;
