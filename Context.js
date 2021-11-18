import React, { useState, useEffect } from "react";

const Context = React.createContext();

function ContextProvider({ children }) {
  const [openNewListModal, setOpenNewListModal] = useState(false);
  const [newListHeader, setNewListHeader] = useState("");
  const [newListSubHeader, setNewListSubHeader] = useState("");
  const [newListExplanation, setNewListExplanation] = useState("");
  /*   const [user, setUser] = useState(true); */
  const [_profiles, _setProfiles] = useState([
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
  const [lists, setLists] = useState([
    {
      header: "Störst potential",
      subheader:
        "Stats å sido, vem har störst potential? Vi snackar talang, vi snackar kapacitet. Här är min lista:",
      list: _profiles,
      listExplanation:
        "Första-platsen inte mycket att orda om. Andra-platsen desto jämnare. Den otippade finnen nurrminator drar ändå längsta strået. Har tidigare visat vilken talang han är i CS, jag tycker vi kan börja se glimtar av det även i cod. Martin får sista-platsen, han har kunnandet, han har kapaciteten, men han misslyckas att omsätta det i praktiken. Prestationsångest? Kanske. Behöver ett nytt Belgien-läger.",
    },
  ]);

  return (
    <Context.Provider
      value={{
        openNewListModal,
        setOpenNewListModal,
        _profiles,
        _setProfiles,
        newListHeader,
        setNewListHeader,
        newListSubHeader,
        setNewListSubHeader,
        newListExplanation,
        setNewListExplanation,
        lists,
        setLists,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { ContextProvider, Context };
