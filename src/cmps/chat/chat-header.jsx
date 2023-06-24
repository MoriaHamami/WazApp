import { useEffect, useRef, useState } from "react"
import { Avatar, IconButton } from "@mui/material"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ArrowBack, ArrowBackIos, SearchOutlined } from "@mui/icons-material";
import { utilService } from "../../services/util.service";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UploadImg from "../upload-img";
import ChatDropdown from "./chat-dropdown";

function ChatHeader({ roomName, roomId, chatType, msgs, loadMsgs, imgURL }) {

    const [isOptionsSelected, setIsOptionsSelected] = useState(false)
    const [isGroupPopupShown, setIsGroupPopupShown] = useState(false)
    const [isSearchShown, setIsSearchShown] = useState('')
    const rooms = useSelector(storeState => storeState.roomModule.rooms)
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const navigate = useNavigate()
    const imgRef = useRef()
    // useEffect(() => {
    //     setSeed(Math.floor(Math.random() * 5000))
    // }, [])

    useEffect(() => {
        // console.log('roomName:', roomName)
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
            {/* <div className="img-container"> */}
                <Avatar ref={imgRef} className="profile" src={imgURL} />
                {/* {chatType === 'group' && <UploadImg imgRef={imgRef} type={'group'} id={roomId} />} */}

            {/* </div> */}

            {!isSearchShown && <div className="chat-info">
                <div className="user-name">{roomName}</div>
                <p>{utilService.getChatHeaderFormattedDate(msgs[msgs.length - 1]?.timestamp)}</p>
                {/* <p>Last seen at {new Date(msgs[msgs.length-1]?.timestamp?.toDate()).toUTCString()}</p> */}
            </div>}
            <div className="chat-icons">
                {isSearchShown && <input placeholder="Search message in chat" onChange={onSearchMsgs} />}
                <IconButton className={isSearchShown ? 'selected' : ''} onClick={() => setIsSearchShown(prevState => !prevState)}>
                    <SearchOutlined />
                </IconButton>

                <IconButton className={isOptionsSelected ? 'selected' : ''} onClick={()=> setIsOptionsSelected(prevState=>!prevState)}>
                    <MoreVertIcon />
                </IconButton>

                {isOptionsSelected && <ChatDropdown roomId={roomId} chatType={chatType} setIsOptionsSelected={setIsOptionsSelected} setIsGroupPopupShown={setIsGroupPopupShown} />}
                {/* {isGroupPopupShown && <GroupPopup createChat={createChat} setIsGroupPopupShown={setIsGroupPopupShown} loggedInEmail={loggedInEmail} />} */}
            </div>
        </header>
    )
}

export default ChatHeader