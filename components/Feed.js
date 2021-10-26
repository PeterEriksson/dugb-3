import Post from "./Post";
import Tweetbox from "./Tweetbox";

/* text area max w 576 px xl */

function Feed() {
  return (
    <div className="flex flex-col border-r border-t">
      <p className="font-bold text-2xl py-3 ml-4">Home | Skvaller</p>

      {/* Tweetbox */}
      <Tweetbox />
      {/* Posts */}
      <Post />
    </div>
  );
}

export default Feed;
