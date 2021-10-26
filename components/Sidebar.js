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
import Link from "next/link";

function Sidebar({ children }) {
  const router = useRouter();
  return (
    <div className="flex flex-row">
      <div className=" h-screen w-56 font-mainFontHelv p-7 flex flex-col border-r border-grayish ">
        <div className="flex flex-col  space-y-4">
          <div className="cursor-pointer shadow-lg flex items-center justify-center">
            <LazyLoadImage
              className=""
              alt=""
              src="https://images.unsplash.com/photo-1602901248692-06c8935adac0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2FsbCUyMG9mJTIwZHV0eXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
            />
          </div>

          <div onClick={() => router.push("/")} className="sidebarBtn group">
            <HomeIcon className="icon" />
            <a className="iconText hidden smallerTest:inline-flex">Home</a>
          </div>

          <div
            onClick={() => router.push("/profile")}
            className="sidebarBtn group"
          >
            <UserIcon className="icon" />
            <p className="iconText hidden smallerTest:inline-flex">Profile</p>
          </div>

          <div
            onClick={() => router.push("/search")}
            className="sidebarBtn group"
          >
            <SearchIcon className="icon" />
            <p className="iconText hidden smallerTest:inline-flex">Search</p>
          </div>
          <div className="sidebarBtn group">
            <ClipboardListIcon className="icon" />
            <p className="iconText hidden smallerTest:inline-flex">Lists</p>
          </div>
          <div className="sidebarBtn group">
            <BellIcon className="icon" />
            <p className="iconText hidden smallerTest:inline-flex">
              Notifications
            </p>
          </div>
          <div className="sidebarBtn group">
            <GiftIcon className="icon" />
            <p className="iconText hidden smallerTest:inline-flex">Loadouts</p>
          </div>
          <div
            onClick={() => router.push("/about")}
            className="sidebarBtn group"
          >
            <InformationCircleIcon className="icon" />
            <p className="iconText hidden smallerTest:inline-flex">About</p>
          </div>
          <div className="sidebarBtn group">
            <LogoutIcon className="icon" />
            <p className="iconText hidden smallerTest:inline-flex">Log out</p>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}

export default Sidebar;
