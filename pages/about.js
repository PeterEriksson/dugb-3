import About from "../components/About";
import Head from "next/head";

function about() {
  return (
    <div className="flex flex-col">
      <Head>
        <title>DUGB3 About</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <About />
    </div>
  );
}

export default about;
