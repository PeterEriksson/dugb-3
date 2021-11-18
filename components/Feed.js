import { useContext } from "react";
import { Context } from "../Context";
import Post from "./Post";
import Tweetbox from "./Tweetbox";

/* text area max w 576 px xl ...?*/

function Feed() {
  const { posts } = useContext(Context);

  return (
    <div className="flex flex-col  ">
      {posts.map((item, i) => (
        <Post item={item} key={i} />
      ))}
    </div>
  );
}

export default Feed;
