import { useContext, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import List from "../components/List";
import { Context } from "../Context";

function listPage() {
  const { setOpenListModal, openListModal } = useContext(Context);

  const [profiles, setProfiles] = useState([
    {
      userName: "schmetir",
      img: "https://user-images.githubusercontent.com/17027312/134349999-06919dce-11f2-42b9-9c0c-2b27d8dcce51.jpeg",
    },
    {
      userName: "nurrminator",
      img: "https://photos.smugmug.com/photos/i-HGQDK9V/0/XL/i-HGQDK9V-XL.jpg",
    },
    {
      userName: "BigMme930",
      img: "https://photos.smugmug.com/photos/i-BS3QMBH/0/O/i-BS3QMBH-O.jpg",
    },
  ]);

  /* const profiles = [
    {
      userName: "nurrminator",
      img: "https://photos.smugmug.com/photos/i-HGQDK9V/0/XL/i-HGQDK9V-XL.jpg",
    },
    {
      userName: "BigMme930",
      img: "https://photos.smugmug.com/photos/i-BS3QMBH/0/O/i-BS3QMBH-O.jpg",
    },
    {
      userName: "schmetir",
      img: "https://user-images.githubusercontent.com/17027312/134349999-06919dce-11f2-42b9-9c0c-2b27d8dcce51.jpeg",
    },
  ]; */

  /*   console.log(openListModal); ok.*/

  return (
    <div className="w-full  h-screen border-l border-grayish flex flex-col">
      <h1 className="mt-3 ml-3 font-bold text-2xl text-center">Lists</h1>
      <p className="font-light ml-3 text-center pb-4">
        Who is best at what? Customize your own lists and rank your team. Hot
        tip: it's probably not Martin. Hot tip 2: it's probably not Norman
        either. It doesn't matter. It's time for GIBB and that's what it's all
        about.
      </p>
      <div className="border-b border-grayish " />

      <button
        onClick={() => setOpenListModal((prev) => !prev)}
        className="flex mx-auto mt-3 transition duration-100 hover:scale-105 bg-blueish w-28 h-10 p-4 rounded-full justify-center items-center"
      >
        <p className="text-white font-light text-md">New list</p>
      </button>

      <List />
    </div>
  );
}

export default listPage;
