import Head from "next/head";
import { useContext } from "react";
import Feed from "../components/Feed";
import Post from "../components/Post";
import Tweetbox from "../components/Tweetbox";
import { Context } from "../Context";

export default function Home() {
  return (
    <div className="flex flex-col mr-3 border-r border-t border-l mdLgTest:mr-0   w-full">
      <Head>
        <title>DUGB3</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="mt-3 font-bold text-2xl ml-3 mb-2 //text-center">
        Home | Skvaller
      </h1>

      <Tweetbox />

      <Feed />
    </div>
  );
}
