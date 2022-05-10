import About from "../components/About";
import Head from "next/head";
import Heart from "../components/Heart";

function about() {
  return (
    <div className="flex border-l border-grayish border-r flex-col">
      <Head>
        <title>DUGB3 About</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <About />
      <Heart />
    </div>
  );
}

export default about;
