import Profile from "../components/Profile";
import Head from "next/head";
import { useContext } from "react";
import { Context } from "../Context";
import { useState } from "react";
import { useEffect } from "react";

/* COMMENT OUT fetch request if working with design ...or not using.*/
/* export async function getServerSideProps({ params }) {
  const { profileName } = params;

  const res = await fetch(
    //`https://call-of-duty-modern-warfare.p.rapidapi.com/weekly-stats/${profileName}/psn`,
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
  //const { br } = await res.json();

  return {
    props: {
      data,
      //br,
      profileName,
    },
  };
} */

function profileName({ /* data: wzData, */ /* br: wzData, */ profileName }) {
  /* console.log(wzData);
  console.log(profileName); */

  const { setProfileWzData, profileWzData } = useContext(Context);
  const [loadingStats, setLoadingStats] = useState(false);
  const [loadingAdditionalStats, setLoadingAdditionalStats] = useState(false);

  const getWeeklyStats = async () => {
    const resWeekly = await fetch(
      `https://call-of-duty-modern-warfare.p.rapidapi.com/weekly-stats/${profileName}/psn`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPID_KEY,
          "x-rapidapi-host": "call-of-duty-modern-warfare.p.rapidapi.com",
        },
      }
    );
    const dataWeekly = await resWeekly.json();
    dataWeekly &&
      setProfileWzData((prev) => ({
        ...prev,
        gulagKd:
          dataWeekly?.wz?.all?.properties?.gulagKills /
          dataWeekly?.wz?.all?.properties?.gulagDeaths,
        gulagKills: dataWeekly?.wz?.all?.properties?.gulagKills,
        gulagDeaths: dataWeekly?.wz?.all?.properties?.gulagDeaths,
      })); //ok

    dataWeekly && setLoadingAdditionalStats(false);
  };

  /* Solution for: call api limited times. Called via Load Stats button. Avoid calling every time we enter Profile-page.. Save api calls... */
  const getStats = async () => {
    if (profileWzData) return;
    try {
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

      const { br } = await res.json();
      br && setProfileWzData(br);
      br && setLoadingStats(false);
      br && setLoadingAdditionalStats(true);
      //only fetch if first api call worked
      //Rate Limit Basic:	one request per second
      br &&
        setTimeout(() => {
          getWeeklyStats();
        }, 2700);
    } catch (err) {
      console.log(err);
    }
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

      <Profile
        loadingStats={loadingStats}
        loadingAdditionalStats={loadingAdditionalStats}
      />

      <button
        disabled={profileWzData || loadingStats || loadingAdditionalStats}
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
