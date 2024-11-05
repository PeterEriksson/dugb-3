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
import NavbarOption from "./NavbarOption";
import { useContext } from "react";
import { Context } from "../Context";
import NavbarNotificationOption from "./NavbarNotificationOption";

function Sidebar(/* { children } */) {
  const { userGuest, loadingNotific, setElementIdToScrollTo } =
    useContext(Context);

  const router = useRouter();

  const handleCodImageClick = () => {
    if (loadingNotific) return;
    setElementIdToScrollTo("");
    router.push("/");
  };

  return (
    <nav
      aria-label="SIDEBAR/BOTTOMBAR-CONTAINER"
      className="bottom-0  xs:top-0  xs:h-screen   font-mainFontHelv sm:px-4   xs:!pt-3 py-1  border-grayish sticky z-50             bg-white border-t xs:border-0 xs:bg-white  flex  flex-row  justify-center xs:justify-start space-x-2 xs:space-x-0  xs:flex-col  xs:py-0 sm:space-y-4 shadow-inner xs:shadow-none"
    >
      <LazyLoadImage
        aria-label="COD-IMAGE ON TOP OF SIDEBAR"
        onClick={handleCodImageClick}
        className="hidden xs:inline  h-12 mx-1 sm:mx-0 mt-2 sm:mt-0 object-contain      sm:object-cover sm:h-16 shadow-lg cursor-pointer"
        alt=""
        src="https://i.pinimg.com/236x/b4/7f/6c/b47f6c1f5324411fb9a3c8d730b93ece.jpg"
      />
      <NavbarOption isHome text="Home" Icon={HomeIcon} />
      {!userGuest && <NavbarOption text="Profile" Icon={UserIcon} />}
      {/* <NavbarOption hideOnMobile text="Search" Icon={SearchIcon} /> */}
      <NavbarOption text="Lists" Icon={ClipboardListIcon} />
      {!userGuest && <NavbarNotificationOption />}

      {/* <NavbarOption hideOnMobile text="About" Icon={InformationCircleIcon} /> */}
      <NavbarOption text="Log out" Icon={LogoutIcon} handleLogout />
      <NavbarOption hideOnMobile text="Loadouts" Icon={GiftIcon} />
    </nav>
  );
}

export default Sidebar;
