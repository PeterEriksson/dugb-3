import React, { useState, useEffect } from "react";

const Context = React.createContext();

function ContextProvider({ children }) {
  const [openListModal, setOpenListModal] = useState(false);

  return (
    <Context.Provider
      value={{
        openListModal,
        setOpenListModal,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { ContextProvider, Context };
