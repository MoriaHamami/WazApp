import { useEffect, useRef, useState } from "react"
import UploadImg from "../upload-img"
import { useNavigate, useParams } from "react-router-dom"
import { arrayUnion, collection, doc, getDocs, onSnapshot, query, updateDoc, where } from "@firebase/firestore"
import db from "../../services/firebase"
import ParticipantList from "./participant-list"
import { Avatar, IconButton } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { utilService } from "../../services/util.service"
import { AddCircleOutline } from "@mui/icons-material"
import { roomService } from "../../services/room.service"

function GroupInfo({ loggedInUser }) {

    const { roomId } = useParams()
    // const test = useParams()
    const [room, setRoom] = useState({})
    const [email, setEmail] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [groupSub, setGroupSub] = useState('')
    const [isAddInputShown, setIsAddInputShown] = useState(false)
    // const [roomName, setRoomName] = useState("")
    const roomsUnsub = useRef(null)
    const recieverUnsub = useRef(null)
    const navigate = useNavigate()

    useEffect(() => {
        // console.log('roomId:', test)
        loadRoom()
        return () => {
            roomsUnsub.current && roomsUnsub.current()
            recieverUnsub.current && recieverUnsub.current()
        }
    }, [roomId])

    async function loadRoom() {
        if (!roomId) return
        // const roomsCol = collection(db, 'rooms')
        // const roomRef = doc(roomsCol, roomId);
        const roomRef = doc(db, "rooms", roomId);
        roomsUnsub.current = onSnapshot(roomRef, room => {
            // console.log('room:', room)

            // let room
            if (room.data().name) {
                // This chat is a group with subject name
                // roomName = room.data().name
                // setRoomName(roomName)
                // room = room.data()
                const roomData = room.data()
                roomData.id = room.id
                setRoom(roomData)
            } else {
                // Find reciever name
                let participants = room.data().participants
                // roomName = getRecieverName(participants)
                const chatRecieverId = participants.find(participantId => participantId !== loggedInUser.id)
                // Get participant from db
                const recieverSnapshot = doc(db, "users", chatRecieverId);

                recieverUnsub.current = onSnapshot(recieverSnapshot, reciever => {
                    const roomData = room.data()
                    roomData.name = reciever.data().name
                    roomData.imgURL = reciever.data().imgURL
                    roomData.id = room.id
                    setRoom(roomData)
                })

            }
            // console.log('roomName:', roomName)
        })
    }

    function onEditGroupSub(ev) {
        ev.preventDefault()
        updateGroupSubject(groupSub)
        // console.log('here:')
    }

    function handleGroupSubEdit(ev) {
        // console.log('ev.target.value:', ev.target.value)
        setGroupSub(ev.target.value)
    }
    function handleAddParticipant(ev) {
        // console.log('ev.target.value:', ev.target.value)
        setEmail(ev.target.value)
        if (errorMsg) setErrorMsg('')

    }

    async function updateGroupSubject(groupSub) {
        const filterOpts = utilService.getAllSubstrings(groupSub)
        const roomRef = doc(db, "rooms", roomId)
        await updateDoc(roomRef, { name: groupSub, filterOpts })
    }

    async function addParticipant(ev) {
        ev.preventDefault()
        const participant = email

        // Check if email exists in db 
        const usersCol = query(collection(db, 'users'), where("password", "==", participant))
        const usersSnapshot = await getDocs(usersCol)
        // If email was not found in db
        if (!usersSnapshot.docs.length) return setErrorMsg('Contact is not a member on wazApp')
        const participantId = usersSnapshot.docs[0].id
        // console.log('participantId:', participantId)
        // If the user exists in group
        if (room.participants.includes(participantId)) return setErrorMsg('Contact already in group')

        setIsAddInputShown(false)

        const roomCol = doc(db, 'rooms', roomId)
        await updateDoc(roomCol, {
            participants: arrayUnion(participantId)
        })

        setEmail('')
        if (errorMsg) setErrorMsg('')

    }

    function onDeleteRoom() {
        if (!window.confirm('Are you sure you want to delete group?')) return
        navigate('/rooms')
        roomService.deleteRoom(roomId)
    }

    function onDeleteParticipant(participantId) {
        if (!window.confirm('Are you sure you want to remove participant?')) return
        roomService.deleteParticipant(roomId, room.participants, participantId)
    }

    // VV - Change place to upload img 
    // VV - CHANGE GROUP NAME
    // VV - ADD PARTICIPANTS IN GROUP
    // VV - DELETE PARTICIPANTS IN GROUP
    // VV - DELETE GROUP

    return (
        <div className='group-info'>
            <IconButton className="close-btn" onClick={() => navigate(-1)}>
                <CloseIcon />
            </IconButton>

            <Avatar className="profile" src={room.imgURL} />
            <section className="img-change">
                <p>Change image</p>
                <UploadImg type={room.chatType} id={roomId} />
            </section>

            <p className="group-name">{room.name}</p>
            <p className="participants-count">Group | {room.participants?.length || '0'} participants</p>
            <form className="edit-subject" onSubmit={onEditGroupSub}>
                <label htmlFor="name">Edit group subject</label>
                <div className="input-container">
                    <input id="name" type="text" value={groupSub} onChange={handleGroupSubEdit} placeholder="Type group subject" />
                    <button>Edit</button>
                </div>
            </form>

            <p className="participants-count bold">{room.participants?.length || '0'} participants</p>

            <section className="add-participant" onClick={() => setIsAddInputShown(prevState => !prevState)}>
                    <AddCircleOutline className="add-btn"/>
                <p>Add participant</p>
            </section>

            {isAddInputShown && <form className="add-contact" onSubmit={addParticipant}>
                <div className="input-container">
                <input type="text" placeholder="Type contact email" value={email} onChange={handleAddParticipant} />
                <button>Add</button>
                </div>
                <p className="error-msg">{errorMsg}</p>
            </form>}

            {room.participants && <ParticipantList participants={room.participants} onDeleteParticipant={onDeleteParticipant} />}

            <button className="delete-group-btn" onClick={onDeleteRoom}>Delete group</button>
            <p className="date">Created {utilService.getChatListFormattedDate(room.timestamp)}</p>
        </div>
    )
}

export default GroupInfo