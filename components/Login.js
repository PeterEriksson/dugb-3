import { useContext, useState } from "react";
import { Context } from "../Context";
import RegisterUserModal from "./RegisterUserModal";
import LoginModal from "./LoginModal";

function Login() {
  const { userGuest, setUserGuest, englishLanguage, setEnglishLanguage } =
    useContext(Context);

  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openRegisterUserModal, setOpenRegisterUserModal] = useState(false);

  return (
    <div className="bg-loginPic bg-cover h-screen">
      <div className="flex flex-col h-full items-center">
        <h1 className="text-5xl mt-10 font-bold text-white tracking-wider">
          {englishLanguage
            ? "THE HOLY GIBB BIBLE 3.0"
            : "HELIGA GIBBLOCKET 3.0"}
        </h1>
        <h2 className="italic text-xl mt-8 font-normal text-white">
          {englishLanguage
            ? "Statistics, facts, gossip"
            : "Statistik, fakta, skvaller"}
        </h2>

        {/* <div
          onClick={() => setEnglishLanguage((prev) => !prev)}
          className="mt-3 cursor-pointer"
        >
          {!englishLanguage ? "🇬🇧" : "🇸🇪"}
        </div> */}

        {/* top buttons section */}
        <section className="flex flex-row mt-auto mb-4">
          <button
            onClick={() => setOpenLoginModal((prev) => !prev)}
            className="text-white py-4 w-36 border border-white hover:bg-white hover:text-black"
          >
            Log in
          </button>
          <button
            /* onClick={() => setOpenRegisterUserModal((prev) => !prev)} */
            className="text-white  py-4 w-36 border-t border-b border-r border-white hover:bg-white hover:text-black"
          >
            Register
          </button>
        </section>
        <LoginModal
          openLoginModal={openLoginModal}
          setOpenLoginModal={setOpenLoginModal}
        />
        <RegisterUserModal
          openRegisterUserModal={openRegisterUserModal}
          setOpenRegisterUserModal={setOpenRegisterUserModal}
        />
        <button
          /* onClick={() => setUserGuest((prev) => !prev)} */
          className="text-white rounded-md border border-white px-4 mb-6 hover:bg-white hover:text-black"
        >
          Guest
        </button>

        {/* TEST TEMP (about-info) */}
        {/* <details className="text-xs text-center py-1 px-2.5 max-w-detailsAboutLogin border border-white rounded-md">
          <summary className="cursor-pointer text-white">About</summary>

          <p className="text-xs text-white">
            Warzone-portal för seriösa elitgibbare. Ditt andra hem från
            Caldera/Verdansk. Posta skvaller, skapa listor, bedöm spelare, spana
            in din och dina vänners statistik. Välkommen till det heliga
            gibblocket 3.0
          </p>
        </details> */}
      </div>
    </div>
  );
}

export default Login;
