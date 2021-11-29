import { useContext, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Context } from "../Context";

function ListTest() {
  const { _profiles, _setProfiles } = useContext(Context);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(_profiles);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    _setProfiles(items);
  };

  return (
    <div className=" mb-1 mt-1 flex flex-col p-2 px-2 ">
      <DragDropContext onDragEnd={handleOnDragEnd} className="">
        <Droppable droppableId="listitems">
          {(provided) => (
            <div
              className="w-full h-2/3 max-h-full max-w-full     p-2  ml-auto mr-auto bg-gradient-to-br rounded-2xl from-white via-indigo-100 to-blueish"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {_profiles.map((profileItem, i) => {
                return (
                  <Draggable
                    key={profileItem.userName}
                    draggableId={profileItem.userName}
                    index={i}
                  >
                    {(provided, snapshot) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className={`ml-3 flex justify-center `}
                      >
                        <div
                          className={`bg-grayish ${
                            snapshot.isDragging && "bg-red-500 z-50"
                          } mb-2 p-4 w-60 rounded-2xl flex space-x-2 items-center`}
                        >
                          <p className="mr-10">{i + 1}</p>
                          <img
                            src={profileItem.img}
                            alt=""
                            className="h-7 w-7 rounded-full"
                          />
                          <p className="font-semibold">
                            {profileItem.userName}
                          </p>
                        </div>
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default ListTest;