import React, { useState, useEffect } from "react";
import { auth, db } from "./firebase";

const Context = React.createContext();

function ContextProvider({ children }) {
  const [englishLanguage, setEnglishLanguage] = useState(false);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [userGuest, setUserGuest] = useState(false);
  /*SAVE API CALLS */
  const [profile, setProfile] = useState({});
  const [searchOk, setSearchOk] = useState(false);

  const [_profiles, _setProfiles] = useState([
    /* {
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
    {
      userName: "Bengtbenny",
      img: "https://user-images.githubusercontent.com/17027312/143914999-4b3362b9-259e-4fe0-9258-fff161b1c67a.jpeg",
    }, */
  ]);

  const [listOfProfiles, setListOfProfiles] = useState([
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
    {
      userName: "Bengtbenny",
      img: "https://user-images.githubusercontent.com/17027312/143914999-4b3362b9-259e-4fe0-9258-fff161b1c67a.jpeg",
    },
  ]);

  /* ok. but save firebase calls for now */
  /* useEffect(() => {
    const unsubscribe = db.collection("users").onSnapshot((snapshot) =>
      setListOfProfiles(
        snapshot.docs.map((doc) => ({
          userName: doc.data().displayName,
          img: doc.data().photoURL,
        }))
      )
    );

    return unsubscribe;
  }, []); */

  useEffect(() => {
    const unsubscribe = db
      .collection("users")
      .onSnapshot((snapshot) =>
        setUsers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );

    return unsubscribe;
  }, []);

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const unsubscribe = db
      .collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({ ...doc.data(), postId: doc.id }))
        )
      );
    return unsubscribe;
  }, []);

  const [lists, setLists] = useState([]);
  useEffect(() => {
    const unsubscribe = db
      .collection("lists")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setLists(
          snapshot.docs.map((doc) => ({ ...doc.data(), listId: doc.id }))
        )
      );
    return unsubscribe;
  }, []);

  //user listener
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user has logged in
        //console.log(authUser);
        setUser(authUser);
      } else {
        //user has logged out
        setUser(null);
      }

      return () => {
        unsubscribe();
      };
    });
  }, [user]);

  return (
    <Context.Provider
      value={{
        _profiles,
        _setProfiles,
        listOfProfiles,
        setListOfProfiles,

        userGuest,
        setUserGuest,
        englishLanguage,

        setEnglishLanguage,

        user,
        setUser,
        users,
        setUsers,

        posts,
        setPosts,
        lists,
        setLists,

        /* save api calls👇 after 1 render the profile is always there, no need to call api again */
        searchOk,
        setSearchOk,
        profile,
        setProfile,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { ContextProvider, Context };
