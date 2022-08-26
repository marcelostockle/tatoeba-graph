import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useGlobalContext } from '../gContext'

const SentenceNode = (props) => {
    const {sID} = props
    const [sentence, setSentence] = useState({_id: sID, content: "Loading...", lang: "unknown", links: []})
    const [expand, setExpand] = useState(props.expand)
    
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
    const conditionalLinks = expand ? fetchedSentence.links : []
    const {setHoverSentence, edgeLength} = useGlobalContext()
    const thisLeft = props.siblingInd===-1 ? props.parentLeft : 
        edgeLength * Math.sin(2 * Math.PI * props.siblingInd / props.siblings)
    const thisTop = props.siblingInd===-1 ? props.parentTop :
        edgeLength * Math.cos(2 * Math.PI * props.siblingInd / props.siblings)
    console.log(sID, 2 * Math.PI * props.siblingInd / props.siblings,
        thisLeft, thisTop, props.siblings, props.parentLeft, props.parentTop)
    return (
        <div
            key={sID}
            className="sNode"
            style={{top: `${thisTop}px`, left: `${thisLeft}px`,
                background: `white url(https://tatoeba.org/img/flags/${fetchedSentence.lang}.svg)
                center no-repeat`}}
            onMouseOver={() => {setHoverSentence({...fetchedSentence, active: true})}}
            onClick={() => {setExpand(!expand)}}
        >
        { conditionalLinks.map((link, index) => {
            const childProps = {
                key: link,
                sID: link,
                expand: false,
                parentLeft: thisLeft,
                parentTop: thisTop,
                siblings: conditionalLinks.length,
                siblingInd: index
            }
            return <SentenceNode {...childProps}/>
        }) }
        </div>
    )
}

export default SentenceNode