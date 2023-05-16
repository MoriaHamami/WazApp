import { collection, doc, getDocs, orderBy, query } from "firebase/firestore/lite";
import MsgList from "./msg-list"
import db from "../services/firebase";
import { useEffect, useState } from "react";

function ChatBody({roomId}) {
    const [ msgs, setMsgs ] = useState([])

    useEffect(() => {
        loadMsgs()
    }, [roomId])

    async function loadMsgs() {
        const roomRef = doc(db, "rooms", roomId);
        const msgsCol = collection(roomRef, "msgs");
        const msgsRef = query(msgsCol, orderBy("timestamp"))       
        const msgsSnapshot = await getDocs(msgsRef)
        setMsgs(msgsSnapshot.docs.map(doc => doc.data()))
    }
    return (
        <article className="chat-body">
            <MsgList msgs={msgs} />
        
            {/* <div className={`chat-msg ${true && 'reciever'}`}>
                <p className="username">Moria Hamami</p>
                <p className="content">Hey Guys!</p>
                <p className="timestamp">03:52</p>
            </div> */}
        </article>
    )
}

export default ChatBody