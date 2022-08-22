import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useGlobalContext } from '../gContext'

const SentenceNode = ({sID, expand}) => {
    const [sentence, setSentence] = useState({_id: sID, content: "Loading...", lang: "unknown", links: []})
    const [doExpand, setDoExpand] = useState(expand)
    
    async function fetchSentence() {
        const api_prefix = "/api/sentence/"
        await axios.get(`${api_prefix.concat(sID)}`)
            .then(res => setSentence(res.data))
            .catch(err => console.log(err))
    }
    useEffect(() => {
        fetchSentence()
    }, [])

    const fetchedSentence = sentence ? 
        sentence : {_id: sID, content: "NOT FOUND", lang: "unknown", links: []}
    const {setHoverSentence} = useGlobalContext()
    const conditionalLinks = doExpand ? fetchedSentence.links : []
    console.log(sentence)
    return (<div key={sID} className="sNode">
        <img src={`https://tatoeba.org/img/flags/${fetchedSentence.lang}.svg`}
            alt={fetchedSentence.lang}
            onMouseOver={() => {setHoverSentence({...fetchedSentence, active: true})}}
            onClick={() => {setDoExpand(!doExpand)}}
        />
            { conditionalLinks.map((link) => {
                return <SentenceNode sID={link} expand={false}/>
            }) }
    </div>)
}

export default SentenceNode