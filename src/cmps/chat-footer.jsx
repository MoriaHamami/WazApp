import { AttachFile, InsertEmoticon, Mic } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { useState } from "react"

function ChatFooter() {

    const [input, setInput] = useState('')

    function sendMsg(ev) {
        ev.preventDefault()
    }

    return (
        <footer className="chat-footer">
            <IconButton>
                <InsertEmoticon />
            </IconButton>
            <IconButton>
                <AttachFile />
            </IconButton>
            <form onSubmit={sendMsg}>
                <input type="text" placeholder="Type a message" value={value}/>
            </form>
            <IconButton>
                <Mic />
            </IconButton>
        </footer>
    )
}

export default ChatFooter