import React from 'react';
import SentenceNode from './SentenceNode'
import { useGlobalContext } from '../gContext';

const SentenceGraph = () => {
    console.log("Rendering sentence graph...")
    const { rootID } = useGlobalContext()
    return (<div className='sGraph'>
        <SentenceNode sID={rootID} expand={true}/>
    </div>)
}

export default SentenceGraph