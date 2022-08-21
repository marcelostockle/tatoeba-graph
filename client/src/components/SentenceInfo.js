import React from 'react';
import { useGlobalContext } from '../gContext';

const SentenceInfo = () => {
    const { hoverSentence } = useGlobalContext()
    console.log("rendering SentenceInfo")
    console.log(hoverSentence)
    return (
        <div className={ hoverSentence.active ? 'infobar visible': 'infobar'}>
            <h3>{hoverSentence._id}</h3>
            <p>{hoverSentence.content}</p>
        </div>
    )
}

export default SentenceInfo