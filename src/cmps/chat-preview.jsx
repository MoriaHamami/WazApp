import { Avatar } from "@mui/material"
import { useState, useEffect } from "react"

function ChatPreview({ addNewChat }) {
    const [seed, setSeed]  =useState('')

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [])

    function createChat() {
        const roomName = prompt('Please enter name for chat')
        if(roomName) {
            
        }
    }

    return !addNewChat ? (
        <section className="chat-preview">
            {/* <Avatar src="https://robohash.org/TEXT.png?set=set5" /> */}
            <Avatar src={`https://i.pravatar.cc/150?u=${seed}`} />
            {/* <Avatar src="https://robohash.org/TEXT.png?bgset=bg1" /> */}
            <article className="preview-info">
                <div className="user-name">hi</div>
                <p>go</p>
            </article>
        </section>
    ) : (
        <div onClick={createChat}>
            <div className="add-btn">
                Add new chat
            </div>
        </div>
    )
}

export default ChatPreview