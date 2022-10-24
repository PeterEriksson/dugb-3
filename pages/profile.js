import Profile from "../components/Profile";
import Head from "next/head";
/* import { useEffect } from "react"; */

function profile() {
  return (
    <div className="flex flex-col border-l border-r border-grayish w-full    h-screen">
      <Head>
        <title>DUGB3 Profile</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <p className="font-bold text-2xl py-3 /ml-4 text-center border-b border-grayish">
        Profile
      </p>

      <Profile />
    </div>
  );
}

export default profile;
