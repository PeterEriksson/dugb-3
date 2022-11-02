import "../styles/globals.css";
import { ContextProvider } from "../Context";
import AppAuthComponent from "../components/AppAuthComponent";

function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
      <AppAuthComponent>
        <Component {...pageProps} />
      </AppAuthComponent>
    </ContextProvider>
  );
}

export default MyApp;
