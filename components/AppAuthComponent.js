import React from "react";
import { useContext } from "react";
import { Context } from "../Context";
import Login from "./Login";
import Navbar from "./Navbar";
import Widgets from "./Widgets";

function AppAuthComponent({ children }) {
  const { userGuest, user } = useContext(Context);

  return (
    <>
      {user || userGuest ? (
        <div
          aria-label="APP LOGGED IN CONTAINER"
          className="flex flex-col-reverse xs:flex-row max-w-6xl/ max-w-5xl w-full mx-auto"
        >
          <Navbar />
          {children}
          <Widgets />
        </div>
      ) : (
        <Login />
      )}
    </>
  );
}

export default AppAuthComponent;
