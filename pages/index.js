import Head from "next/head";
import Feed from "../components/Feed";
import Post from "../components/Post";
import Tweetbox from "../components/Tweetbox";

export default function Home() {
  return (
    <div className=" overflow-x-hidden     border-r border-t !border-l mdLgTest:mr-0 w-full  overflow-scroll    h-auto  ">
      <Head>
        <title>Heliga Gibblocket</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className=" mt-3 font-bold xs:text-2xl text-xl ml-3 mb-2">
        Home
        <span className="text-xs font-bold ml-2 xs:ml-4 opacity-70 ">
          hobby project for educational purposes only.
        </span>
      </h1>

      <Tweetbox />

      {/* GRAY THICK BORDER SEPERATING TWEETBOX AND FEED   */}
      <hr className="bg-grayish h-2 w-full" />

      <Feed />
    </div>
  );
}
