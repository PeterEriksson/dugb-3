import firebase from "firebase";
import { useContext, useState } from "react";
import { Context } from "../Context";
import { db } from "../firebase";

function Tweetbox() {
  const [postText, setPostText] = useState("");
  const [postImg, setPostImg] = useState("");
  const postMaxLength = 200;
  const { setPosts, posts, user, users, userGuest } = useContext(Context);

  const tempGuest = {
    fullName: "Guest",
    avatar:
      "https://i.pinimg.com/564x/25/8b/da/258bda8242c55a84922f8c1bd168d7e8.jpg",
  };

  //limitations of firebase username/password -> getaround ->
  //if guest is logged in we also need to cover for that, hence tempGuest
  /* const { fullName } = userGuest
    ? tempGuest
    : users.find((item) => item.displayName === user?.displayName); */
  //buggy ☝️ after user listener implemented in Context. added in db.add instead 👇.

  const handleNewPost = (e) => {
    e.preventDefault();
    if (postText.length >= postMaxLength) return;

    db.collection("posts").add({
      //avatar -> bettar name variable than "img"
      avatar: user?.photoURL,
      fullName: users.find((item) => item.displayName === user?.displayName)
        .fullName,
      userName: user?.displayName,
      postText: postText,
      postImg: postImg,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setPostImg("");
    setPostText("");
  };

  return (
    <div className="w-full font-mainFontHelv border-t border-grayish flex flex-col ">
      <div className="flex  mb-1  space-x-1 xs:py-5  py-3.5 ml-3   ">
        <img
          className="w-10/ h-10/ w-12 h-12 rounded-full object-cover"
          src={` ${userGuest ? `${tempGuest?.avatar}` : `${user?.photoURL}`}  `}
        />
        <textarea
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          name=""
          id=""
          cols=""
          rows={userGuest ? 2 : 4}
          className="  w-full xs:text-xl text-base focus:ring-transparent font-light border-none outline-none resize-none"
          type="text"
          placeholder={`${
            userGuest
              ? "Only users can post"
              : `Vad händer ${user?.displayName}?`
          }  `}
        />
      </div>

      <div className="flex mb-2 items-center ">
        <input
          value={postImg}
          onChange={(e) => setPostImg(e.target.value)}
          type="text"
          className=" ml-20 focus:ring-gray-600 focus:border-gray-600  w-32 text-xs border-gray-200 rounded-md "
          placeholder="optional: img url"
        />

        <button
          onClick={(e) => handleNewPost(e)}
          disabled={!postText.trim() || userGuest}
          className="disabled:opacity-60 py-2.5 ml-auto mr-4 px-9 xs:px-10 cursor-pointer hover:bg-hoverBluish disabled:pointer-events-none transition transform duration-100 bg-blueish rounded-xl"
        >
          <p className="text-white text-sm">Post</p>
        </button>
      </div>

      <p
        className={`ml-auto mr-5 mb-0.5 ${
          postText.length > postMaxLength ? "font-normal" : "font-light"
        } ${postText.length === 0 && "opacity-0"} ${
          postText.length > postMaxLength ? "text-red-500" : "text-gray-500"
        }`}
      >
        {postText.length}/{postMaxLength}
      </p>
    </div>
  );
}

export default Tweetbox;
