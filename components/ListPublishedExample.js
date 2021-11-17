import { useContext, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Context } from "../Context";

function List() {
  const { _profiles } = useContext(Context);
  const { newListHeader, newListSubHeader, newListExplanation } =
    useContext(Context);

  return (
    <div className=" mb-1 mt-3 flex flex-col p-3 border border-gray-300 bg-grayish shadow-md rounded-xl ml-3">
      <p className="italic text-sm font-extralight">
        {" "}
        schmetir created a list:
      </p>
      <h2 className="text-lg font-bold">{newListHeader}</h2>
      <p className="font-medium">{newListSubHeader}</p>

      <div className="p-4 w-4/5 ml-auto mr-auto bg-gradient-to-br rounded-2xl from-white via-indigo-100 to-blueish">
        {_profiles.map((profileItem, i) => {
          return (
            <div className="ml-3 flex justify-center">
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
        <p className="font-light">{newListExplanation}</p>
      </section>
    </div>
  );
}

export default List;
