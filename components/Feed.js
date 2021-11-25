import { useContext, useEffect, useState } from "react";
import { Context } from "../Context";
import Post from "./Post";
import FlipMove from "react-flip-move";
import { db } from "../firebase";

/* text area max w 576 px xl ...?*/

function Feed() {
  //make use of FlipMove -> do useEffect instead
  /* const { posts } = useContext(Context); */

  //Make us of FlipMove:
  const [posts, setPosts] = useState([]);
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
  }, []);

  return (
    <div className="flex flex-col //min-w-min-width// ">
      <FlipMove>
        {posts.map((item /* i */) => (
          <Post item={item} /* key={i} */ key={item.postId} />
        ))}
      </FlipMove>
    </div>
  );
}

export default Feed;
