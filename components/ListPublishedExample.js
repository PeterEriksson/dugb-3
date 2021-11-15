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

  return (
    <div className=" mb-1 mt-3 flex flex-col p-3 bg-white shadow-md rounded-xl ml-3">
      <p className="italic text-sm font-light"> schmetir created a list:</p>
      <h2 className="text-lg font-bold">Störst potential</h2>
      <p className="font-semibold">
        Stats å sido, vem har störst potential? Vi snackar talang, vi snackar
        kapacitet. Här är min lista:
      </p>

      <div className="p-4 w-4/5 ml-auto mr-auto bg-gradient-to-br rounded-2xl from-white via-indigo-100 to-blueish">
        {profiles.map((profileItem, i) => {
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
