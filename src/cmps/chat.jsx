import { useParams } from "react-router-dom"
import ChatBody from "./chat-body"
import ChatFooter from "./chat-footer"
import ChatHeader from "./chat-header"
import { useRef, useState } from "react"
import { useEffect } from "react"
import db from "../services/firebase"
// import { addDoc, collection, getDoc, orderBy, query, serverTimestamp } from "firebase/firestore/lite";
// import { onSnapshot } from "firebase/firestore";
import { doc, onSnapshot, addDoc, collection, orderBy, query, serverTimestamp } from "firebase/firestore";

function Chat({ loggedInUser }) {

    const { roomId } = useParams()
    const [roomName, setRoomName] = useState("")
    const [msgs, setMsgs] = useState([])
    const msgsUnsub = useRef(null)
    const roomsUnsub = useRef(null)

    useEffect(() => {
        loadRoom()
        return () => {
            roomsUnsub.current && roomsUnsub.current()
            msgsUnsub.current && msgsUnsub.current()
        }
    }, [roomId])

    async function loadRoom() {
        if (roomId) {
            // const roomsCol = collection(db, 'rooms')
            // const roomRef = doc(roomsCol, roomId);
            const roomRef = doc(db, "rooms", roomId);
            roomsUnsub.current = onSnapshot(roomRef, room=>{
// console.log('room:', room)
                setRoomName(room.data().name)
            })
            loadMsgs()
        }
    }

    async function loadMsgs() {
        const roomRef = doc(db, "rooms", roomId);
        const msgsCol = collection(roomRef, "msgs");
        const msgsQuery = query(msgsCol, orderBy("timestamp"))
        msgsUnsub.current = onSnapshot(msgsQuery, msgs=>{

            setMsgs(msgs.docs.length ? msgs.docs.map(doc => doc.data()) : [])
        })

    }

    async function saveMsg(msg) {
        try {
            const roomRef = doc(db, "rooms", roomId);
            const msgsCol = collection(roomRef, "msgs");
            const newMsg = {
                msg,
                name: loggedInUser.displayName,
                timestamp: serverTimestamp()
            }
            await addDoc(msgsCol, newMsg)
            // loadMsgs()
            //LOAD MSGS
            // const msgsQuery = query(msgsCol, orderBy("timestamp"))
            // const unsub =  onSnapshot(msgsQuery, msgs=> {

            //     setMsgs(msgs.map(doc => doc.data()))
            // })
            // setMsgs(prevMsgs=> [...prevMsgs, newMsg])
        } catch (err) {
            alert('Had issues sending msg', err)
        }
        // setRoomName(roomSnapshot.data().name)

    }

    return (
        <article className="chat">
            <ChatHeader roomName={roomName} msgs={msgs} />
            <ChatBody msgs={msgs} />
            <ChatFooter saveMsg={saveMsg} />
        </article>
    )
}

export default Chat





// import { useParams } from "react-router-dom"
// import ChatBody from "./chat-body"
// import ChatFooter from "./chat-footer"
// import ChatHeader from "./chat-header"
// import { useState } from "react"
// import { useEffect } from "react"
// import db from "../services/firebase"
// import { addDoc, collection, doc, getDoc, getDocs, orderBy, query, serverTimestamp } from "firebase/firestore/lite";

// function Chat({ loggedInUser }) {

//     const { roomId } = useParams()
//     const [roomName, setRoomName] = useState("")
//     const [msgs, setMsgs] = useState([])


//     useEffect(() => {
//         loadRoom()
//     }, [roomId])

//     async function loadRoom() {
//         if (roomId) {
//             // const roomsCol = collection(db, 'rooms')
//             // const roomRef = doc(roomsCol, roomId);
//             const roomRef = doc(db, "rooms", roomId);
//             const roomSnapshot = await getDoc(roomRef)
//             setRoomName(roomSnapshot.data().name)
//             loadMsgs()
//         }
//     }

//     async function loadMsgs() {
//         const roomRef = doc(db, "rooms", roomId);
//         const msgsCol = collection(roomRef, "msgs");
//         const msgsRef = query(msgsCol, orderBy("timestamp"))
//         const msgsSnapshot = await getDocs(msgsRef)
//         setMsgs(msgsSnapshot.docs.map(doc => doc.data()))
//     }

//     async function saveMsg(msg) {
//         try {
//             const roomRef = doc(db, "rooms", roomId);
//             const msgsCol = collection(roomRef, "msgs");
//             const newMsg = {
//                 msg,
//                 name: loggedInUser.displayName,
//                 timestamp: serverTimestamp()
//             }
//             await addDoc(msgsCol, newMsg)
//             // loadMsgs()
//             //LOAD MSGS
//             const msgsRef = query(msgsCol, orderBy("timestamp"))
//             const msgsSnapshot = await getDocs(msgsRef)
//             setMsgs(msgsSnapshot.docs.map(doc => doc.data()))
//             // setMsgs(prevMsgs=> [...prevMsgs, newMsg])
//         } catch (err) {
//             alert('Had issues sending msg', err)
//         }
//         // setRoomName(roomSnapshot.data().name)

//     }

//     return (
//         <article className="chat">
//             <ChatHeader roomName={roomName} />
//             <ChatBody msgs={msgs} />
//             <ChatFooter saveMsg={saveMsg} />
//         </article>
//     )
// }

// export default Chat