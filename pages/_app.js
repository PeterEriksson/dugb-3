/* import 'tailwindcss/tailwind.css' */
import Sidebar from "../components/Sidebar";
import Widgets from "../components/Widgets";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Sidebar>
      <Component {...pageProps} />
      <Widgets />
    </Sidebar>
  );
}

export default MyApp;
