import Head from "next/head";
import Feed from "../components/Feed";
import Sidebar from "../components/Sidebar";

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
      {/* ...sidebar to right, only show for larger screen sizes.. */}
    </div>
  );
}
