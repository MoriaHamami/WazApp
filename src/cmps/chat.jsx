import { useParams } from "react-router-dom"
import ChatBody from "./chat-body"
import ChatFooter from "./chat-footer"
import ChatHeader from "./chat-header"
import { useState } from "react"
import { useEffect } from "react"
import db from "../firebase"
import { doc, getDoc } from "firebase/firestore";

function Chat() {

    const { roomId } = useParams()
    const { roomName, setRoomName } = useState("")


    useEffect(() => {
    //    s()
    }, [roomId])

    async function s(){
        if (roomId) {
            // const roomsCol = collection(db, 'rooms')
            const roomRef = doc(db, "rooms", roomId);
            const roomsSnapshot = await getDoc(roomRef)
            setRoomName(roomsSnapshot.data().name)
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