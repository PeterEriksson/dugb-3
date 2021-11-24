import firebase from "firebase";
import { useContext, useState } from "react";
import { Context } from "../Context";
import { db } from "../firebase";

function Tweetbox() {
  const [postText, setPostText] = useState("");
  const [postImg, setPostImg] = useState("");
  const postMaxLength = 120;
  const { setPosts, posts, user, users, userGuest } = useContext(Context);

  const tempGuest = {
    fullName: "Guest",
    avatar:
      "https://i.pinimg.com/564x/25/8b/da/258bda8242c55a84922f8c1bd168d7e8.jpg",
  };
  //limitations of firebase username/password -> getaround ->
  //if guest is logged in we also need to cover for that, hence tempGuest
  const { fullName } = userGuest
    ? tempGuest
    : users.find((item) => item.displayName === user?.displayName);

  const handleNewPost = (e) => {
    e.preventDefault();
    if (postText.length <= postMaxLength) {
      /* setPosts((prev) => [
        ...prev,
        {
          img: user.photoURL,
          fullName: fullName,
          userName: user.displayName,
          postText: postText,
          postImg: postImg,
          postId: Math.floor(Math.random() * 5000),
        },
      ]); */
      db.collection("posts").add({
        //avatar -> bettar name variable than "img"
        avatar: user?.photoURL,
        fullName: fullName,
        userName: user?.displayName,
        postText: postText,
        postImg: postImg,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setPostImg("");
      setPostText("");
    }
  };

  return (
    <div className="w-full font-mainFontHelv border-t border-grayish flex flex-col ">
      <div className="flex w-11/12  mb-3 flex-grow space-x-4 py-8 ml-6">
        <img
          className="w-9 h-8 rounded-full object-cover"
          src={` ${userGuest ? `${tempGuest?.avatar}` : `${user?.photoURL}`}  `}
        />
        <textarea
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          name=""
          id=""
          cols=""
          rows=""
          className="w-full text-xl  focus:ring-transparent font-light border-none outline-none resize-none"
          type="text"
          placeholder={`${
            userGuest
              ? "Hello Guest. You need to be logged in to be able to post."
              : `Vad händer ${user?.displayName}?`
          }  `}
        />
      </div>
      {/* img + chars div */}
      <div className="flex mb-3  items-center">
        <input
          value={postImg}
          onChange={(e) => setPostImg(e.target.value)}
          type="text"
          className=" ml-20 focus:ring-gray-600 focus:border-gray-600  w-40 sm:text-xs border-gray-200 rounded-md"
          placeholder="optional: enter img url"
        />
        <p
          className={`ml-auto mr-5 mb-1.5 ${
            postText.length > postMaxLength ? "font-normal" : "font-light"
          } ${postText.length === 0 && "opacity-0"} ${
            postText.length > postMaxLength ? "text-red-500" : "text-gray-500"
          }`}
        >
          {postText.length}/{postMaxLength}
        </p>
      </div>

      <button
        onClick={(e) => handleNewPost(e)}
        disabled={!postText.trim() || userGuest}
        className="py-3 w-32 mx-auto px-6 cursor-pointer mb-3 hover:bg-hoverBluish transition transform duration-100 bg-blueish rounded-full"
      >
        <p className="text-white text-sm">Share post</p>
      </button>

      <div className="bg-grayish h-2 w-full" />
    </div>
  );
}

export default Tweetbox;
