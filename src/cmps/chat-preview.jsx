import { Avatar } from "@mui/material"
import { useState, useEffect } from "react"

function ChatPreview() {
    const [seed, setSeed]  =useState('')

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [])

    return (
        <section className="chat-preview">
            {/* <Avatar src="https://robohash.org/TEXT.png?set=set5" /> */}
            <Avatar src={`https://i.pravatar.cc/150?u=${seed}`} />
            {/* <Avatar src="https://robohash.org/TEXT.png?bgset=bg1" /> */}
            <article className="preview-info">
                <h2>hi</h2>
                <p>go</p>
            </article>
        </section>
    )
}

export default ChatPreview