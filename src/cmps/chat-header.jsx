import { useEffect, useState } from "react"
import { Avatar, IconButton } from "@mui/material"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { SearchOutlined } from "@mui/icons-material";

function ChatHeader({roomName}) {

    const [seed, setSeed] = useState('')

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [])

    return (
        <header className="chat-header">
            <Avatar className="profile" src={`https://i.pravatar.cc/150?u=${seed}`} />
            <div className="chat-info">
                <div className="user-name">{roomName}</div>
                <p>Last seen at...</p>
            </div>
            <div className="chat-icons">
                <IconButton>
                    <SearchOutlined />
                </IconButton>
                <IconButton>
                    <MoreVertIcon />
                </IconButton>
            </div>
        </header>
    )
}

export default ChatHeader