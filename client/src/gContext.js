import React, { useState, useContext } from 'react';

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [rootID, setRootID] = useState(1)
  const [hoverSentence, setHoverSentence] = useState({ active: false })

  const openSidebar = () => {
    setIsSidebarOpen(true)
  };
  const closeSidebar = () => {
    setIsSidebarOpen(false)
  };

  return (
    <AppContext.Provider
      value={{
        isSidebarOpen,
        openSidebar,
        closeSidebar,
        rootID,
        setRootID,
        hoverSentence,
        setHoverSentence
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
