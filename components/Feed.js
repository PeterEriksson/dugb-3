import Post from "./Post";
import Tweetbox from "./Tweetbox";

/* text area max w 576 px xl ...?*/

function Feed() {
  return (
    <div className="flex flex-col  ">
      <Post />
    </div>
  );
}

export default Feed;
