import { useParams } from "react-router-dom"
import ChatBody from "./chat-body"
import ChatFooter from "./chat-footer"
import ChatHeader from "./chat-header"
import { useState } from "react"
import { useEffect } from "react"
import db from "../services/firebase"
import { collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore/lite";

function Chat() {

    const { roomId } = useParams()
    const [ roomName, setRoomName ] = useState("")


    useEffect(() => {
        loadRoom()
    }, [roomId])

    async function loadRoom(){
        if (roomId) {
            // const roomsCol = collection(db, 'rooms')
            // const roomRef = doc(roomsCol, roomId);
            const roomRef = doc(db, "rooms", roomId);
            const roomSnapshot = await getDoc(roomRef)
            setRoomName(roomSnapshot.data().name)

        }
    }

    return (
        <article className="chat">
            <ChatHeader roomName={roomName} />
            <ChatBody roomId={roomId} />
            <ChatFooter />
        </article>
    )
}

export default Chat