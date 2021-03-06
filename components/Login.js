import { useContext, useState } from "react";
import { Context } from "../Context";
import RegisterUserModal from "./RegisterUserModal";
import LoginModal from "./LoginModal";

function Login() {
  const { userGuest, setUserGuest } = useContext(Context);

  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openRegisterUserModal, setOpenRegisterUserModal] = useState(false);

  return (
    <div className="bg-loginPic bg-cover bg-center h-screen">
      <div className="flex flex-col h-full items-center">
        <h1 className="sm:text-5xl text-2xl mt-10 font-bold text-white tracking-wider">
          HELIGA GIBBLOCKET 3.0
        </h1>
        <h2 className="italic sm:text-xl text-base mt-8 font-normal text-white">
          Statistik, fakta, skvaller
        </h2>

        {/* top buttons section */}
        <section className="flex flex-row mt-auto mb-4    ">
          <button
            onClick={() => setOpenLoginModal((prev) => !prev)}
            className="text-white py-2     w-24 sm:w-36 sm:py-4   border border-white hover:bg-white hover:text-black"
          >
            Log in
          </button>
          <button
            /* onClick={() => setOpenRegisterUserModal((prev) => !prev)} */
            className="text-white  py-2    w-24 sm:w-36 sm:py-4       border-t border-b border-r border-white hover:bg-white hover:text-black"
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
          className="text-white rounded-md border border-white px-4 mb-6 hover:bg-white hover:text-black      "
        >
          Guest
        </button>

        {/* TEST TEMP (about-info) */}
        {/* <details className="text-xs text-center py-1 px-2.5 max-w-detailsAboutLogin border border-white rounded-md">
          <summary className="cursor-pointer text-white">About</summary>

          <p className="text-xs text-white">
            Warzone-portal f??r seri??sa elitgibbare. Ditt andra hem fr??n
            Caldera/Verdansk. Posta skvaller, skapa listor, bed??m spelare, spana
            in din och dina v??nners statistik. V??lkommen till det heliga
            gibblocket 3.0
          </p>
        </details> */}
      </div>
    </div>
  );
}

export default Login;
