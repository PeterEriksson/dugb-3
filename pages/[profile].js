import Profile from "../components/Profile";
import Head from "next/head";
import { useContext } from "react";
import { Context } from "../Context";
import { useState } from "react";
import { useEffect } from "react";

/* COMMENT OUT fetch request if not testing api */
export async function getServerSideProps({ params }) {
  const { profile } = params;

  /* const res = await fetch(
    //`https://call-of-duty-modern-warfare.p.rapidapi.com/weekly-stats/${profile}/psn`,
    `https://call-of-duty-modern-warfare.p.rapidapi.com/warzone/${profile}/psn`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPID_KEY,
        "x-rapidapi-host": "call-of-duty-modern-warfare.p.rapidapi.com",
      },
    }
  );
  const data = await res.json(); */
  //const { br } = await res.json();

  return {
    props: {
      //data,
      //br,
      profile,
    },
  };
}

function profile({ /*  data: wzData, */ /* br: wzData, */ profile }) {
  /* console.log(wzData);
  console.log(profile); */

  const { setProfileWzData, profileWzData, user } = useContext(Context);
  const [loadingStats, setLoadingStats] = useState(false);
  const [loadingAdditionalStats, setLoadingAdditionalStats] = useState(false);

  /* const getWeeklyStats = async () => {
    setLoadingAdditionalStats(true);
    const resWeekly = await fetch(
      `https://call-of-duty-modern-warfare.p.rapidapi.com/weekly-stats/${profile}/psn`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPID_KEY,
          "x-rapidapi-host": "call-of-duty-modern-warfare.p.rapidapi.com",
        },
      }
    );
    const dataWeekly = await resWeekly.json();
    //dataWeekly && console.log(dataWeekly);
    dataWeekly &&
      setProfileWzData((prev) => ({
        ...prev,
        gulagKd:
          dataWeekly?.wz?.all?.properties?.gulagKills /
          dataWeekly?.wz?.all?.properties?.gulagDeaths,
        gulagKills: dataWeekly?.wz?.all?.properties?.gulagKills,
        gulagDeaths: dataWeekly?.wz?.all?.properties?.gulagDeaths,
        rebirthQuadWeeklyKd:
          dataWeekly?.wz?.mode?.br_rebirth_rbrthquad?.properties?.kdRatio,
        executionsWeekly: dataWeekly?.wz?.all?.properties?.executions,
      })); //ok

    dataWeekly && setLoadingAdditionalStats(false);
  }; */

  /* Solution for: call api limited times. Called via Load Stats button. Avoid calling every time we enter Profile-page.. Save api calls... */
  /* 30/11-22 Now new api. Weekly is in same endpoint. Dont need to do two api calls anymore. Comment out getWeeklyStats */
  const getStats = async () => {
    if (profileWzData) return;
    try {
      setLoadingStats(true);
      const res = await fetch(
        `https://call-of-duty-modern-warfare.p.rapidapi.com/warzone/${profile}/psn`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPID_KEY,

            "x-rapidapi-host": "call-of-duty-modern-warfare.p.rapidapi.com",
          },
        }
      );

      /* const { br } = await res.json(); */
      const { data } = await res.json();
      const br = data.lifetime.mode.br.properties;

      /* br && setProfileWzData(br);
      br && setLoadingStats(false); */
      /* test temp.. */
      data && setProfileWzData(data);
      data && setLoadingStats(false);

      //only fetch if first api call worked
      //Rate Limit Basic: one request per second

      //30/11-22 Now new api...do some clean up
      /*  br && setLoadingAdditionalStats(true);
      br &&
        setTimeout(() => {
          //getWeeklyStats();  
        }, 2700); */
    } catch (err) {
      console.log(err);
      setLoadingStats(false);
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
        <title>{profile}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <p className="font-bold text-2xl py-3 ml-3 border-b border-grayish">
        Profile
      </p>

      <Profile
        loadingStats={loadingStats}
        loadingAdditionalStats={loadingAdditionalStats}
        profileName={profile}
      />

      {user.displayName == profile && (
        <button
          disabled={profileWzData || loadingStats || loadingAdditionalStats}
          className={` ${
            !tempEffect
              ? "!opacity-0"
              : "transform !transition !duration-300 !ease-in-out"
          }   
        ${!profileWzData ? "hover:opacity-75 " : " opacity-100"}    ${
            profileWzData && "!line-through"
          } mt-2  disabled:bg-gray-300  p-3 bg-blueish/90 flex w-24/ mx-auto text-white text-sm rounded-xl`}
          onClick={getStats}
        >
          Fetch stats
        </button>
      )}
    </div>
  );
}

export default profile;
