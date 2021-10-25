import Head from "next/head";
import Feed from "../components/Feed";
import Sidebar from "../components/Sidebar";
import Widgets from "../components/Widgets";

export default function Home() {
  return (
    <div className="flex flex-row">
      <Head>
        <title>DUGB3</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Sidebar */}
      <Sidebar />

      {/* (page)feed */}
      <Feed />

      {/* -Tweetbox */}
      {/* Posts */}

      {/* Widgets */}
      <Widgets />
    </div>
  );
}
