function Tweetbox() {
  return (
    <div className="w-full  border-t border-gray-300 flex flex-col items-center">
      <div className="flex w-11/12  mb-6 flex-grow space-x-4 py-8 ">
        <img
          className="w-8 h-8 rounded-full"
          src="https://user-images.githubusercontent.com/17027312/134349999-06919dce-11f2-42b9-9c0c-2b27d8dcce51.jpeg"
        />
        <input
          className="w-full text-xl font-light outline-none"
          type="text"
          placeholder="What's happening?"
        />
      </div>

      <button className="py-3 px-6 cursor-pointer hover:bg-hoverBluish transition transform duration-100 bg-blueish rounded-full">
        <p className="text-white">Share post</p>
      </button>
    </div>
  );
}

export default Tweetbox;
