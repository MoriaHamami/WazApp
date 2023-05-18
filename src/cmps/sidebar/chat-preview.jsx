import { collection, doc, limit, onSnapshot, orderBy, query } from "@firebase/firestore"
import { Avatar } from "@mui/material"
import { useState, useEffect, useRef } from "react"
import { Link, useParams } from "react-router-dom"
import db from "../../services/firebase"

function ChatPreview({ addNewChat, createChat, name, id }) {
    // const [seed, setSeed] = useState('')
    const [lastMsg, setLastMsg] = useState("")
    const unsub = useRef(null)
    const { roomId } = useParams()

    useEffect(() => {
        loadLastMsg(id)
        return () => {
            unsub.current && unsub.current()
        }
    }, [id])

    async function loadLastMsg(roomId) {
        const roomRef = doc(db, "rooms", roomId);
        const msgsCol = collection(roomRef, "msgs");
        const lastMsg = query(msgsCol, orderBy("timestamp", "desc"), limit(1))
        unsub.current = onSnapshot(lastMsg, msg => {
            // console.log('msg:', msg)
            setLastMsg(msg?.docs ? msg.docs[0]?.data().msg : "")
        })
    }



    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <section className={`chat-preview ${id===roomId && 'active'}`}>
                {/* {console.log('id, roomId:', id, roomId)} */}
                {/* <Avatar src={`https://i.pravatar.cc/150?u=${seed}`} /> */}
                <Avatar src={`https://i.pravatar.cc/150?u=${name}`} />
                <article className="preview-info">
                    <div className="user-name">{name}</div>
                    {/* <div className="user-name">hi</div> */}
                    <p>{lastMsg}</p>
                </article>
            </section>
        </Link>
    ) : (
        // <div >
            <div className="add-btn" onClick={createChat}>
                Add new chat
            </div>
        // </div>
    )
}

export default ChatPreview