import Profile from "../components/Profile";
import Head from "next/head";
import { useContext } from "react";
import { Context } from "../Context";
import { useState } from "react";
import { useEffect } from "react";

/* COMMENT OUT if working with design */

export async function getServerSideProps({ params }) {
  const { profileName } = params;

  /* const res = await fetch(
    `https://call-of-duty-modern-warfare.p.rapidapi.com/warzone/${profileName}/psn`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPID_KEY,
        "x-rapidapi-host": "call-of-duty-modern-warfare.p.rapidapi.com",
      },
    }
  );
  const data = await res.json(); */

  return {
    props: {
      /* data, */
      profileName,
    },
  };
}

function profileName({ /* data: wzData, */ profileName }) {
  const { setProfileWzData, profileWzData } = useContext(Context);

  const [loadingStats, setLoadingStats] = useState(false);
  /* Solution for: call api only once. Not on every time we enter Profile-page. Save api calls... */
  const getStats = async () => {
    if (profileWzData) return;
    setLoadingStats(true);
    const res = await fetch(
      `https://call-of-duty-modern-warfare.p.rapidapi.com/warzone/${profileName}/psn`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPID_KEY,

          "x-rapidapi-host": "call-of-duty-modern-warfare.p.rapidapi.com",
        },
      }
    );
    const data = await res.json();

    data && setProfileWzData(data);
    console.log(data);

    data && setLoadingStats(false);
    console.log(loadingStats);
  };

  const [tempEffect, setTempEffect] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setTempEffect(true);
    }, 200);
  }, []);

  return (
    <div className="flex flex-col border-l border-r border-grayish w-full    h-screen">
      <Head>
        <title>{profileName}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <p className="font-bold text-2xl py-3 text-center border-b border-grayish">
        Profile
      </p>

      <Profile />

      <button
        disabled={profileWzData || loadingStats}
        className={` ${
          !tempEffect
            ? "!opacity-0"
            : "transform !transition !duration-500 !ease-in-out"
        }   
        ${!profileWzData ? "hover:opacity-75 " : " opacity-100"}    ${
          profileWzData && "!line-through"
        } mt-2  disabled:bg-gray-300  p-3 bg-blueish/90 flex w-24/ mx-auto text-white text-sm rounded-xl`}
        onClick={getStats}
      >
        Load stats
      </button>
    </div>
  );
}

export default profileName;
