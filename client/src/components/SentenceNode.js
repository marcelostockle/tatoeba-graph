import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useGlobalContext } from '../gContext'

const SentenceNode = ({sID, expand}) => {
    console.log(`Rendering sentence node #${sID}`)
    const [sentence, setSentence] = useState({_id: sID, content: "Loading...", lang: "unknown", links: []})
    const [doExpand, setDoExpand] = useState(expand)
    
    async function fetchSentence() {
        const api_prefix = "/api/sentence/"
        await axios.get(`${api_prefix.concat(sID)}`)
            .then(res => setSentence(res.data))
            .catch(setSentence({_id: sID, content: "NOT FOUND", lang: "unknown", links: []}))
    }
    useEffect(() => {
        fetchSentence()
    }, [])

    const {setHoverSentence} = useGlobalContext()
    const conditionalLinks = doExpand ? sentence.links : []
    return (<div key={sID} className="sNode">
        <img src={`https://tatoeba.org/img/flags/${sentence.lang}.svg`}
            alt={sentence.lang}
            onMouseOver={() => {setHoverSentence({...sentence, active: true})}}
            onClick={() => {setDoExpand(!doExpand)}}
        />
            { conditionalLinks.map((link) => {
                return <SentenceNode sID={link} expand={false}/>
            }) }
    </div>)
}

export default SentenceNode