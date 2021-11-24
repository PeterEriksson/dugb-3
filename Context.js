import React, { useState, useEffect } from "react";
import { db } from "./firebase";

const Context = React.createContext();

function ContextProvider({ children }) {
  const [englishLanguage, setEnglishLanguage] = useState(false);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [openRegisterUserModal, setOpenRegisterUserModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openNewListModal, setOpenNewListModal] = useState(false);
  const [openTestModal, setOpenTestModal] = useState(false);
  const [userGuest, setUserGuest] = useState(false);
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

  useEffect(() => {
    db.collection("users").onSnapshot((snapshot) =>
      setUsers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
  }, []);

  return (
    <Context.Provider
      value={{
        openNewListModal,
        setOpenNewListModal,
        _profiles,
        _setProfiles,
        lists,
        setLists,
        userGuest,
        setUserGuest,
        englishLanguage,
        setEnglishLanguage,
        openTestModal,
        setOpenTestModal,
        openRegisterUserModal,
        setOpenRegisterUserModal,
        openLoginModal,
        setOpenLoginModal,
        user,
        setUser,
        users,
        setUsers,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { ContextProvider, Context };
