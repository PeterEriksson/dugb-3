import { useRouter } from "next/router";
import { useContext } from "react";
import { Context } from "../Context";
import { auth } from "../firebase";

function SidebarOption({ text, Icon, handleLogout }) {
  const router = useRouter();
  const { asPath } = useRouter();
  const {
    userGuest,
    setUserGuest,
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
    } else {
      text === "Home"
        ? router.push("/")
        : router.push(`/${text.toLowerCase()}`);
    }
  };

  return (
    <div onClick={handleClick} className={`sidebarBtn group /w-min    `}>
      <Icon
        className={`icon ${
          asPath === `/${text.toLowerCase()}` && "text-blueish"
        }`}
      />
      <a
        className={`iconText hidden smallerTest:inline-flex ${
          asPath === `/${text.toLowerCase()}` && "text-blueish"
        }`}
      >
        {text}
      </a>
    </div>
  );
}

export default SidebarOption;
