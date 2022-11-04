import About from "../components/About";
import Head from "next/head";
import styles from "../styles/effects.module.css";
import { useState } from "react";

function about() {
  const [animate, setAnimate] = useState(true);

  console.log(animate);

  return (
    <div className="flex border-l border-grayish border-r flex-col">
      <Head>
        <title>DUGB3 About</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <About />

      {/* TEST TEMP twitter like btn */}
      <div
        onClick={() => setAnimate((prev) => !prev)}
        className={`${styles.heartRed} ${animate && styles.animate}  ${
          !animate && styles.animateUnlike
        } `}
      />
    </div>
  );
}

export default about;
