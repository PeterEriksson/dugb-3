import About from "../components/About";
import Head from "next/head";

function about() {
  return (
    <div className="flex flex-col">
      <Head>
        <title>About</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <About />
    </div>
  );
}

export default about;
