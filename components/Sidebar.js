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
        <div className="flex flex-row">
          <div className=" h-screen w-56  font-mainFontHelv px-7  pt-3  flex flex-col  border-grayish ">
            <div className="flex flex-col  space-y-4">
              <LazyLoadImage
                onClick={() => router.push("/")}
                className="h-16 object-cover shadow-lg cursor-pointer"
                alt=""
                src="https://i.pinimg.com/236x/b4/7f/6c/b47f6c1f5324411fb9a3c8d730b93ece.jpg"
              />

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
              {/* refactor when notifications page is set up. */}
              {/* <div className="sidebarBtn group">
                <BellIcon className="icon" />
                <p className="iconText hidden smallerTest:inline-flex">
                  Notifications
                </p>
              </div> */}

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
        </div>
      ) : (
        // user/guest has not logged in (temp) ->
        <Login />
      )}
    </>
  );
}

export default Sidebar;
