import Profile from "../components/Profile";
import Head from "next/head";
/* import { useEffect } from "react"; */

function profile() {
  return (
    <div className="flex flex-col h-screen border-l border-grayish w-full">
      <Head>
        <title>DUGB3 Profile</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <p className="font-bold text-2xl py-3 ml-4">Profile | schmetir</p>

      <Profile />
    </div>
  );
}

export default profile;
