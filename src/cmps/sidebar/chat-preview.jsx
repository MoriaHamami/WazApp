import { collection, doc, getDoc, limit, onSnapshot, orderBy, query, where } from "@firebase/firestore"
import { Avatar } from "@mui/material"
import { useState, useEffect, useRef } from "react"
import { Link, useParams } from "react-router-dom"
import db from "../../services/firebase"
import { userService } from "../../services/user.service"
import { useSelector } from "react-redux"

function ChatPreview({ addNewChat, createChat, name, id, participants }) {
    // const [seed, setSeed] = useState('')
    const [lastMsg, setLastMsg] = useState("")
    const [chatRecieverName, setChatRecieverName] = useState("")
    const unsub = useRef(null)
    const { roomId } = useParams()
    const loggedInUser = useSelector(storeState => storeState.userModule.user)

    useEffect(() => {
        loadLastMsg(id)
        getChatName()
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
// console.log('getChatName():', getChatName())
    async function getChatName() {
        // const loggedInUser = userService.getLoggedinUser()
        // console.log('participants:', participants)
        // if(name) return
        const chatRecieverId = participants.find(participantId=> participantId !== loggedInUser.id)
        // console.log('chatReciever:', chatRecieverId)
        // if(chatRecieverId.includes('com')) return
        // const usersCol = query(collection(db, 'users'), where('id', "==", chatReciever.id))
        // const recieverSnapshot = await getDoc(usersCol)
        // Get participant from db
        const usersCol = doc(db, "users", chatRecieverId);
        const recieverSnapshot = await getDoc(usersCol)

const chatRecieverName = recieverSnapshot?.data().name
// console.log('chatRecieverName:', chatRecieverName)
        // return chatRecieverName
        setChatRecieverName(chatRecieverName)
    }



    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <section className={`chat-preview ${id===roomId && 'active'}`}>
                {/* {console.log('id, roomId:', id, roomId)} */}
                {/* <Avatar src={`https://i.pravatar.cc/150?u=${seed}`} /> */}
                <Avatar src={`https://i.pravatar.cc/150?u=${name}`} />
                <article className="preview-info">
                    {name ? (
                        <div className="user-name">{name}</div>

                    ) : (

                    <div className="user-name">{chatRecieverName}</div>
                    )}
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