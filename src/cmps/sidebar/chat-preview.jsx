import { collection, doc, getDoc, limit, onSnapshot, orderBy, query, where } from "@firebase/firestore"
import { Avatar } from "@mui/material"
import { useState, useEffect, useRef } from "react"
import { Link, useParams } from "react-router-dom"
import db from "../../services/firebase"
import { userService } from "../../services/user.service"
import { useSelector } from "react-redux"
import { utilService } from "../../services/util.service"

function ChatPreview({ addNewChat, createChat, name, id, participants }) {
    // const [seed, setSeed] = useState('')
    const [lastMsg, setLastMsg] = useState("")
    const [unreadMsgsCount, setUnreadMsgsCount] = useState(0)
    const [chatRecieverName, setChatRecieverName] = useState("")
    const unsub = useRef(null)
    const { roomId } = useParams()
    const loggedInUser = useSelector(storeState => storeState.userModule.user)

    useEffect(() => {
        loadPreviewData(id)
        getChatName()
        return () => {
            unsub.current && unsub.current()
        }
    }, [id])

    async function loadPreviewData(roomId) {
        const roomRef = doc(db, "rooms", roomId);
        const msgsCol = collection(roomRef, "msgs");
        const msgsQuery = query(msgsCol, orderBy("timestamp", "desc"))
        unsub.current = onSnapshot(msgsQuery, msgs => {
            // console.log('msg:', msg)

            // Update last msg
            const lastMsg = msgs?.docs ? msgs.docs[0]?.data() : ""
            setLastMsg(lastMsg)

            // TODO Update unreadMgs
            const unreadMsgsCount = msgs.docs.reduce((unreadMsgsCount, msg) => {
                const readBy = msg.data().readBy
                // console.log('readBy.includes(loggedInUser.id):', readBy.includes(loggedInUser.id))
                // console.log('readBy:', readBy)
                if (readBy.includes(loggedInUser.id)) return unreadMsgsCount
                return ++unreadMsgsCount
            }, 0)
            // console.log('unreadMsgsCount:', unreadMsgsCount)
            setUnreadMsgsCount(unreadMsgsCount)
        })
    }
    // console.log('getChatName():', getChatName())
    async function getChatName() {
        // const loggedInUser = userService.getLoggedinUser()
        // console.log('participants:', participants)
        // if(name) return
        const chatRecieverId = participants.find(participantId => participantId !== loggedInUser.id)
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
            <section className={`chat-preview ${id === roomId && 'active'} ${unreadMsgsCount && 'unread'}`}>
                {/* {console.log('id, roomId:', id, roomId)} */}
                {/* <Avatar src={`https://i.pravatar.cc/150?u=${seed}`} /> */}
                <Avatar src={`https://i.pravatar.cc/150?u=${name}`} />
                <article className="preview-info">
                    <div className="first-row">
                        {name ? (
                            <div className="user-name">
                                {name}
                            </div>
                        ) : (
                            <div className="user-name">
                                {chatRecieverName}
                            </div>
                        )}
                        <p className={`timestamp ${unreadMsgsCount && 'unread'}`}>{utilService.getChatListFormattedDate(lastMsg?.timestamp) || null}</p>
                    </div>



                    {/* <div className="user-name">hi</div> */}
                    <div className="second-row">
                        <p>{lastMsg?.msg || null}</p>
                        {unreadMsgsCount ?
                            <div className="unread-msgs">
                                {unreadMsgsCount}
                            </div> : ''}
                    </div>

                    {/* <p className="timestamp">{utilService.getChatHeaderFormattedDate(lastMsg.timestamp)}</p> */}

                    {/* {unreadMsgsCount ?
                        <div className="unread-msgs">
                            <p className="timestamp">time</p>
                            {unreadMsgsCount}
                        </div> :
                        <p className="timestamp">time</p>
                    } */}
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