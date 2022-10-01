import { useRouter } from "next/router";
import { useContext } from "react";
import { Context } from "../Context";

function SidebarOption({ text, Icon }) {
  const router = useRouter();
  const { asPath } = useRouter();
  const { userGuest, loadingNotific, setElementIdToScrollTo } =
    useContext(Context);

  const handleClick = () => {
    if (loadingNotific) return;
    setElementIdToScrollTo("");
    text === "Home" ? router.push("/") : router.push(`/${text.toLowerCase()}`);
  };

  return (
    <div
      onClick={handleClick}
      /* remove/hide Profile Icon if Guest is logged in. */
      className={`sidebarBtn group /w-min   ${
        text === "Profile" && userGuest && "hidden"
      }`}
    >
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
