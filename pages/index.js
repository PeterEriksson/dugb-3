import Head from "next/head";
import Feed from "../components/Feed";
import Post from "../components/Post";
import Tweetbox from "../components/Tweetbox";

export default function Home() {
  return (
    <div className="flex flex-col w-full mr-3 border-r border-t border-l mdLgTest:mr-0">
      <Head>
        <title>DUGB3</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <p className="font-bold text-2xl py-3 ml-4">Home | Skvaller</p>
      <Tweetbox />

      <Feed />
    </div>
  );
}
