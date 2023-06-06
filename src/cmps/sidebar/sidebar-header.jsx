import { Avatar, IconButton } from "@mui/material"
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useSelector } from "react-redux";
import Dropdown from "./dropdown";
import { useEffect, useState } from "react";
import ChatPopup from "./chat-popup";
import GroupPopup from "./group-popup";
import { addDoc, collection, getDoc, getDocs, query, serverTimestamp, where } from "@firebase/firestore";
import db from "../../services/firebase";
import { userService } from "../../services/user.service";
import { useNavigate } from "react-router-dom";
// import { userService } from "../../services/user.service";

function SidebarHeader({ loggedInUser }) {
    const [isOptionsSelected, setIsOptionsSelected] = useState(false)
    const [isGroupPopupShown, setIsGroupPopupShown] = useState(false)
    const [isChatPopupShown, setIsChatPopupShown] = useState(false)
    const [loggedInEmail, setLoggedInEmail] = useState('')
    // const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const navigate = useNavigate()

    useEffect(() => {
        updateLoggedInEmail()
    }, [loggedInUser])

    async function updateLoggedInEmail() {
        const decryptedUser = await userService.getLoggedinUser()
        setLoggedInEmail(decryptedUser.password)
    }

    async function createChat(participants, name, chatType) {
        // const decryptedLoggedInUser = userService.getLoggedinUser()
        // const roomsCol = query(collection(db, 'rooms'), ("participants", "array-contains", decryptedLoggedInUser.password))
        if (isGroupPopupShown) setIsGroupPopupShown(false)
        
        
        // TODO: Dont open chat with same person
        let roomsCol = query(collection(db, 'rooms'),
        // and(where("participants", "array-contains", loggedInUser.id)),
        where('participants', 'array-contains-any', participants), where('chatType', '==', 'chat')
        )
        
        if(isChatPopupShown) {
             setIsChatPopupShown(false)
            
            const roomsSnapshot = await getDocs(roomsCol)
            // If a chat already exists, take user to chat
            if (roomsSnapshot.docs.length) return navigate(`/rooms/${roomsSnapshot.docs[0].id}`)

        }
        

        roomsCol = collection(db, 'rooms')
        
        await addDoc(roomsCol, {
            name,
            participants,
            chatType,
            lastMsgTime: serverTimestamp(),
            createdBy: loggedInUser.id,
            timestamp: serverTimestamp()
        })
        // loadRooms()
        // db.collection('rooms').add({
            //     name: roomName
            // })
        }
        // async function createChat() {

    //     const roomName = prompt('Please enter name for chat')
    //     if (roomName) {
    //         const roomsCol = collection(db, 'rooms')
    //         await addDoc(roomsCol, {
    //             name: roomName,
    //             timestamp: serverTimestamp()
    //         })
    //         // loadRooms()
    //         // db.collection('rooms').add({
    //         //     name: roomName
    //         // })
    //     }
    // }

    return (
        <header className="sidebar-header">
            <Avatar src={loggedInUser?.imgURL} className="profile" />
            <div className="sidebar-icons">
                {/* <IconButton>
                    <DonutLargeIcon />
                </IconButton>
                <IconButton>
                    <ChatIcon />
                </IconButton> */}
                <IconButton className={isOptionsSelected ? 'selected' : ''} onClick={() => setIsOptionsSelected(prevState => !prevState)}>
                    <MoreVertIcon />
                    {isOptionsSelected && <Dropdown setIsGroupPopupShown={setIsGroupPopupShown} setIsChatPopupShown={setIsChatPopupShown} />}
                    {isChatPopupShown && <ChatPopup createChat={createChat} setIsChatPopupShown={setIsChatPopupShown} loggedInEmail={loggedInEmail} />}
                    {isGroupPopupShown && <GroupPopup createChat={createChat} setIsGroupPopupShown={setIsGroupPopupShown} loggedInEmail={loggedInEmail} />}
                </IconButton>
            </div>
        </header>
    )
}

export default SidebarHeader