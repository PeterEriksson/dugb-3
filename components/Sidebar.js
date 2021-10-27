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
      <div className=" h-screen w-56 font-mainFontHelv px-7  pt-3  flex flex-col  border-grayish ">
        <div className="flex flex-col  space-y-4">
          <LazyLoadImage
            onClick={() => router.push("/")}
            className="h-16 object-cover shadow-lg cursor-pointer"
            alt=""
            src="https://i.pinimg.com/236x/b4/7f/6c/b47f6c1f5324411fb9a3c8d730b93ece.jpg"
          />

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
          <div
            onClick={() => router.push("/listPage")}
            className="sidebarBtn group"
          >
            <ClipboardListIcon className="icon" />
            <p className="iconText hidden smallerTest:inline-flex">Lists</p>
          </div>
          <div className="sidebarBtn group">
            <BellIcon className="icon" />
            <p className="iconText hidden smallerTest:inline-flex">
              Notifications
            </p>
          </div>
          <div
            onClick={() => router.push("/loadoutPage")}
            className="sidebarBtn group"
          >
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
