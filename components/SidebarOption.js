import { useRouter } from "next/router";
import { useContext } from "react";
import { Context } from "../Context";
import { auth } from "../firebase";

function SidebarOption({ text, Icon, handleLogout, isHome, hideOnMobile }) {
  const router = useRouter();
  const { asPath } = useRouter();
  const {
    userGuest,
    setUserGuest,
    user,
    setUser,
    setProfile,
    loadingNotific,
    setSearchOk,
    setElementIdToScrollTo,
  } = useContext(Context);

  const handleClick = () => {
    if (loadingNotific) return;
    setElementIdToScrollTo("");

    if (handleLogout) {
      userGuest && setUserGuest(false);
      router.push("/");
      auth?.signOut();
      setUser(null);
      setProfile(null);
      setSearchOk(false);
    } else if (text === "Profile") {
      router.push(`/${user?.displayName}`);
    } else {
      text === "Home"
        ? router.push("/")
        : router.push(`/${text.toLowerCase()}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`sidebarBtn group
       ${
         /* Handle Profile link active */ text === "Profile" &&
         asPath === `/${user?.displayName}` &&
         "text-blueish"
       } 
      ${
        /* Handle Home Link active */ isHome && asPath === "/" && "text-blueish"
      } 
      ${
        /* Handle rest of Links active */ asPath === `/${text.toLowerCase()}` &&
        "text-blueish"
      } ${hideOnMobile && "hidden xs:inline-flex"}  `}
    >
      <Icon className={`icon  `} />
      <a className={`iconText hidden smallerTest:inline-flex   `}>{text}</a>
    </div>
  );
}

export default SidebarOption;
