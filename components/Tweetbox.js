import { useState } from "react";

function Tweetbox() {
  const [postText, setPostText] = useState("");
  const postMaxLength = 120;

  return (
    <div className="w-full font-mainFontHelv border-t border-grayish flex flex-col ">
      <div className="flex w-11/12  mb-3 flex-grow space-x-4 py-8 ml-6">
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
          className="w-full text-xl  focus:ring-transparent font-light border-none outline-none resize-none"
          type="text"
          placeholder="Vad händer schmetir?"
        />
      </div>
      {/* img + chars div */}
      <div className="flex mb-3  items-center">
        <input
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
      <button className="py-3 w-32 mx-auto px-6 cursor-pointer mb-3 hover:bg-hoverBluish transition transform duration-100 bg-blueish rounded-full">
        <p className="text-white text-sm">Share post</p>
      </button>

      <div className="bg-grayish h-2 w-full" />
    </div>
  );
}

export default Tweetbox;
