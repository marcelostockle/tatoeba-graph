import Sidebar from './components/Sidebar'
import { FaBars } from 'react-icons/fa'
import { useGlobalContext } from './gContext'
import SentenceInfo from './components/SentenceInfo';
import SentenceGraph from './components/SentenceGraph';
import { useEffect } from 'react';


function App() {
  const { isSidebarOpen,
    openSidebar,
    closeSidebar,
    rootID
  } = useGlobalContext()
  const docTitle = "Tatoeba Connected Graph"
  
  useEffect(() => {
    document.title = `${docTitle}. #${rootID}`
  }, [rootID])
  /*
  useEffect(() => {
    setRootID(1)
  }, []) */

  return (
    <div className="body">
      <button onClick={isSidebarOpen ? closeSidebar : openSidebar}
        className='sidebar-toggle'>
        <FaBars />
      </button>
      <SentenceGraph/>
      <SentenceInfo/>
      <Sidebar/>
    </div>
  );
}

export default App;
