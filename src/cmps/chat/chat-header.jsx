import { useEffect, useRef, useState } from "react"
import { Avatar, IconButton } from "@mui/material"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ArrowBack, ArrowBackIos, SearchOutlined } from "@mui/icons-material";
import { utilService } from "../../services/util.service";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UploadImg from "../upload-img";
import ChatDropdown from "./chat-dropdown";
import db from "../../services/firebase";
import { and, collection, doc, onSnapshot, or, orderBy, query, where } from "@firebase/firestore";

function ChatHeader({ isSearchShown, setIsSearchShown, setFilteredMsgs, roomName, roomId, chatType, msgs, loadMsgs, imgURL }) {

    const [isOptionsSelected, setIsOptionsSelected] = useState(false)
    const [isGroupPopupShown, setIsGroupPopupShown] = useState(false)
    const rooms = useSelector(storeState => storeState.roomModule.rooms)
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const navigate = useNavigate()
    const inputRef = useRef()
    const imgRef = useRef()
    const msgsUnsub = useRef()
    // useEffect(() => {
    //     setSeed(Math.floor(Math.random() * 5000))
    // }, [])

    useEffect(() => {
        // console.log('roomName:', roomName)

        return () => {
            if (msgsUnsub.current) msgsUnsub.current()
        }
    }, [])

    function onSearchMsgs(ev) {
        // ev.preventDefault()y
        // console.log('here:', ev.target.value)
        loadFilteredMsgs(ev.target.value)
        // loadMsgs(ev.target.value)
    }


    async function loadFilteredMsgs(filterBy = null) {
        if (!filterBy) return setFilteredMsgs([])
        const roomRef = doc(db, "rooms", roomId);
        const msgsCol = collection(roomRef, "msgs");
        let msgsQuery

        let capitalizedStr = filterBy.charAt(0).toUpperCase() + filterBy.slice(1)
        let lowercaseStr = filterBy.toLowerCase()
        msgsQuery = query(msgsCol,
            or(
                and(where("msg", ">=", filterBy), where('msg', '<=', filterBy + '\uf8ff')),
                and(where("msg", ">=", capitalizedStr), where("msg", "<=", capitalizedStr + '\uf8ff')),
                and(where("msg", ">=", lowercaseStr), where("msg", "<=", lowercaseStr + '\uf8ff'))
            ))

        // msgsQuery = query(msgsQuery, orderBy('timestamp', 'desc'))
        msgsUnsub.current = onSnapshot(msgsQuery, msgs => {
            // setMsgs(msgs.docs.length ? msgs.docs.map(doc => doc.data()) : [])
            // // Update unread msgs
            // await updateDoc(washingtonRef, {
            //     regions: arrayUnion("greater_virginia")
            // });
            if (!msgs) return setFilteredMsgs([])

            let updatedMsgs = []
            for (let i = 0; i < msgs.docs.length; i++) {
                const msg = msgs.docs[i].data()
                msg.id = msgs.docs[i].id
                updatedMsgs.push(msg)
                // let msgRef = msgs.docs[i]
            }

            updatedMsgs = orderByDate(updatedMsgs)

            setFilteredMsgs(updatedMsgs)

        })

    }

    function orderByDate(msgs) {
        return msgs.sort((a, b) => b.timestamp?.seconds - a.timestamp?.seconds);
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

    function onSearchSelected(){
        setFilteredMsgs([])
        setIsSearchShown(prevState => !prevState)
    }
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
                {isSearchShown && <input autoFocus placeholder="Search message in chat" onChange={onSearchMsgs} />}

                <IconButton className={isSearchShown ? 'selected' : ''} onClick={onSearchSelected}>
                    <SearchOutlined />
                </IconButton>

                <IconButton className={isOptionsSelected ? 'selected' : ''} onClick={() => setIsOptionsSelected(prevState => !prevState)}>
                    <MoreVertIcon />
                </IconButton>

                {isOptionsSelected && <ChatDropdown roomId={roomId} chatType={chatType} setIsOptionsSelected={setIsOptionsSelected} setIsGroupPopupShown={setIsGroupPopupShown} />}
                {/* {isGroupPopupShown && <GroupPopup createChat={createChat} setIsGroupPopupShown={setIsGroupPopupShown} loggedInEmail={loggedInEmail} />} */}
            </div>
        </header>
    )
}

export default ChatHeader