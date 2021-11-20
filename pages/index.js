import Head from "next/head";
import { useContext } from "react";
import Feed from "../components/Feed";
import Post from "../components/Post";
import Tweetbox from "../components/Tweetbox";
import { Context } from "../Context";

export default function Home() {
  const { englishLanguage, setEnglishLanguage } = useContext(Context);
  return (
    <div className="flex flex-col w-full mr-3 border-r border-t border-l mdLgTest:mr-0">
      <Head>
        <title>DUGB3</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex items-center">
        <p className="font-bold text-2xl py-3 ml-4">{`Home | ${
          englishLanguage ? "Gossip" : "Skvaller"
        }`}</p>
        <p
          onClick={() => setEnglishLanguage((prev) => !prev)}
          className="ml-auto mr-4 cursor-pointer"
        >
          {englishLanguage ? "🇸🇪" : "🇬🇧"}
        </p>
      </div>
      <Tweetbox />

      <Feed />
    </div>
  );
}
