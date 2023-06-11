import { useParams } from "react-router-dom"
import ChatBody from "./chat-body"
import ChatFooter from "./chat-footer"
import ChatHeader from "./chat-header"
import { useRef, useState } from "react"
import { useEffect } from "react"
import db from "../../services/firebase"
import IntroChat from "./intro-chat"
import { doc, onSnapshot, addDoc, collection, orderBy, query, serverTimestamp, where, or, and, updateDoc, arrayUnion, getDoc, setDoc } from "firebase/firestore";
import { useSelector } from "react-redux"
import { setRooms } from "../../services/room.actions"
// import { addDoc, collection, getDoc, orderBy, query, serverTimestamp } from "firebase/firestore/lite";
// import { onSnapshot } from "firebase/firestore";

function Chat({ loggedInUser }) {

    const { roomId } = useParams()
    const [room, setRoom] = useState({})
    // const [roomName, setRoomName] = useState("")
    const [msgs, setMsgs] = useState([])
    const msgsUnsub = useRef(null)
    const roomsUnsub = useRef(null)
    const recieverUnsub = useRef(null)
    const rooms = useSelector(storeState => storeState.roomModule.rooms)

    useEffect(() => {
        // console.log('roomId:', roomId)
        loadRoom()
        return () => {
            roomsUnsub.current && roomsUnsub.current()
            msgsUnsub.current && msgsUnsub.current()
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
                // TODO: LATER DONT LET USER OPEN GROUP WITH SELF ONLY
                // Get participant from db
                const recieverSnapshot = doc(db, "users", chatRecieverId);
                // const usersCol = doc(db, "users", chatRecieverId);

                // TODO: LATER MAKE HERE AND CHAT PREVIEW SNAPSHOT (FOR IMG SWAP REASONS)
                // const recieverSnapshot = await getDoc(usersCol)
                recieverUnsub.current = onSnapshot(recieverSnapshot, reciever => {
                    // console.log('reciever.data():', reciever.data())
                    // room.data().name = reciever.data().name
                    const roomData = room.data()
                    roomData.name = reciever.data().name
                    roomData.id = room.id
                    setRoom(roomData)
                })

            }
            // console.log('roomName:', roomName)
        })
        loadMsgs()
    }

    // async function getRecieverName(participants) {
    //     const chatRecieverId = participants.find(participantId => participantId !== loggedInUser.id)
    //     // Get participant from db
    //     const recieverSnapshot = doc(db, "users", chatRecieverId);
    //     // const usersCol = doc(db, "users", chatRecieverId);

    //     // TODO: LATER MAKE HERE AND CHAT PREVIEW SNAPSHOT (FOR IMG SWAP REASONS)
    //     // const recieverSnapshot = await getDoc(usersCol)
    //     let recieverName
    //     recieverUnsub.current = onSnapshot(recieverSnapshot, reciever => {
    //         recieverName = reciever.data().name
    //     })
    //     return recieverName
    // }

    async function loadMsgs(filterBy = null) {
        const roomRef = doc(db, "rooms", roomId);
        const msgsCol = collection(roomRef, "msgs");
        let msgsQuery
        if (filterBy) {
            let capitalizedStr = filterBy.charAt(0).toUpperCase() + filterBy.slice(1)
            let lowercaseStr = filterBy.toLowerCase()
            msgsQuery = query(msgsCol,
                or(
                    and(where("msg", ">=", filterBy), where('msg', '<=', filterBy + '\uf8ff')),
                    and(where("msg", ">=", capitalizedStr), where("msg", "<=", capitalizedStr + '\uf8ff')),
                    and(where("msg", ">=", lowercaseStr), where("msg", "<=", lowercaseStr + '\uf8ff'))
                ))
        } else {
            msgsQuery = query(msgsCol, orderBy("timestamp"))
            // Set all msgs as read
            // const washingtonRef = doc(db, "cities", "DC");

            // Atomically add a new region to the "regions" array field.
            // await updateDoc(washingtonRef, {
            //     regions: arrayUnion("greater_virginia")
            // });
        }
        msgsUnsub.current = onSnapshot(msgsQuery, msgs => {
            // setMsgs(msgs.docs.length ? msgs.docs.map(doc => doc.data()) : [])
            // // Update unread msgs
            // await updateDoc(washingtonRef, {
            //     regions: arrayUnion("greater_virginia")
            // });
            if (!msgs) return setMsgs([])
            let updatedMsgs = []
            for (let i = 0; i < msgs.docs.length; i++) {
                const msg = msgs.docs[i].data()
                const msgRef = doc(roomRef, "msgs", msgs.docs[i].id);

                // let msgRef = msgs.docs[i]
                updateReadBy(msg, updatedMsgs, msgRef)
            }
            setMsgs(updatedMsgs)

        })

    }

    async function updateReadBy(msg, updatedMsgs, msgRef) {
        if (!msg.readBy.includes(loggedInUser.id)) {

            await updateDoc(msgRef, {
                readBy: arrayUnion(loggedInUser.id)
            })
            msg.readBy.push(loggedInUser.id)
        }
        updatedMsgs.push(msg)
    }





    async function saveMsg(msg) {
        try {
            // console.log('msg:', msg)
            const roomRef = doc(db, "rooms", roomId);
            const msgsCol = collection(roomRef, "msgs");
            const timestamp = serverTimestamp()
            const newMsg = {
                msg,
                name: loggedInUser.name,
                readBy: [loggedInUser.id],
                timestamp
                // timestamp: serverTimestamp()
            }
            // console.log('newMsg:', newMsg)
            const savedMsg = await addDoc(msgsCol, newMsg)
            // console.log('savedMsg:', savedMsg.data())
            // const savedMsg = await getDoc(roomRef, "msgs", msgRef.id)
            // updateRoomLastMsgTime(roomRef, savedMsg.data().timestamp)
            updateRoomLastMsgTime(roomRef, timestamp)

            // console.log('savedMsg:', savedMsg.id)

            // const savedMsg = await addDoc(msgsCol, newMsg)
            // const msgRef = doc(roomRef, "msgs", savedMsg.id);
            // const readByCol = collection(msgRef, "readBy");
            // await addDoc(readByCol, loggedInUser.id)


            // loadMsgs()
            //LOAD MSGS
            // const msgsQuery = query(msgsCol, orderBy("timestamp"))
            // const unsub =  onSnapshot(msgsQuery, msgs=> {

            //     setMsgs(msgs.map(doc => doc.data()))
            // })
            // setMsgs(prevMsgs=> [...prevMsgs, newMsg])
        } catch (err) {
            console.log('err:', err)
            alert('Had issues sending msg')
        }
        // setRoomName(roomSnapshot.data().name)

    }

    async function updateRoomLastMsgTime(roomRef, lastMsgTime) {
        try {
            // console.log('lastMsgTime:', lastMsgTime)
            // await setDoc(roomRef, { lastMsgTime },{merge:true})
            await updateDoc(roomRef, { lastMsgTime })
            // await updateDoc(roomRef, { lastMsgTime })
        } catch (err) {
            console.log('err:', err)
        }
        // TODO:? remove and push to start of rooms list this room
        // const roomIdx = rooms.findIndex(room => room.id === roomId)
        // const room = rooms.splice(roomIdx, 1)
        // rooms.unshift(room[0])
        // console.log('rooms:', rooms)
        // setRooms(rooms)
    }

    return !roomId ? (
        <IntroChat />
    ) : (
        <article className="chat">
            <ChatHeader roomName={room.name} roomId={room.id} chatType={room.chatType} imgURL={room.imgURL} msgs={msgs} loadMsgs={loadMsgs} />
            <ChatBody msgs={msgs} room={room} />
            <ChatFooter saveMsg={saveMsg} />
        </article >
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