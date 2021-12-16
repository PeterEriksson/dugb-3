import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  BellIcon,
  ClipboardListIcon,
  GiftIcon,
  InformationCircleIcon,
  LogoutIcon,
  SearchIcon,
  UserIcon,
  HomeIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";
import router from "next/router";
import SidebarOption from "./SidebarOption";
import { useContext } from "react";
import { Context } from "../Context";
import Login from "./Login";
import { auth } from "../firebase";

function Sidebar({ children }) {
  const { asPath } = useRouter();
  const { userGuest, setUserGuest, user, setUser } = useContext(Context);

  const handleLogout = () => {
    userGuest && setUserGuest(false);
    auth?.signOut();
    setUser(null);
  };

  return (
    <>
      {userGuest || user ? (
        // user or guest has logged in (temp) ->
        //TEMP DIV TEST to fix w issue -- ok.
        <div
          aria-label="entire-app-loggedIn-container"
          className="flex justify-center"
        >
          <div className="flex flex-row max-w-6xl w-full">
            <div
              aria-label="Sidebar-container"
              className="//bg-red-500  w-20 sm:w-56  h-screen font-mainFontHelv sm:px-4   sm:pt-2 flex flex-col border-grayish sticky top-0 z-50"
            >
              <div className="flex flex-col   space-y-2 sm:space-y-4">
                <LazyLoadImage
                  onClick={() => router.push("/")}
                  className="    (smaller/larger👉) h-12 mx-1 sm:mx-0 mt-2 sm:mt-0 object-contain          sm:object-cover sm:h-16 shadow-lg cursor-pointer"
                  alt=""
                  src="https://i.pinimg.com/236x/b4/7f/6c/b47f6c1f5324411fb9a3c8d730b93ece.jpg"
                />
                {/* Small size logo: */}
                {/* <LazyLoadImage
                  onClick={() => router.push("/")}
                  className="sm:hidden h-12 mx-1 mt-2    object-cover shadow-lg cursor-pointer"
                  alt=""
                  src="https://i.pinimg.com/236x/02/a6/c3/02a6c3816d820f21912c7ee66a0ce6be.jpg"
                /> */}

                <div
                  onClick={() => router.push("/")}
                  className={`sidebarBtn group`}
                >
                  <HomeIcon
                    className={`icon ${asPath === "/" && "text-blueish"}`}
                  />
                  <a
                    className={`iconText hidden smallerTest:inline-flex ${
                      asPath === "/" && "text-blueish"
                    }`}
                  >
                    Home
                  </a>
                </div>
                <SidebarOption text="Profile" Icon={UserIcon} />
                <SidebarOption text="Search" Icon={SearchIcon} />
                <SidebarOption text="Lists" Icon={ClipboardListIcon} />
                <SidebarOption text="Notifications" Icon={BellIcon} />
                <SidebarOption text="Loadouts" Icon={GiftIcon} />
                <SidebarOption text="About" Icon={InformationCircleIcon} />
                <div
                  onClick={() => handleLogout()}
                  className="sidebarBtn group"
                >
                  <LogoutIcon className="icon" />
                  <p className="iconText hidden smallerTest:inline-flex">
                    Log out
                  </p>
                </div>
              </div>
            </div>
            {children}
          </div>

          {/* TEMPDIV TEST to fix width issue --ok. */}
        </div>
      ) : (
        /*  user/guest has not logged in (temp) -> */
        <Login />
      )}
    </>
  );
}

export default Sidebar;
