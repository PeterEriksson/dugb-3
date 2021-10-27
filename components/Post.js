import {
  ChatIcon,
  PencilIcon,
  RefreshIcon,
  TrashIcon,
  FireIcon as FireIconSolid,
} from "@heroicons/react/outline";
import { ShieldCheckIcon, FireIcon } from "@heroicons/react/solid";

function Post() {
  const posts = [
    {
      img: "https://photos.smugmug.com/photos/i-HGQDK9V/0/XL/i-HGQDK9V-XL.jpg",
      fullName: "Andreas Norman",
      userName: "nurrminator",
      postText: "När droppar vi igen kamrater?",
      postImg:
        "https://i.pinimg.com/236x/56/fa/af/56faaf2b6e15bde373ed05d1bd00d7d1.jpg",
    },
    {
      img: "https://photos.smugmug.com/photos/i-BS3QMBH/0/O/i-BS3QMBH-O.jpg",
      fullName: "Martin Eriksson",
      userName: "BigMme930",
      postText: "Jag hatar gulag",
      postImg:
        "https://i.pinimg.com/236x/3c/77/f1/3c77f15815aaa71cb85f376dbc2d5c72.jpg",
    },
    {
      img: "https://user-images.githubusercontent.com/17027312/134349999-06919dce-11f2-42b9-9c0c-2b27d8dcce51.jpeg",
      fullName: "Peter Eriksson",
      userName: "schmetir",
      postText: "Vill inte nämna några namn men Norman vad håller du på med?",
      postImg: "https://media.giphy.com/media/OKz0chgzax6tr6zDMv/giphy.gif",
    },
  ];

  return (
    <>
      {posts.map((postItem) => (
        <div className="w-full pb-6 font-mainFontHelv hover:bg-grayish border-b border-gray-300 flex flex-col ">
          <div className="flex w-11/12 flex-grow mt-2.5 ml-1">
            <img
              className="w-8 h-8 ml-5 rounded-full object-cover"
              src={postItem.img}
              alt=""
            />
            <div className="flex ml-5 items-center ">
              {/* img + fullName + symbol + userName */}
              <p className="font-bold ">{postItem.fullName}</p>
              <ShieldCheckIcon className="h-4 w-4 text-blueish " />
              <p className="text-sm  text-gray-400 ">@{postItem.userName}</p>
            </div>
          </div>
          <p className="ml-test mr-5">{postItem.postText}</p>
          <img
            className="rounded-lg max-w-xs ml-test mt-3"
            src={postItem?.postImg}
            alt=""
          />
          {/* symbols - answer retweet edit trash heart */}
          <div className="flex items-center ml-test md:space-x-12 lg:space-x-20 mt-7 mr-3 space-x-6">
            <ChatIcon className="postIcon" />
            <RefreshIcon className="postIcon" />
            <PencilIcon className="postIcon" />
            <TrashIcon className="postIcon" />
            {/* <FireIcon className="postIcon text-orange" /> */}
            <FireIconSolid className="postIcon" />
          </div>
        </div>
      ))}
    </>
  );
}

export default Post;
