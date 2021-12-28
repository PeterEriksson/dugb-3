import { useContext, useEffect, useState } from "react";
import { Context } from "../Context";
import Post from "./Post";
import FlipMove from "react-flip-move";
import { db } from "../firebase";

function Feed() {
  //make use of FlipMove -> do useEffect instead
  /* const { posts } = useContext(Context); */

  //Make us of FlipMove. Fetch here instead of Context
  /* const [posts, setPosts] = useState([]);
  useEffect(() => {
    const unsubscribe = db
      .collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({ ...doc.data(), postId: doc.id }))
        )
      );
    return unsubscribe;
  }, []); */

  /* New solution: Don't need to read from firebase every time when visiting Home 
  just to be able to make us of FlipMove effect. Implement on lists feed aswell. */
  const { posts } = useContext(Context);
  const [__posts, __setPosts] = useState([]);
  useEffect(() => {
    /* const unsubscribe = */ __setPosts(posts);
    /* return unsubscribe; */
  }, [posts]);

  return (
    <div className="flex flex-col //min-w-min-width// ">
      <FlipMove>
        {__posts.map((item) => (
          <Post item={item} key={item.postId} />
        ))}
      </FlipMove>
    </div>
  );
}

export default Feed;
