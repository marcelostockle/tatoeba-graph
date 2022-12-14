import React, { useState, useContext } from 'react';

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [rootID, setRootID] = useState(5004)
  const [hoverSentence, setHoverSentence] = useState({ active: false })
  const [edgeLength, setEdgeLength] = useState(80)

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
        openSidebar, closeSidebar,
        rootID, setRootID,
        hoverSentence, setHoverSentence,
        edgeLength, setEdgeLength
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
