/* import 'tailwindcss/tailwind.css' */
import Sidebar from "../components/Sidebar";
import Widgets from "../components/Widgets";
import "../styles/globals.css";
import { ContextProvider } from "../Context";

function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
      <Sidebar>
        <Component {...pageProps} />
        <Widgets />
      </Sidebar>
    </ContextProvider>
  );
}

export default MyApp;
