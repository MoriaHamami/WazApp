import { useEffect, useState } from "react"
import { Avatar, IconButton } from "@mui/material"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ArrowBack, ArrowBackIos, SearchOutlined } from "@mui/icons-material";
import { utilService } from "../../services/util.service";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ChatHeader({ roomName, msgs, loadMsgs }) {

    const [isSearchShown, setIsSearchShown] = useState('')
    const rooms = useSelector(storeState => storeState.roomModule.rooms)
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const navigate = useNavigate()
    // useEffect(() => {
    //     setSeed(Math.floor(Math.random() * 5000))
    // }, [])

    useEffect(() => {
        
    }, [])

    function onSearchMsgs(ev) {
        // ev.preventDefault()y
        // console.log('here:', ev.target.value)
        loadMsgs(ev.target.value)
    }

    // function getUnreadChats() {
    //     // console.log('rooms:', rooms)
    //     const unreadChats = rooms?.filter(room => {
    //         console.log('room.data:', room.data)
    //         if(!room.data.msgs) return
    //         const lastMsg = room.data.msgs[room.data.msgs.length - 1]
    //         console.log('room.data:', lastMsg)
    //         return lastMsg.readBy?.includes(loggedInUser.id)
    //     })
    //     console.log('unreadChats:', unreadChats)
    //     return unreadChats.length || null
    // }

    return (
        <header className="chat-header">
            <IconButton className="prev-btn" onClick={() => navigate('/rooms')}>
                {/* <ArrowBack /> */}
                <ArrowBackIos />
                {/* {getUnreadChats()} */}
            </IconButton>
            <Avatar className="profile" src={`https://i.pravatar.cc/150?u=${roomName}`} />
            {!isSearchShown && <div className="chat-info">
                <div className="user-name">{roomName}</div>
                <p>{utilService.getChatHeaderFormattedDate(msgs[msgs.length - 1]?.timestamp)}</p>
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