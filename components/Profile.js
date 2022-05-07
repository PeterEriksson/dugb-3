import { CheckCircleIcon, PencilIcon, XIcon } from "@heroicons/react/outline";

import { useContext, useEffect, useState, useRef } from "react";
import { Context } from "../Context";
import { db } from "../firebase";
import LoadingSpinner from "./LoadingSpinner";

function Profile() {
  /* TEMP TEST THIS SOLUTION -> SAVE API CALLS */
  const { searchOk, setSearchOk } = useContext(Context);
  const { profile, setProfile } = useContext(Context);

  const { users, user } = useContext(Context);

  const [avatar, setAvatar] = useState("");

  //temp dummyData
  /* const [searchOk, setSearchOk] = useState(!false);
  const [profile, setProfile] = useState({
    kdRatio: 3.256,
    wins: 179,
    topFive: 1598,
  }); */

  /* TEMP COMMENT OUT, WORK DITH DUMMY DATA (save api calls) */
  useEffect(() => {
    const getProfile = async () => {
      await fetch(
        `https://call-of-duty-modern-warfare.p.rapidapi.com/warzone/${user?.displayName}/psn`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPID_KEY,

            "x-rapidapi-host": "call-of-duty-modern-warfare.p.rapidapi.com",
          },
        }
      )
        .then((response) => response.json())
        .then((response) => {
          if (response.br) {
            //fetch in db user profile the profileAvatar
            setAvatar(
              users.find((item) => item.displayName === user?.displayName)
                .profileAvatar
            );
            setSearchOk(true);
          } else {
            setSearchOk(false);
          }
          setProfile(response.br);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    getProfile();
  }, []);

  const [favoriteSayingEditing, setFavoriteSayingEditing] = useState(false);
  const [avatarEditing, setAvatarEditing] = useState(false);
  const [favoriteSaying, setFavoriteSaying] = useState("");
  const [profileAvatar, setProfileAvatar] = useState("");
  const maxFavoriteSayingCharacters = 25;

  const favoriteSayingRef = useRef();
  const avatarInputRef = useRef();

  const handlePencilIconFavoriteClick = () => {
    setFavoriteSayingEditing(true);
    setTimeout(() => {
      favoriteSayingRef?.current?.focus();
    }, 20);
  };

  const handlePencilIconAvatarClick = () => {
    setAvatarEditing(true);
    setTimeout(() => {
      avatarInputRef?.current?.focus();
    }, 20);
  };

  const submitFavoriteSaying = (e) => {
    e.preventDefault();

    if (favoriteSaying.trim() === "") {
      setFavoriteSayingEditing(false);
      setFavoriteSaying("");
    }

    /* use firebase set method. use userInfo and spread operator  */
    const userInfo = users.find(
      (item) => item.displayName === user?.displayName
    );

    if (
      maxFavoriteSayingCharacters > favoriteSaying.length &&
      favoriteSaying.trim() !== ""
    ) {
      db.collection("users")
        .doc(users.find((item) => item.displayName === user?.displayName).id)
        .set({
          ...userInfo,
          favoriteSaying: favoriteSaying,
        });
      setFavoriteSayingEditing(false);
      setFavoriteSaying("");
    }
  };

  const submitAvatar = (e) => {
    e.preventDefault();

    if (avatar.trim() === "") {
      setAvatarEditing(false);
      setAvatar("");
    }

    const userInfo = users.find(
      (item) => item.displayName === user?.displayName
    );
    /* use firebase set method. use userInfo and spread operator  */
    if (favoriteSaying.trim() !== "") {
      db.collection("users")
        .doc(users.find((item) => item.displayName === user?.displayName).id)
        .set({
          ...userInfo,
          profileAvatar: profileAvatar,
        });
      setAvatarEditing(false);
      setAvatar("");
    }
  };

  return (
    <div className="ml-4 ">
      {searchOk ? (
        <div className="border border-gray-300 drop-shadow-lg   flex flex-row p-5 mt-1.5 bg-grayish rounded-2xl max-w-2xl mr-5 mdLgTest:mr-0 ">
          <img
            alt=""
            /* src="https://i.pinimg.com/236x/79/44/69/794469d92431bd6d291755f35a4a6530.jpg" */
            src={avatar}
            className="rounded-2xl max-w-profileAvatar object-cover h-72"
          />
          <div className="ml-8 flex flex-col justify-center //w-full mb-2">
            <h2 className="font-bold text-xl mb-2">{user?.displayName}</h2>
            <div className="flex flex-col space-y-1.5">
              <div className="flex">
                <h3 className="font-semibold">K/D:&nbsp;</h3>
                <p className="font-light">
                  {Number(profile?.kdRatio).toFixed(3)}
                </p>
              </div>
              <div className="flex">
                <h3 className="font-semibold">Wins:&nbsp;</h3>
                <p className="font-light">{profile?.wins}</p>
              </div>

              <div className="flex">
                <h3 className="font-semibold">Top five:&nbsp;</h3>
                <p className="font-light">{profile?.topFive}</p>
              </div>
              <div className="flex items-center group">
                <h3 className="font-semibold">Clans:&nbsp;</h3>
                <p className="font-light">[SHP]</p>
                <PencilIcon className="postIcon profileEditIconEffects" />
              </div>
              <div className="flex items-center group ">
                <h3 className="font-semibold flex items-center">
                  Favorite saying:&nbsp;
                  <p className={`font-light `}>
                    {!favoriteSayingEditing &&
                      users?.find(
                        (item) => item?.displayName === user?.displayName
                      )?.favoriteSaying}
                  </p>
                </h3>

                {!favoriteSayingEditing && (
                  <PencilIcon
                    onClick={handlePencilIconFavoriteClick}
                    className="postIcon profileEditIconEffects"
                  />
                )}

                {favoriteSayingEditing && (
                  <>
                    <form className={`  `} onSubmit={submitFavoriteSaying}>
                      <input
                        ref={favoriteSayingRef}
                        value={favoriteSaying}
                        onChange={(e) => setFavoriteSaying(e.target.value)}
                        placeholder="What do u often say"
                        type="text"
                        className={`w-full text-xs h-4 outline-none border-gray-400 rounded-md focus:ring-gray-500 focus:border-gray-500     font-light ${
                          favoriteSaying.length > maxFavoriteSayingCharacters &&
                          "text-red-500 font-semibold"
                        }`}
                      />
                    </form>
                    {favoriteSayingEditing && (
                      <XIcon
                        className="postIcon profileEditIconEffects"
                        onClick={() =>
                          setFavoriteSayingEditing((prev) => !prev)
                        }
                      />
                    )}
                  </>
                )}
              </div>

              <div className="flex items-center group ">
                <h3 className="font-semibold flex items-center ">
                  Avatar:&nbsp;
                  <p
                    className={`font-light text-xs italic truncate max-w-profileAvatar mt-1`}
                  >
                    {!avatarEditing &&
                      users?.find(
                        (item) => item?.displayName === user?.displayName
                      )?.profileAvatar}
                  </p>
                </h3>

                {!avatarEditing && (
                  <PencilIcon
                    onClick={handlePencilIconAvatarClick}
                    className="postIcon profileEditIconEffects"
                  />
                )}

                {avatarEditing && (
                  <>
                    <form className="//w-2/5 " onSubmit={submitAvatar}>
                      <input
                        ref={avatarInputRef}
                        value={avatar}
                        onChange={(e) => setAvatar(e.target.value)}
                        placeholder="Enter your avatar url"
                        type="text"
                        className={` w-full text-xs h-4 outline-none border-gray-400 rounded-md focus:ring-gray-500 focus:border-gray-500     font-light `}
                      />
                    </form>
                    {avatarEditing && (
                      <XIcon
                        className="postIcon profileEditIconEffects"
                        onClick={() => setAvatarEditing((prev) => !prev)}
                      />
                    )}
                  </>
                )}
              </div>

              {/* <div className="flex items-center group">
                <h3 className="font-semibold">Avatar:&nbsp;</h3>
                <p className="font-light truncate"></p>
                <PencilIcon className="postIcon profileEditIconEffects" />
              </div> */}
              <div className="flex ">
                <h3 className="font-semibold">Stengths:&nbsp;</h3>
                <p className="font-light">...</p>
                {/* <PencilIcon className="postIcon profileEditIconEffects" /> */}
              </div>
              <div className="flex ">
                <h3 className="font-semibold">Weaknesses:&nbsp;</h3>
                <p className="font-light">...</p>
                {/* <PencilIcon className="postIcon profileEditIconEffects" /> */}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}

export default Profile;
