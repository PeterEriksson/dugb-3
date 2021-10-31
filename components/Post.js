import {
  ChatIcon,
  PencilIcon,
  RefreshIcon,
  TrashIcon,
  FireIcon as FireIconSolid,
} from "@heroicons/react/outline";
import { ShieldCheckIcon, FireIcon } from "@heroicons/react/solid";

function Post({ item }) {
  return (
    <div className="w-full pb-6 font-mainFontHelv hover:bg-grayish border-b border-gray-300 flex flex-col ">
      <div className="flex w-11/12 flex-grow mt-2.5 ml-1">
        <img
          className="w-8 h-8 ml-5 mt-2 rounded-full object-cover"
          src={item.img}
          alt=""
        />
        <div className="flex ml-5 items-center ">
          {/* img + fullName + symbol + userName */}
          <p className="font-bold ">{item.fullName}</p>
          <ShieldCheckIcon className="h-4 w-4 text-blueish " />
          <p className="text-sm  text-gray-400 ">@{item.userName}</p>
        </div>
      </div>
      <p className="ml-test -mt-1.5 mr-5">{item.postText}</p>
      <img
        className="rounded-lg max-w-xs ml-test mt-3"
        src={item?.postImg}
        alt=""
      />
      {/* symbols - answer retweet edit trash heart */}
      <div className="flex items-center ml-test mr-6 mt-6  justify-between">
        <ChatIcon className="postIcon" />
        <RefreshIcon className="postIcon" />
        <PencilIcon className="postIcon" />
        <TrashIcon className="postIcon" />
        {/* <FireIcon className="postIcon text-orange" /> */}
        <FireIconSolid className="postIcon" />
      </div>
    </div>
  );
}

export default Post;
