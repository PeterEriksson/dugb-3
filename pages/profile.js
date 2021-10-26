import Profile from "../components/Profile";
import Head from "next/head";

function profile() {
  return (
    <div className="flex flex-col w-full">
      <Head>
        <title>DUGB3 Profile</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Profile />
    </div>
  );
}

export default profile;
