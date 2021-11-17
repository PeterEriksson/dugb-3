import { useContext, useEffect, useState } from "react";
import { Context } from "../Context";
import LoadingSpinner from "./LoadingSpinner";

function Profile() {
  const [profile, setProfile] = useState({});
  const [searchOk, setSearchOk] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      await fetch(
        "https://call-of-duty-modern-warfare.p.rapidapi.com/warzone/schmetir/psn",
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
          /* console.log(response); */
          if (response.br) {
            setSearchOk(true);
          } else {
            setSearchOk(false);
          }
          setProfile(response.br);
          //console.log(profile);
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
            src="https://i.pinimg.com/236x/79/44/69/794469d92431bd6d291755f35a4a6530.jpg"
            className="rounded-2xl max-w-xs h-72"
          />
          <div className="ml-8 flex flex-col justify-center mb-2">
            <h2 className="font-bold text-xl mb-2">schmetir</h2>
            <div className="flex flex-col space-y-1.5">
              <div className="flex">
                <h3 className="font-semibold">K/D:&nbsp;</h3>
                <p className="font-light">
                  {Number(profile.kdRatio).toFixed(3)}
                </p>
              </div>
              <div className="flex">
                <h3 className="font-semibold">Wins:&nbsp;</h3>
                <p className="font-light">{profile.wins}</p>
              </div>

              <div className="flex">
                <h3 className="font-semibold">Top five:&nbsp;</h3>
                <p className="font-light">{profile.topFive}</p>
              </div>
              <div className="flex">
                <h3 className="font-semibold">Clans:&nbsp;</h3>
                <p className="font-light">[SHP]</p>
              </div>
              <div className="flex">
                <h3 className="font-semibold">Favorite saying:&nbsp;</h3>
                <p className="font-light">revivea mig</p>
              </div>
              <div className="flex">
                <h3 className="font-semibold">Stengths:&nbsp;</h3>
                <p className="font-light">...</p>
              </div>
              <div className="flex">
                <h3 className="font-semibold">Weaknesses:&nbsp;</h3>
                <p className="font-light">...</p>
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
