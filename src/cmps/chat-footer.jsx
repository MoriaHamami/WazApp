import { AttachFile, InsertEmoticon, Mic } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { useState } from "react"

function ChatFooter({saveMsg}) {

    const [input, setInput] = useState('')

    function sendMsg(ev) {
        ev.preventDefault()
        // console.log('input:', input)
        saveMsg(input)
        setInput('')
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
                <input type="text" placeholder="Type a message" value={input} onChange={ev => setInput(ev.target.value)}/>
            </form>
            <IconButton>
                <Mic />
            </IconButton>
        </footer>
    )
}

export default ChatFooter