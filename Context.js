import React, { useState, useEffect } from "react";

const Context = React.createContext();

function ContextProvider({ children }) {
  const [openNewListModal, setOpenNewListModal] = useState(false);

  return (
    <Context.Provider
      value={{
        openNewListModal,
        setOpenNewListModal,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { ContextProvider, Context };
