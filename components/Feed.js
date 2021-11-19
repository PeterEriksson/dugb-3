import { useContext } from "react";
import { Context } from "../Context";
import Post from "./Post";
import FlipMove from "react-flip-move";

/* text area max w 576 px xl ...?*/

function Feed() {
  const { posts } = useContext(Context);

  return (
    <div className="flex flex-col  ">
      <FlipMove>
        {posts.map((item, i) => (
          <Post item={item} key={i} />
        ))}
      </FlipMove>
    </div>
  );
}

export default Feed;
