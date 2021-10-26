import Head from "next/head";
import Feed from "../components/Feed";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Head>
        <title>DUGB3</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Feed />
    </div>
  );
}
