import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function List() {
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

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(profiles);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setProfiles(items);
  };

  return (
    <div className=" mb-1 mt-3 flex flex-col p-2 px-2  rounded-xl ml-3">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="todos">
          {(provided) => (
            <div
              className="p-2 w-full ml-auto mr-auto bg-gradient-to-br rounded-2xl from-white via-indigo-100 to-blueish"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {profiles.map((profileItem, i) => {
                return (
                  <Draggable
                    key={profileItem.userName}
                    draggableId={profileItem.userName}
                    index={i}
                  >
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className="ml-3 flex justify-center"
                      >
                        <div className="bg-grayish mb-2 p-4 w-60 rounded-2xl flex space-x-2 items-center">
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

export default List;
