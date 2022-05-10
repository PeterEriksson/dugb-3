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
  } = useContext(Context);
  const [__posts, __setPosts] = useState([]);
  useEffect(() => {
    __setPosts(posts);
  }, [posts]);

  /* observer sol */
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
        block: "center",
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
