import { useContext } from "react";
import { Context } from "../Context";

function Login() {
  const { userGuest, setUserGuest } = useContext(Context);

  return (
    <div className="bg-loginPic bg-cover h-screen">
      <div className="flex flex-col h-full items-center">
        <h1 className="text-5xl mt-10 font-bold text-white tracking-wider">
          HELIGA GIBBLOCKET 3.0
        </h1>
        <h2 className="italic text-xl mt-8 font-normal text-white">
          Statistik, fakta, skvaller
        </h2>

        {/* buttons section */}
        <section className="flex flex-row mt-auto mb-4">
          <button className="text-white py-4 w-36 border border-white hover:bg-white hover:text-black">
            Log in
          </button>
          <button className="text-white  py-4 w-36 border-t border-b border-r border-white hover:bg-white hover:text-black">
            Sign up
          </button>
        </section>
        <button
          onClick={() => setUserGuest((prev) => !prev)}
          className="text-white rounded-lg border border-white px-4 mb-6 hover:bg-white hover:text-black"
        >
          Guest
        </button>
      </div>
    </div>
  );
}

export default Login;
