import React from 'react';
import { useGlobalContext } from '../gContext';

const SentenceNode = ({sentenceData}) => {
    const {setHoverSentence} = useGlobalContext()
    const {_id, lang, content} = sentenceData
    const hoverData = {_id, lang, content, active: true}

    console.log(`Rendering sentence #${_id}...`)
    return (<div className="sNode">
        <img src={`https://tatoeba.org/img/flags/${lang}.svg`}
            alt={lang}
            onMouseOver={() => {setHoverSentence(hoverData)}}/>
    </div>)
}

export default SentenceNode