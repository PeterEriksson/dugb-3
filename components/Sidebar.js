import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  BellIcon,
  ClipboardListIcon,
  GiftIcon,
  InformationCircleIcon,
  LogoutIcon,
  SearchIcon,
  UserIcon,
} from "@heroicons/react/outline";
function Sidebar() {
  return (
    <div className=" h-screen w-56  p-7 flex flex-col  ">
      <div className="flex flex-col  space-y-4">
        <div className="cursor-pointer shadow-lg flex items-center justify-center">
          <LazyLoadImage
            className=" "
            alt=""
            src="https://images.unsplash.com/photo-1602901248692-06c8935adac0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2FsbCUyMG9mJTIwZHV0eXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
          />
        </div>

        <div className="sidebarBtn group">
          <UserIcon className="icon" />
          <p className="iconText">Profile</p>
        </div>

        <div className="sidebarBtn group">
          <SearchIcon className="icon" />
          <p className="iconText">Search</p>
        </div>
        <div className="sidebarBtn group">
          <ClipboardListIcon className="icon" />
          <p className="iconText">Lists</p>
        </div>
        <div className="sidebarBtn group">
          <BellIcon className="icon" />
          <p className="iconText">Notifications</p>
        </div>
        <div className="sidebarBtn group">
          <GiftIcon className="icon" />
          <p className="iconText">Loadouts</p>
        </div>
        <div className="sidebarBtn group">
          <InformationCircleIcon className="icon" />
          <p className="iconText">About</p>
        </div>
        <div className="sidebarBtn group">
          <LogoutIcon className="icon" />
          <p className="iconText">Log out</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
