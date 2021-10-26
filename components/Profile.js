import { useEffect, useState } from "react";

/* import { CircularProgress } from "@material-ui/core"; */
/* import { Context } from "./Context"; */

function Profile() {
  const [profile, setProfile] = useState({});
  const [searchOk, setSearchOk] = useState(false);
  /* const { user } = useContext(Context); */
  /*  const { users } = useContext(Context); */

  useEffect(() => {
    const getProfile = async () => {
      await fetch(
        /* `https://call-of-duty-modern-warfare.p.rapidapi.com/warzone/${user.displayName}/psn`, */
        "https://call-of-duty-modern-warfare.p.rapidapi.com/warzone/schmetir/psn",
        {
          method: "GET",
          headers: {
            "x-rapidapi-key":
              "6cb5ccf59dmsh35a1e1cf90546e8p1291dajsnc92e6565a8e2",
            "x-rapidapi-host": "call-of-duty-modern-warfare.p.rapidapi.com",
          },
        }
      )
        .then((response) => response.json())
        .then((response) => {
          //console.log(response);
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
    <div className="profile">
      {searchOk ? (
        <div className="profile__found">
          {/* <h2>{user.displayName}</h2> */}
          <h2>schmetir</h2>
          <div className="profile__found__wins">
            <h3>Wins: </h3> <p>{profile.wins}</p>
          </div>
          <div className="profile__found__kd">
            <h3>K/D: </h3>
            <p>{Number(profile.kdRatio).toFixed(3)}</p>
          </div>
          <div className="profile__found__nurrminatorIndex">
            <h3>Nurrminator index(gp/w): </h3>
            <p> {profile.gamesPlayed / profile.wins}</p>
          </div>
          <div className="profile__found__description">
            <h3>Description: </h3>
            {/* <p>{currentUser[0]?.description}</p> */}
          </div>
          <div className="profile__found__strengths">
            <h3>Stengths:</h3>
            <p>...</p>
          </div>
          <div className="profile__found__weaknesses">
            <h3>Weaknesses:</h3>
            <p>...</p>
          </div>
        </div>
      ) : (
        <p>loading</p>
        /* insert Spinner here (copy from Countries main project) */
      )}
    </div>
  );
}

export default Profile;
