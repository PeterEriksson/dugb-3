import { useContext } from "react";
/* import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"; */
import List from "../components/List";
import NewListModal from "../components/NewListModal";
import { Context } from "../Context";
import ListPublishedExample from "../components/ListPublishedExample";

function lists() {
  const { openNewListModal, setOpenNewListModal } = useContext(Context);
  const { lists } = useContext(Context);

  return (
    <div className="w-full  h-screen border-l border-grayish flex flex-col">
      <h1 className="mt-3 ml-3 font-bold text-2xl text-center">Lists</h1>
      <p className="font-light ml-3 text-center pb-4">
        Who is best at what? Customize your own lists and rank your team. Hot
        tip: it's probably not Martin. Hot tip 2: it's probably neither Norman
      </p>
      <div className="border-b border-grayish " />

      <button
        onClick={() => setOpenNewListModal((prev) => !prev)}
        className="flex mx-auto mt-3 transition duration-100 hover:scale-105 bg-blueish w-28 h-10 p-4 rounded-full justify-center items-center"
      >
        <p className="text-white font-light text-md">New list</p>
      </button>

      <NewListModal />

      {/* LISTS FEED */}
      {lists.map((item, i) => (
        <ListPublishedExample key={i} item={item} />
      ))}
      {/* <ListPublishedExample /> */}
    </div>
  );
}

export default lists;
