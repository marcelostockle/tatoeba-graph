import React, { useState, useContext } from 'react';

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [sentenceMap, setSentenceMap] = useState(new Map())
  const [rootID, setRootID] = useState(1)
  const [hoverSentence, setHoverSentence] = useState({ active: false })

  const openSidebar = () => {
    setIsSidebarOpen(true)
  };
  const closeSidebar = () => {
    setIsSidebarOpen(false)
  };

  const fetchSentence = async (sID) => {
    const api_prefix = "/api/sentence/"
    const offStateMap = new Map(sentenceMap)
    if (!offStateMap.has(sID)) {
      try {
        const response = await fetch(`${api_prefix.concat(sID)}`, {method: 'GET', mode: 'cors'})
        return await response.json()
      } catch (err) {
        console.log('tatoeba API fetch error')
      }
    }
    return {}
  }
  const newSentenceMap = async (sID) => {
    console.log("Fetching sentence data...")
    const offStateMap = new Map()
    const responseJSON = await fetchSentence(sID)
    if (responseJSON) {
      offStateMap.set(sID, responseJSON)
      if (responseJSON.links) {
        console.log("Fetching links data...")
        responseJSON.links.forEach(async (link) => {
          console.log(link)
          const expandJSON = await fetchSentence(link)
          console.log(expandJSON)
          if (expandJSON) {
            offStateMap.set(link, expandJSON)
          } else {
            offStateMap.set(link, {_id: link, content: "????", lang: "unknown", links: []})
          }
        })
      }
    }
    setSentenceMap(() => new Map(offStateMap))
  }
  const expandMap = (sID) => {
    console.log("Fetching sentence data...")
    const offStateMap = new Map(sentenceMap)
    const pivotSentence = offStateMap.get(sID)
    if (pivotSentence.links) {
      pivotSentence.links.forEach(async (link) => {
        const expandJSON = await fetchSentence(link)
        if (expandJSON) {
          offStateMap.set(link, expandJSON)
        } else {
          offStateMap.set(link, {_id: link, content: "????", lang: "unknown", links: []})
        }
      })
    }
    setSentenceMap(() => new Map(offStateMap))
  }

  return (
    <AppContext.Provider
      value={{
        isSidebarOpen,
        openSidebar,
        closeSidebar,
        newSentenceMap,
        expandMap,
        sentenceMap,
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
