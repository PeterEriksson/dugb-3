import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  /* BellIcon, */
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
import SidebarNotificationOption from "./SidebarNotificationOption";

function Sidebar({ children }) {
  const { asPath } = useRouter();
  const {
    userGuest,
    setUserGuest,
    user,
    setUser,
    loadingNotific,
    setElementIdToScrollTo,

    setProfile,
    setSearchOk,
  } = useContext(Context);

  const router = useRouter();

  const handleLogout = () => {
    if (loadingNotific) return;
    setElementIdToScrollTo("");
    userGuest && setUserGuest(false);

    router.push("/");
    auth?.signOut();
    setUser(null);
    setProfile(null);
    setSearchOk(false);
  };

  const handleHomeClick = () => {
    if (loadingNotific) return;
    setElementIdToScrollTo("");
    router.push("/");
  };

  return (
    <>
      {userGuest || user ? (
        <div
          aria-label="entire-app-loggedIn-container"
          className="flex /justify-center      /flex-row max-w-6xl w-full mx-auto"
        >
          {/* <div className="flex /flex-row /max-w-6xl /w-full"> */}
          <div
            aria-label="SIDEBAR-OUTER-CONTAINER"
            className="/bg-red-500  h-screen font-mainFontHelv sm:px-4   sm:pt-2  border-grayish sticky top-0 z-50"
          >
            <div
              aria-label="SIDEBAR-INNER-CONTAINER"
              className="flex flex-col /bg-green-400 space-y-2 sm:space-y-4"
            >
              <LazyLoadImage
                onClick={handleHomeClick}
                className="    (smaller/larger👉) h-12 mx-1 sm:mx-0 mt-2 sm:mt-0 object-contain          sm:object-cover sm:h-16 shadow-lg cursor-pointer"
                alt=""
                src="https://i.pinimg.com/236x/b4/7f/6c/b47f6c1f5324411fb9a3c8d730b93ece.jpg"
              />

              <div onClick={handleHomeClick} className={`sidebarBtn group`}>
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

              {!userGuest && <SidebarNotificationOption />}

              <SidebarOption text="Loadouts" Icon={GiftIcon} />
              <SidebarOption text="About" Icon={InformationCircleIcon} />
              <div onClick={() => handleLogout()} className="sidebarBtn group">
                <LogoutIcon className="icon" />
                <p className="iconText hidden smallerTest:inline-flex">
                  Log out
                </p>
              </div>
            </div>
          </div>
          {children}
          {/* </div> */}
        </div>
      ) : (
        /*  user/guest has not logged in -> */
        <Login />
      )}
    </>
  );
}

export default Sidebar;
