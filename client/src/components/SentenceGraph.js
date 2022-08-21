import React from 'react';
import SentenceNode from './SentenceNode'
import { useGlobalContext } from '../gContext';

const SentenceGraph = () => {
    console.log("Rendering sentence graph...")
    const { sentenceMap } = useGlobalContext()
    return (<div className='sGraph'>
        {sentenceMap.forEach((value, key, map) => {
            return <SentenceNode sentenceData={{...value}}/>
        })}
        
    </div>
    )
}

export default SentenceGraph