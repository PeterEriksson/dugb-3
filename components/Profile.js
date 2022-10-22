import {
  CheckCircleIcon,
  PencilIcon,
  RefreshIcon,
  XIcon,
  ArrowCircleUpIcon,
  ArrowCircleDownIcon,
} from "@heroicons/react/outline";
import { useContext, useEffect, useState, useRef } from "react";
import { Context } from "../Context";
import { db } from "../firebase";
import LoadingSpinner from "./LoadingSpinner";
import styles from "../styles/effects.module.css";
import firebase from "firebase";

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
            setAvatar(
              users.find((item) => item.displayName === user?.displayName)
                .profileAvatar
            );
            /* move firestore set to here!? NO, must be when we log out */
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
    setAvatar("");
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

  const userInfo = users.find((item) => item.displayName === user?.displayName);

  const submitAvatar = (e) => {
    e.preventDefault();

    if (avatar.trim() === "") {
      setAvatarEditing(false);
      setAvatar("");
    }

    /* use firebase set method. use userInfo and spread operator  */
    if (avatar.trim() !== "") {
      db.collection("users")
        .doc(users.find((item) => item.displayName === user?.displayName).id)
        .set({
          ...userInfo,
          profileAvatar: avatar,
        });
      setAvatarEditing(false);
      setAvatar("");
    }
  };

  const handleUpdateData = () => {
    //Don't have to call Firestore IF we don't need to update kd or wins.
    if (
      Number(profile?.kdRatio.toFixed(4)) ==
        Number(userInfo.lastKd.toFixed(4)) &&
      profile?.wins == userInfo.lastWins
    )
      return;

    /* if there are new wins we want to create a rewardPost AND update user stats */
    if (profile?.wins > userInfo.lastWins) {
      db.collection("posts")
        .add({
          isRewardPost: true,
          avatar: userInfo.profileAvatar,
          fullName: users.find((item) => item.displayName === user?.displayName)
            .fullName,
          userName: user?.displayName,
          postText: `His total BR-wins is now ${profile?.wins}. Congrats!`,
          postImg:
            "https://i.pinimg.com/736x/99/e7/55/99e755bcd84c42a684c7f23a8679340e.jpg",
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          newWinsAmount: profile?.wins - userInfo.lastWins,
        })
        .then(() => {
          db.collection("users")
            .doc(
              users.find((item) => item.displayName === user?.displayName).id
            )
            .set({
              ...userInfo,
              lastKd: profile?.kdRatio,
              lastWins: profile?.wins,
            });
        });
    } else {
      /* else, just update the user with new kd stats */
      db.collection("users")
        .doc(users.find((item) => item.displayName === user?.displayName).id)
        .set({
          ...userInfo,
          lastKd: profile?.kdRatio,
          /* lastWins: profile?.wins, */
        });
    }

    /* try react hot toast for notifyhing the user what happened. Use Timeout and 
    extend the loading time */
  };

  return (
    <div className="ml-4 ">
      {searchOk ? (
        <div className="border border-gray-300 drop-shadow-lg   flex flex-col  xs:flex-row p-5 mt-1.5 bg-grayish rounded-2xl max-w-2xl mr-5 mdLgTest:mr-0 ">
          <img
            alt=""
            /* src="https://i.pinimg.com/236x/79/44/69/794469d92431bd6d291755f35a4a6530.jpg" */
            src={userInfo.profileAvatar}
            className="  rounded-xl max-w-profileAvatar object-cover xs:h-64 xs:w-40 h-28 w-40  mx-auto xs:mx-0   xs:mb-0 mb-1.5"
          />
          <div className="ml-8  flex flex-col justify-center  mb-2">
            <div className="flex items-center xs:justify-between /bg-red-300">
              <h2 className="font-bold text-xl underline">
                {user?.displayName}
              </h2>
              <RefreshIcon
                onClick={handleUpdateData}
                className="xs:ml-0 ml-3   h-5 w-5 text-gray-600 transform ease-out transition duration-150 hover:rotate-90 cursor-pointer"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              {/* KD INFO DIV */}
              <div className="flex items-center">
                <h3 className="font-semibold">K/D:&nbsp;</h3>
                <p className={`font-light`}>
                  {Number(profile?.kdRatio).toFixed(4)}
                </p>
                <p className={`font-light ml-2    `}>
                  {/* IF KD EQUALS LASTKD -> display gray arrow forward */}
                  {Number(profile?.kdRatio.toFixed(4)) ==
                    Number(userInfo.lastKd.toFixed(4)) && (
                    <ArrowCircleUpIcon className="w-5 h-5 ml-0.5 rotate-90 text-gray-500  " />
                  )}
                </p>
                {/* IF KD IS UP->display green text(the diff) */}
                {Number(profile?.kdRatio.toFixed(4)) >
                  Number(userInfo.lastKd.toFixed(4)) && (
                  <div className="flex items-center space-x-0.5 text-green-500">
                    <ArrowCircleUpIcon className="w-5 h-5 ml-0.5 rotate-45   " />
                    <p className="font-light text-sm  italic">
                      ({Number(profile?.kdRatio - userInfo.lastKd).toFixed(4)})
                    </p>
                  </div>
                )}
                {/* IF KD IS DOWN->display red text(the diff) */}
                {Number(profile?.kdRatio.toFixed(4)) <
                  Number(userInfo.lastKd.toFixed(4)) && (
                  <div className="flex items-center space-x-0.5 text-red-500">
                    <ArrowCircleDownIcon className="w-5 h-5 ml-0.5 -rotate-45  " />
                    <p className="font-light text-sm italic">
                      ({Number(profile?.kdRatio - userInfo.lastKd).toFixed(4)})
                    </p>
                  </div>
                )}
              </div>
              {/* END OF KD INFO DIV */}
              {/* WINS INFO DIV */}
              <div className="flex items-center">
                <h3 className="font-semibold">Wins:&nbsp;</h3>
                <p className={`font-light`}>{profile?.wins}</p>
                <p className={`font-light ml-2    `}>
                  {profile?.wins == userInfo.lastWins && (
                    <ArrowCircleUpIcon className="w-5 h-5 ml-0.5 rotate-90 text-gray-500  " />
                  )}
                </p>
                {/* IF WINS ARE UP->display green text(the diff) */}
                {profile?.wins > userInfo.lastWins && (
                  <div className="flex items-center space-x-0.5 text-green-500">
                    <ArrowCircleUpIcon className="w-5 h-5 ml-0.5 rotate-45  " />
                    <p className="font-light text-sm  italic">
                      ({profile?.wins - userInfo.lastWins})
                    </p>
                  </div>
                )}
              </div>

              {/* TOP FIVE */}
              {/* <div className="flex">
                <h3 className="font-semibold">Top five:&nbsp;</h3>
                <p className="font-light">{profile?.topFive}</p>
              </div> */}
              {/* CLANS */}
              {/* <div className=" items-center group xs:flex hidden">
                <h3 className="font-semibold">Clans:&nbsp;</h3>
                <p className="font-light">...</p>
              </div> */}
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
                    className={`font-light text-xs italic truncate max-w-avatarField mt-1`}
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
                        className={`w-full text-xs h-4 outline-none border-gray-400 rounded-md focus:ring-gray-500 focus:border-gray-500     font-light `}
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
      <h2 className="text-lg font-bold mt-3">Friends ...</h2>
    </div>
  );
}

export default Profile;
