import { useState } from "react";

function Tweetbox() {
  const [postText, setPostText] = useState("");
  const postMaxLength = 120;

  return (
    <div className="w-full  font-mainFontHelv border-t border-gray-300 flex flex-col ">
      <div className="flex w-11/12  mb-6 flex-grow space-x-4 py-8 ml-6">
        <img
          className="w-8 h-8 rounded-full"
          src="https://user-images.githubusercontent.com/17027312/134349999-06919dce-11f2-42b9-9c0c-2b27d8dcce51.jpeg"
        />
        <textarea
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          name=""
          id=""
          cols=""
          rows=""
          className="w-full text-xl font-light outline-none resize-none"
          type="text"
          placeholder="Vad händer?"
        />
      </div>
      <p
        className={`ml-auto mr-5 mb-3 ${postText.length === 0 && "opacity-0"} ${
          postText.length > postMaxLength ? "text-red-500" : "text-gray-500"
        }`}
      >
        {postText.length}/{postMaxLength}
      </p>
      <button className="py-3 w-32 mx-auto px-6 cursor-pointer mb-3 hover:bg-hoverBluish transition transform duration-100 bg-blueish rounded-full">
        <p className="text-white text-sm">Share post</p>
      </button>

      <div className="bg-grayish h-2 w-full" />
    </div>
  );
}

export default Tweetbox;
