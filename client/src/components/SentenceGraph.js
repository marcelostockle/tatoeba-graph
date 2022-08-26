import React from 'react';
import SentenceNode from './SentenceNode'
import { useGlobalContext } from '../gContext';

const SentenceGraph = () => {
    console.log("Rendering sentence graph...")
    console.log(window.innerHeight / 2, window.innerWidth / 2)
    const { rootID } = useGlobalContext()
    const sNodeData = {
        key: rootID,
        sID: rootID,
        expand: true,
        parentLeft: window.innerWidth / 2,
        parentTop: window.innerHeight / 2,
        siblings: 0,
        siblingInd: -1
    }
    return (<div className='sGraph'>
        <SentenceNode {...sNodeData}/>
    </div>)
}

export default SentenceGraph