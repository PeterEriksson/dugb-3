import { PencilIcon, SearchIcon } from "@heroicons/react/outline";
import Head from "next/head";
import { useContext, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { Context } from "../Context";

function search() {
  const [searchText, setSearchText] = useState("");
  const [profile, setProfile] = useState({});
  const [currentProfile, setCurrentProfile] = useState(null);
  const [searched, setSearched] = useState(true);
  const [hide, setHide] = useState(true);
  const [errorMsg, setErrorMsg] = useState(false);

  const { users } = useContext(Context);

  const handleForm = (e) => {
    e.preventDefault();
    const getProfile = async () => {
      setSearched(false);
      await fetch(
        `https://call-of-duty-modern-warfare.p.rapidapi.com/warzone/${searchText}/psn`,
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
          if (response.error || searchText === "") {
            setErrorMsg(true);
          } else {
            setErrorMsg(false);
          }
          setProfile(response.br);
          setCurrentProfile(searchText);
        })
        .catch((err) => {
          console.log(err);
        });
      setHide(false);
      setSearched(true);
      setSearchText("");
    };

    getProfile();
  };

  const searchReturnDiv = () => {
    if (!searched) {
      return <LoadingSpinner />;
    } else if (currentProfile && !errorMsg) {
      return (
        <div
          className={`${
            hide ? "hidden" : "ml-3 mt-5"
          }  flex flex-row  p-5 mt-1.5 bg-grayish rounded-2xl max-w-2xl mr-5 mdLgTest:mr-0 `}
        >
          <img
            alt=""
            src="https://i.pinimg.com/236x/89/51/60/895160aa966c6271c6f211b253671176.jpg"
            className="rounded-2xl max-w-xs h-72"
          />
          <div className="ml-8 flex flex-col justify-center mb-2">
            <h2 className="font-bold text-xl mb-2">{currentProfile}</h2>
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
              {/* <div className="flex">
              <h3 className="font-semibold">Top ten:&nbsp;</h3>
              <p className="font-light">{profile.topTen}</p>
            </div> */}
              <div className="flex">
                <h3 className="font-semibold">Clans:&nbsp;</h3>
                <p className="font-light">[SHP]</p>
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
      );
    } else if (errorMsg) {
      return <p>could not find player</p>;
    }
  };

  return (
    <div className="flex border-l border-grayish flex-col w-full">
      <Head>
        <title>DUGB3 search</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <p className="font-bold   border-b border-grayish text-2xl py-3 text-center">
        Search (beta)
      </p>

      {/* SEARCH FIELD */}
      <div className="flex justify-center ">
        <form
          onSubmit={(e) => handleForm(e)}
          className="w-72 hover:drop-shadow-lg"
        >
          <div className="relative mt-1 p-3 rounded-md  ">
            <div className="absolute z-30 inset-y-0 pl-3 flex items-center pointer-events-none ">
              <SearchIcon className="h-5 w-5 text-gray-500 " />
            </div>
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="bg-gray-50 //focus:ring-black //focus:border-black focus:border-gray-300 focus:ring-0 pl-10 w-full block sm:text-sm border-gray-300 rounded-md"
              placeholder="search for a player"
            />
          </div>
        </form>
      </div>
      <p className="text-center text-xs font-light">
        suggestions: (list players from db-users)
      </p>

      {/*DIV SEARCH SUGGESTIONS  */}
      <div className="flex w-72 space-x-1.5 mx-auto mt-2">
        {users.map((item, i) => (
          <div
            onClick={() => setSearchText(item.displayName)}
            className="py-1 px-3 hover:bg-gray-300  cursor-pointer drop-shadow-sm rounded-full bg-grayish border border-gray-300"
            key={i}
          >
            <p className=" text-sm font-normal">{item?.displayName}</p>
          </div>
        ))}
      </div>

      {/* {searchReturnDiv()} */}

      {/* SEARCH PROFILE TEMP */}
      <div className="ml-5 flex flex-row p-5 mt-1.5 bg-grayish rounded-2xl max-w-2xl mr-5 mdLgTest:mr-0 ">
        <img
          alt=""
          src="https://i.pinimg.com/236x/89/51/60/895160aa966c6271c6f211b253671176.jpg"
          className="rounded-2xl max-w-xs h-72"
        />
        <div className="ml-8 flex flex-col justify-center //w-full mb-2">
          <h2 className="font-bold text-xl mb-2">nurrminator</h2>
          <div className="flex flex-col space-y-1.5">
            <div className="flex">
              <h3 className="font-semibold">K/D:&nbsp;</h3>
              <p className="font-light">0.723</p>
            </div>
            <div className="flex">
              <h3 className="font-semibold">Wins:&nbsp;</h3>
              <p className="font-light">15</p>
            </div>

            <div className="flex">
              <h3 className="font-semibold">Top five:&nbsp;</h3>
              <p className="font-light">158</p>
            </div>
            <div className="flex items-center group">
              <h3 className="font-semibold">Clans:&nbsp;</h3>
              <p className="font-light">[SHP]</p>
            </div>
            <div className="flex items-center group">
              <h3 className="font-semibold">Favorite saying:&nbsp;</h3>
              <p className="font-light">fan skulle ja göra</p>
              <PencilIcon className="postIcon profileEditIconEffects" />
            </div>
            <div className="flex items-center group">
              <h3 className="font-semibold">Stengths:&nbsp;</h3>
              <p className="font-light">...</p>
              <PencilIcon className="postIcon profileEditIconEffects" />
            </div>
            <div className="flex items-center group">
              <h3 className="font-semibold">Weaknesses:&nbsp;</h3>
              <p className="font-light">...</p>
              <PencilIcon className="postIcon profileEditIconEffects" />
            </div>
          </div>
        </div>
      </div>
      {/* ☝ END OF SEARCH PROFILE TEMP */}
    </div>
  );
}

export default search;
