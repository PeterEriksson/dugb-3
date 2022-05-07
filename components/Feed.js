import { useContext, useEffect, useState } from "react";
import { Context } from "../Context";
import Post from "./Post";
import FlipMove from "react-flip-move";
import { db } from "../firebase";
import LoadingSpinnerNotific from "./LoadingSpinnerNotific";

function Feed() {
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

  /* if user comes here by clicking on a notification ->  handle auto scrolling down to 
  the correct post. Ok. Also implement on list page
  */
  useEffect(() => {
    //can maybe do return here instead of nesting? try at list page
    if (elementIdToScrollTo !== "") {
      setLoadingNotific(true);
      setTimeout(() => {
        document.getElementById(elementIdToScrollTo).scrollIntoView({
          behavior: "smooth",
        });
        setElementIdToScrollTo("");
        setLoadingNotific(false);
      }, 1200);
    }
  }, []);
  /* Timer is set to 1.4 seconds. Maybe not optimal. 
  This can probably be solved with 
  firebase loading hook. ex from slack-build
  const [roomMessages, loading] = useCollection(
    roomId &&
      db
        .collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
  );

  Here firebase v8 is used. A bit cleaner.
  */

  return (
    <div className="flex flex-col  ">
      {loadingNotific && <LoadingSpinnerNotific />}
      <FlipMove>
        {__posts.map((item) => (
          <Post item={item} key={item.postId} />
        ))}
      </FlipMove>
    </div>
  );
}

export default Feed;
