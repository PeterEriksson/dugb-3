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
  const [posts, setPosts] = useState([
    {
      img: "https://user-images.githubusercontent.com/17027312/134349999-06919dce-11f2-42b9-9c0c-2b27d8dcce51.jpeg",
      fullName: "Peter Eriksson",
      userName: "schmetir",
      postText:
        "Ny lista av undertecknad publicerad. Ni bör ha fått notis. In o kolla. Håller du med? Inte? Ge dig in i matchen, gör din egna och börja svinga!",
      postImg: "",
      postId: Math.floor(Math.random() * 5000),
    },

    {
      img: "https://photos.smugmug.com/photos/i-HGQDK9V/0/XL/i-HGQDK9V-XL.jpg",
      fullName: "Andreas Norman",
      userName: "nurrminator",
      postText: "När droppar vi igen kamrater?",
      postImg:
        "https://i.pinimg.com/236x/56/fa/af/56faaf2b6e15bde373ed05d1bd00d7d1.jpg",
      postId: Math.floor(Math.random() * 5000),
    },

    {
      img: "https://user-images.githubusercontent.com/17027312/134349999-06919dce-11f2-42b9-9c0c-2b27d8dcce51.jpeg",
      fullName: "Peter Eriksson",
      userName: "schmetir",
      postText: "Vill inte nämna några namn men Norman vad håller du på med?",
      postImg: "",
      postId: Math.floor(Math.random() * 5000),
    },

    {
      img: "https://photos.smugmug.com/photos/i-HGQDK9V/0/XL/i-HGQDK9V-XL.jpg",
      fullName: "Andreas Norman",
      userName: "nurrminator",
      postText: "Jag med.",
      postImg: "https://media.giphy.com/media/OKz0chgzax6tr6zDMv/giphy.gif",
      postId: Math.floor(Math.random() * 5000),
    },

    {
      img: "https://photos.smugmug.com/photos/i-BS3QMBH/0/O/i-BS3QMBH-O.jpg",
      fullName: "Martin Eriksson",
      userName: "BigMme930",
      postText: "Jag hatar gulag",
      postImg:
        "https://i.pinimg.com/236x/3c/77/f1/3c77f15815aaa71cb85f376dbc2d5c72.jpg",
      postId: Math.floor(Math.random() * 5000),
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
        posts,
        setPosts,
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
