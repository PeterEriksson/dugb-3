import { PencilIcon } from "@heroicons/react/outline";
import { useContext, useEffect, useState } from "react";
import { Context } from "../Context";
import LoadingSpinner from "./LoadingSpinner";

function Profile() {
  /* TEMP COMMENT OUT, WORK DITH DUMMY DATA instead (save api calls) || work with context solution */
  /*  const [profile, setProfile] = useState({});
  const [searchOk, setSearchOk] = useState(false); */

  /* TEMP TEST THIS SOLUTION -> SAVE API CALLS */
  const { searchOk, setSearchOk } = useContext(Context);
  const { profile, setProfile } = useContext(Context);

  const { users, user } = useContext(Context);

  const [avatar, setAvatar] = useState("");

  //temp dummyData
  /* const [searchOk, setSearchOk] = useState(!false);
  const [profile, setProfile] = useState({
    kdRatio: 1.256,
    wins: 51,
    topFive: 598,
  }); */

  //inside useEffect, seemed to work.
  /* setAvatar(
        users.find((item) => item.displayName === user.displayName)
          .profileAvatar
      ); */

  /* TEMP COMMENT OUT, WORK DITH DUMMY DATA (save api calls) */
  useEffect(() => {
    const getProfile = async () => {
      //fetch in db user profile the profileAvatar
      setAvatar(
        users.find((item) => item.displayName === user.displayName)
          .profileAvatar
      );

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

  return (
    <div className="ml-4 ">
      {searchOk ? (
        <div className="flex flex-row p-5 mt-1.5 bg-grayish rounded-2xl max-w-2xl mr-5 mdLgTest:mr-0 ">
          <img
            alt=""
            /* src="https://i.pinimg.com/236x/79/44/69/794469d92431bd6d291755f35a4a6530.jpg" */
            src={avatar}
            className="rounded-2xl max-w-xs h-72"
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
              <div className="flex items-center group">
                <h3 className="font-semibold">Favorite saying:&nbsp;</h3>
                {/* <p className="font-light">revivea mig</p> */}
                <PencilIcon className="postIcon profileEditIconEffects" />
              </div>
              <div className="flex items-center group">
                <h3 className="font-semibold">Avatar:&nbsp;</h3>
                <p className="font-light truncate"></p>
                <PencilIcon className="postIcon profileEditIconEffects" />
              </div>
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
