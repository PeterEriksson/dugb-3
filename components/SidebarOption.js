import { useRouter } from "next/router";
import { useContext } from "react";
import { Context } from "../Context";

function SidebarOption({ text, Icon }) {
  const router = useRouter();
  const { asPath } = useRouter();

  const handleClick = () => {
    text === "Home" ? router.push("/") : router.push(`/${text.toLowerCase()}`);
  };

  return (
    <div onClick={handleClick} className="sidebarBtn group">
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
