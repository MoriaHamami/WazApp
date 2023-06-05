import { useEffect, useState } from "react"
import { Avatar, IconButton } from "@mui/material"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { SearchOutlined } from "@mui/icons-material";
import { utilService } from "../../services/util.service";

function ChatHeader({roomName, msgs, loadMsgs}) {

    const [isSearchShown, setIsSearchShown] = useState('')

    // useEffect(() => {
    //     setSeed(Math.floor(Math.random() * 5000))
    // }, [])

    function onSearchMsgs(ev){
        // ev.preventDefault()y
        // console.log('here:', ev.target.value)
        loadMsgs(ev.target.value)
    }

    return (
        <header className="chat-header">
            <Avatar className="profile" src={`https://i.pravatar.cc/150?u=${roomName}`} />
            {!isSearchShown && <div className="chat-info">
                <div className="user-name">{roomName}</div>
                <p>{utilService.getChatHeaderFormattedDate(msgs[msgs.length-1]?.timestamp)}</p>
                {/* <p>Last seen at {new Date(msgs[msgs.length-1]?.timestamp?.toDate()).toUTCString()}</p> */}
            </div>}
            <div className="chat-icons">
                {isSearchShown && <input placeholder="Search message in chat" onChange={onSearchMsgs} />}
                <IconButton onClick={() => setIsSearchShown(prevState => !prevState)}>
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