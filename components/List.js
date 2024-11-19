import { MinusCircleIcon, MinusIcon } from "@heroicons/react/outline";
import { useContext, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Context } from "../Context";

function List() {
  const { _profiles, _setProfiles } = useContext(Context);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(_profiles);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    _setProfiles(items);
  };

  const handleRemovePlayer = (player) => {
    const newArr = _profiles.filter(
      (item) => item.userName !== player.userName
    );
    _setProfiles(newArr);
  };

  return (
    <div className=" mb-1 mt-1 flex flex-col p-2 px-2 rounded-xl ">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="listitems">
          {(provided) => (
            <div
              className={`p-2 w-full ml-auto mr-auto rounded-2xl `}
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
                        className={`ml-3 flex justify-center !top-auto !left-auto`}
                      >
                        <div
                          className={`bg-grayish/60 ${
                            snapshot.isDragging && "bg-gray-400 z-50"
                          } mb-2 p-3.5 w-52 xs:w-60 rounded-2xl flex space-x-2 items-center group`}
                        >
                          <p className="sm:mr-8 mr-3 ml-2  opacity-60">
                            {i + 1}
                          </p>
                          <img
                            src={profileItem.img}
                            alt="list-profile-image"
                            className="h-6 w-6 rounded-full"
                          />
                          <p className="font-semibold">
                            {profileItem.userName}
                          </p>
                          <MinusCircleIcon
                            onClick={() => handleRemovePlayer(profileItem)}
                            className="w-4 h-4 !ml-auto  opacity-0 group-hover:opacity-60 hover:!opacity-100 cursor-pointer transition duration-150 ease-in transform"
                          />
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

export default List;
