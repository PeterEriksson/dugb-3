import { TrashIcon } from "@heroicons/react/outline";
import { forwardRef, useContext, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Context } from "../Context";
import { db } from "../firebase";

const ListPublishedExample = forwardRef(({ item }, ref) => {
  /* function ListPublishedExample({ item }) { */
  const { _profiles, user, userGuest } = useContext(Context);
  const { newListHeader, newListSubHeader, newListExplanation } =
    useContext(Context);

  const handleDeleteList = () => {
    db.collection("lists").doc(item.listId).delete();
  };

  return (
    <div
      ref={ref}
      className=" group mb-1 mt-3 flex flex-col p-3 border border-gray-300 bg-grayish shadow-md rounded-xl ml-3"
    >
      <div className="flex items-center justify-between">
        <p className="italic text-sm font-extralight">{`${item.createdBy} created a list:`}</p>
        <TrashIcon
          onClick={handleDeleteList}
          className={`${user?.displayName !== item.createdBy && "hidden"} ${
            userGuest && "hidden"
          } h-4 w-4 cursor-pointer text-gray-700 opacity-0 group-hover:opacity-100 transition duration-100 ease-in transform hover:text-black`}
        />
      </div>
      <h2 className="text-lg font-bold">{item.header}</h2>
      <p className="font-medium">{item.subheader}</p>

      <div className="p-4 w-4/5 ml-auto mr-auto bg-gradient-to-br rounded-2xl from-white via-indigo-100 to-blueish">
        {item.ranking.map((profileItem, i) => {
          return (
            <div key={i} className="ml-3 flex justify-center">
              <div className="bg-white mb-2 p-4 w-72 rounded-2xl flex space-x-5 items-center">
                <p className="mr-10">{i + 1}</p>
                <img
                  src={profileItem.img}
                  alt=""
                  className="h-7 w-7 rounded-full"
                />
                <p className="font-semibold">{profileItem.userName}</p>
              </div>
            </div>
          );
        })}
      </div>

      <section className="ml-3">
        <h2 className="font-bold">Kommentar</h2>
        <p className="font-light">{item.listExplanation}</p>
      </section>
    </div>
  );
});

export default ListPublishedExample;
