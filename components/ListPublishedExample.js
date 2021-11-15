import { useContext, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Context } from "../Context";

function List() {
  const { _profiles } = useContext(Context);

  return (
    <div className=" mb-1 mt-3 flex flex-col p-3 bg-white shadow-md rounded-xl ml-3">
      <p className="italic text-sm font-light"> schmetir created a list:</p>
      <h2 className="text-lg font-bold">Störst potential</h2>
      <p className="font-semibold">
        Stats å sido, vem har störst potential? Vi snackar talang, vi snackar
        kapacitet. Här är min lista:
      </p>

      <div className="p-4 w-4/5 ml-auto mr-auto bg-gradient-to-br rounded-2xl from-white via-indigo-100 to-blueish">
        {_profiles.map((profileItem, i) => {
          return (
            <div className="ml-3 flex justify-center">
              <div className="bg-grayish mb-2 p-4 w-72 rounded-2xl flex space-x-5 items-center">
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
        <p className="font-light">
          Första-platsen inte mycket att orda om. Andra-platsen desto jämnare.
          Den otippade finnen nurrminator drar ändå längsta strået. Har tidigare
          visat vilken talang han är i CS, jag tycker vi kan börja se glimtar av
          det även i cod. Martin får sista-platsen, han har kunnandet, han har
          kapaciteten, men han misslyckas att omsätta det i praktiken.
          Prestationsångest? Kanske. Behöver ett nytt Belgien-läger.
        </p>
      </section>
    </div>
  );
}

export default List;
