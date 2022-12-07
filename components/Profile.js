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
import firebase from "firebase";
import { LazyLoadImage } from "react-lazy-load-image-component";

function Profile({ loadingStats, loadingAdditionalStats, profileName }) {
  const { profileWzData } = useContext(Context);

  const { users, user } = useContext(Context);

  const [avatar, setAvatar] = useState("");

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
  //info to use in photos ->
  const searchedUserInfo = users.find(
    (_user) => _user.displayName === profileName
  );

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
      Number(profileWzData?.kdRatio.toFixed(4)) ==
        Number(userInfo.lastKd.toFixed(4)) &&
      profileWzData?.wins == userInfo.lastWins
    )
      return;

    /* if we dont have profileWzData return */
    if (profileWzData === null) return;

    /* if there are new wins we want to create a rewardPost AND update user stats */
    if (profileWzData?.wins > userInfo.lastWins) {
      db.collection("posts")
        .add({
          isRewardPost: true,
          avatar: userInfo.profileAvatar,
          fullName: users.find((item) => item.displayName === user?.displayName)
            .fullName,
          userName: user?.displayName,
          postText: `His total BR-wins is now ${profileWzData?.wins}. Congrats!`,
          postImg:
            "https://i.pinimg.com/736x/99/e7/55/99e755bcd84c42a684c7f23a8679340e.jpg",
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          newWinsAmount: profileWzData?.wins - userInfo.lastWins,
        })
        .then(() => {
          db.collection("users")
            .doc(
              users.find((item) => item.displayName === user?.displayName).id
            )
            .set({
              ...userInfo,
              lastKd: profileWzData?.kdRatio,
              lastWins: profileWzData?.wins,
            });
        });
    } else {
      /* else, just update the user with new kd stats */
      db.collection("users")
        .doc(users.find((item) => item.displayName === user?.displayName).id)
        .set({
          ...userInfo,
          lastKd: profileWzData?.kdRatio,
          /* lastWins: profile?.wins, */
        });
    }

    /* try react hot toast for notifyhing the user what happened. Use Timeout and 
    extend the loading time */
  };

  const [tempEffect, setTempEffect] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setTempEffect(true);
    }, 200);
  }, []);

  return (
    <div className="mx-2.5 mt-1">
      <div
        className={` ${!tempEffect && "!opacity-0"} ${
          tempEffect && "!transform !transition !duration-500 !ease-in-out"
        } xs:p-5     bg-gray-100 border border-gray-300 drop-shadow-lg   flex flex-col  xs:flex-row   rounded-2xl max-w-lg  !mx-auto `}
      >
        <div className={`relative flex justify-center     `}>
          <LazyLoadImage
            loading="lazy" /* ..? */
            alt=""
            /* src={avatar} */
            src={searchedUserInfo?.profileAvatar}
            className=" rounded-t-2xl rounded-b-none xs:rounded-lg  w-full xs:mr-3 xs:max-w-profileAvatar  xs:object-cover  xs:mb-0 mb-1.5"
          />
          <LazyLoadImage
            loading="lazy" /* ..? */
            src={searchedUserInfo?.photoURL}
            alt=""
            className={`  xs:hidden -bottom-4 absolute z-50 rounded-full h-22 w-22 ${
              userInfo && "border-3"
            } border-blueish/80/ border-blue-200`}
          />
          {/* <img
            src={userInfo?.photoURL}
            alt=""
            className={`  xs:hidden -bottom-4 absolute z-50 rounded-full h-22 w-22 ${
              userInfo && "border-3"
            } border-blueish/80/ border-blue-200`}
          /> */}
        </div>

        <div className=" w-89% /w-11/12 flex// flex-col// mx-auto xs:!ml-2.5   mb-2      ">
          <div className="flex items-center xs:justify-between     mb-1">
            <h2 className="font-bold text-lg xs:text-xl ">
              {/* {user?.displayName} */}
              {profileName}
            </h2>

            {user?.displayName === profileName && (
              <RefreshIcon
                onClick={handleUpdateData}
                className=" ml-auto   h-5 w-5 text-gray-600 transform ease-out transition duration-150 hover:rotate-90 cursor-pointer"
              />
            )}
          </div>
          {/* underline gray ... */}
          <div className=" bg-gray-300 h-0.5 mb-2 w-full " />

          <div className="flex flex-col space-y-1.5">
            {/* KD INFO DIV/SECTION */}
            <section className="flex items-center">
              <h4 className="font-semibold">K/D:&nbsp;</h4>

              {!profileWzData ? (
                <div
                  className={`font-extralight text-sm italic  ${
                    loadingStats && "font-normal h-4 w-4"
                  } `}
                >
                  {loadingStats ? (
                    <LazyLoadImage className="" src="/spinner2.svg" alt="" />
                  ) : (
                    "stats not fetched"
                  )}
                </div>
              ) : (
                <p className={`font-light`}>
                  {Number(profileWzData?.kdRatio)?.toFixed(4)}
                </p>
              )}

              <p className={`font-light ml-2    `}>
                {/* IF KD EQUALS LASTKD -> display gray arrow forward */}
                {Number(profileWzData?.kdRatio?.toFixed(4)) ==
                  Number(userInfo?.lastKd?.toFixed(4)) && (
                  <ArrowCircleUpIcon className="w-5 h-5 ml-0.5 rotate-90 text-gray-500  " />
                )}
              </p>
              {/* IF KD IS UP->display green text(the diff) */}
              {Number(profileWzData?.kdRatio?.toFixed(4)) >
                Number(userInfo?.lastKd?.toFixed(4)) && (
                <div className="flex items-center space-x-0.5 text-green-500">
                  <ArrowCircleUpIcon className="w-5 h-5 ml-0.5 rotate-45   " />
                  <p className="font-light text-sm  italic">
                    (
                    {Number(profileWzData?.kdRatio - userInfo.lastKd).toFixed(
                      4
                    )}
                    )
                  </p>
                </div>
              )}
              {/* IF KD IS DOWN->display red text(the diff) */}
              {Number(profileWzData?.kdRatio?.toFixed(4)) <
                Number(userInfo?.lastKd?.toFixed(4)) && (
                <div className="flex items-center space-x-0.5 text-red-500">
                  <ArrowCircleDownIcon className="w-5 h-5 ml-0.5 -rotate-45  " />
                  <p className="font-light text-sm italic">
                    (
                    {Number(profileWzData?.kdRatio - userInfo.lastKd).toFixed(
                      4
                    )}
                    )
                  </p>
                </div>
              )}
            </section>
            {/* END OF KD INFO DIV */}

            {/* WINS INFO DIV/SECTION */}
            <section className="flex items-center">
              <h4 className="font-semibold">Wins:&nbsp;</h4>

              {!profileWzData ? (
                <>
                  {loadingStats ? (
                    <LazyLoadImage
                      className="h-4 w-4"
                      src="/spinner2.svg"
                      alt=""
                    />
                  ) : (
                    ""
                  )}
                </>
              ) : (
                <p className={`font-light`}>{profileWzData?.wins}</p>
              )}

              <p className={`font-light ml-2  `}>
                {profileWzData?.wins == userInfo?.lastWins && (
                  <ArrowCircleUpIcon className="w-5 h-5 ml-0.5 rotate-90 text-gray-500  " />
                )}
              </p>
              {/* IF WINS ARE UP->display green text(the diff) */}
              {profileWzData?.wins > userInfo?.lastWins && (
                <div className="flex items-center space-x-0.5 text-green-500">
                  <ArrowCircleUpIcon className="w-5 h-5 ml-0.5 rotate-45  " />
                  <p className="font-light text-sm  italic">
                    ({profileWzData?.wins - userInfo?.lastWins})
                  </p>
                </div>
              )}
            </section>

            {/* GULAG TESTING TEMP STATS */}
            <section className="flex items-center">
              <h4 className="font-semibold">Weekly Gulag K/D:&nbsp;</h4>

              {!profileWzData?.gulagKd ? (
                <>
                  {loadingAdditionalStats || loadingStats ? (
                    <LazyLoadImage
                      className="h-4 w-4"
                      src="/spinner2.svg"
                      alt=""
                    />
                  ) : (
                    ""
                  )}
                </>
              ) : (
                <p className={`font-light`}>
                  {Number(profileWzData?.gulagKd).toFixed(2)} (
                  {profileWzData?.gulagKills}/{profileWzData?.gulagDeaths})
                </p>
              )}
            </section>

            {/* EXECUTIONS TEMP TEST */}
            {/* <div className="flex items-center">
              <h4 className="font-semibold">Weekly executions:&nbsp;</h4>

              {!profileWzData?.executionsWeekly ? (
                <p
                  className={`font-extralight text-sm italic   ${
                    (loadingAdditionalStats || loadingStats) &&
                    "animate-pulse font-normal"
                  }`}
                >
                  {loadingAdditionalStats || loadingStats
                    ? "Loading Stats"
                    : ""}
                </p>
              ) : (
                <p className={`font-light`}>
                  {profileWzData?.executionsWeekly}
                </p>
              )}
            </div> */}

            {/* REBIRTH stats */}
            <section className="flex items-center">
              <h4 className="font-semibold">Weekly Rebirth Quads K/D:&nbsp;</h4>

              {!profileWzData?.rebirthQuadWeeklyKd ? (
                <>
                  {loadingAdditionalStats || loadingStats ? (
                    <LazyLoadImage
                      className="h-4 w-4"
                      src="/spinner2.svg"
                      alt=""
                    />
                  ) : (
                    ""
                  )}
                </>
              ) : (
                <p className={`font-light`}>
                  {Number(profileWzData?.rebirthQuadWeeklyKd).toFixed(2)}
                </p>
              )}
            </section>

            {/* TEST TEMP GRAY LINE seperating stats from user info */}
            <div className=" bg-gray-200 h-0.5 mb-2 w-full" />

            <section className="flex items-center group ">
              <h3 className="font-semibold flex items-center">
                Favorite saying:&nbsp;
                <p className={`font-light `}>
                  {!favoriteSayingEditing &&
                    users?.find(
                      (item) => item?.displayName === user?.displayName
                    )?.favoriteSaying}
                </p>
              </h3>

              {!favoriteSayingEditing && user?.displayName === profileName && (
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
                      onClick={() => setFavoriteSayingEditing((prev) => !prev)}
                    />
                  )}
                </>
              )}
            </section>

            <section className="flex items-center group ">
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

              {!avatarEditing && user?.displayName === profileName && (
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
            </section>

            <section className="flex items-center">
              <h3 className="font-semibold">Strengths:&nbsp;</h3>
              <p className="font-light">...</p>
              {/* <PencilIcon className="postIcon profileEditIconEffects" /> */}
            </section>
            <section className="flex items-center">
              <h3 className="font-semibold">Weaknesses:&nbsp;</h3>
              <p className="font-light">...</p>
              {/* <PencilIcon className="postIcon profileEditIconEffects" /> */}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
