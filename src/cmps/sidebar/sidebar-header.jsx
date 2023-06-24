import { Avatar, IconButton } from "@mui/material"
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useSelector } from "react-redux";
import SidebarDropdown from "./sidebar-dropdown";
import { useEffect, useRef, useState } from "react";
import ChatPopup from "./chat-popup";
import GroupPopup from "./group-popup";
import { addDoc, collection, getDoc, getDocs, query, serverTimestamp, where } from "@firebase/firestore";
import db from "../../services/firebase";
import { userService } from "../../services/user.service";
import { useNavigate } from "react-router-dom";
import UploadImg from "../upload-img";
import { utilService } from "../../services/util.service";
// import UploadImg from "./upload-img";
// import { userService } from "../../services/user.service";

function SidebarHeader({ loggedInUser }) {
    const [isOptionsSelected, setIsOptionsSelected] = useState(false)
    const [isGroupPopupShown, setIsGroupPopupShown] = useState(false)
    const [isChatPopupShown, setIsChatPopupShown] = useState(false)
    const [loggedInEmail, setLoggedInEmail] = useState('')
    // const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const navigate = useNavigate()
    const imgRef = useRef()

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

        if (isChatPopupShown) {
            setIsChatPopupShown(false)

            const roomsCol = query(collection(db, 'rooms'),
                // and(where("participants", "array-contains", loggedInUser.id)),
                where('participants', 'array-contains-any', participants), where('chatType', '==', 'chat')
            )
            const roomsSnapshot = await getDocs(roomsCol)
            // console.log('roomsSnapshot.docs[0]:', roomsSnapshot.docs[0])
            // If a chat already exists, take user to chat
            if (roomsSnapshot.docs.length) {
                for (let i = 0; i < roomsSnapshot.docs.length; i++) {
                    const currRoom = roomsSnapshot.docs[i]
                    if (participants.every(participant => currRoom.data().participants.includes(participant))) return navigate(`/rooms/${currRoom.id}`)
                }

            }

        }


        const roomsCol = collection(db, 'rooms')

        const ts = serverTimestamp()
        let savedChat
        if (chatType === 'group') {
            savedChat = await addDoc(roomsCol, {
                name,
                participants,
                chatType,
                lastMsgTime: ts,
                createdBy: loggedInUser.id,
                timestamp: ts,
                imgURL: null,
                filterOpts: utilService.getAllSubstrings(name)
            })

        } else {
            // TODO: First get participants name (right now gets ids)
            const participant1 = await userService.getById(participants[0])
            const participant2 = await userService.getById(participants[1])
            // TODO: Then change filter to be according to filterOpts
            const substrs1 = utilService.getAllSubstrings(participant1.data().name)
            const substrs2 = utilService.getAllSubstrings(participant2.data().name)
            savedChat = await addDoc(roomsCol, {
                name,
                participants,
                chatType,
                lastMsgTime: ts,
                createdBy: loggedInUser.id,
                timestamp: ts,
                filterOpts: substrs1.concat(substrs2)
            })

        }
        navigate(`/rooms/${savedChat.id}`)
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
            {/* <div className="img-container"> */}
                <Avatar ref={imgRef} src={loggedInUser?.imgURL} className="profile" />
                {/* <UploadImg imgRef={imgRef} type={'user'} id={loggedInUser.id} /> */}
            {/* </div> */}
            <div className="sidebar-icons">
                {/* <IconButton>
                    <DonutLargeIcon />
                </IconButton>
                <IconButton>
                    <ChatIcon />
                </IconButton> */}
                <IconButton className={isOptionsSelected ? 'selected' : ''} onClick={() => setIsOptionsSelected(prevState => !prevState)}>
                    <MoreVertIcon />
                </IconButton>
            </div>
            {isOptionsSelected && <SidebarDropdown loggedInUserId={loggedInUser.id} setIsOptionsSelected={setIsOptionsSelected} setIsGroupPopupShown={setIsGroupPopupShown} setIsChatPopupShown={setIsChatPopupShown} />}
            {isChatPopupShown && <ChatPopup createChat={createChat} setIsChatPopupShown={setIsChatPopupShown} loggedInEmail={loggedInEmail} />}
            {isGroupPopupShown && <GroupPopup createChat={createChat} setIsGroupPopupShown={setIsGroupPopupShown} loggedInEmail={loggedInEmail} />}
        </header>
    )
}

export default SidebarHeader