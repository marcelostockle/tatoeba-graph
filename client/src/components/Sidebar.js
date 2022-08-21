import React, { useState } from 'react';
import { useGlobalContext } from '../gContext'

const Sidebar = () => {
    const { isSidebarOpen,
        closeSidebar,
        newSentenceMap,
        rootID,
        setRootID,
        renderMap } = useGlobalContext()
    const [sID, setSID] = useState(1)
    const handleSubmit = (e) => {
        e.preventDefault()
        closeSidebar()
        newSentenceMap(sID)
        setRootID(sID)
    }
    return (
        <aside className={isSidebarOpen ? 'inputGrid visible' : 'inputGrid'}>
            <div>
                <form onSubmit={handleSubmit}>
                    <input type='number'
                        min='1'
                        value={rootID}
                        onChange={(e) => {
                            setSID(e.target.value)
                            setRootID(e.target.value)
                        }}
                    />
                    <button className='btn' type='submit'>Show</button>
                    <button className='btn' type='button' onClick={closeSidebar}>Cancel</button>
                </form>
            </div>
        </aside>
    )
}
export default Sidebar