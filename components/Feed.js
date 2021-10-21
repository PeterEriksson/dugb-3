import Post from "./Post";
import Tweetbox from "./Tweetbox";

/* text area max w 576 px xl */

function Feed() {
  return (
    <div className="flex flex-col items-center w-10/12 border-l border-r border-t">
      <p className="font-bold text-2xl py-3">Home</p>

      {/* Tweetbox */}
      <Tweetbox />
      {/* Posts */}
      <Post />
    </div>
  );
}

export default Feed;
