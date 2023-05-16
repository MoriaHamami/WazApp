import ChatList from "./chat-list"
import SearchBar from "./search-bar"
import SidebarHeader from "./sidebar-header"
// import db from "../services/firebase"
// import { addDoc, collection, getDocs } from 'firebase/firestore/lite';
import { useEffect, useRef, useState } from "react"
import { onSnapshot, addDoc, collection, query, orderBy, serverTimestamp } from "firebase/firestore";
import db from "../../services/firebase";
import { useNavigate } from "react-router-dom";

function Sidebar() {

    const [rooms, setRooms] = useState([])
    const unsub = useRef(null)
    const navigate = useNavigate();

    useEffect(() => {
        loadRooms()
        return () => {
            unsub.current && unsub.current()
        }
        // db.collection('rooms').onSnapshot(snapshot => (
        //     setRooms(snapshot.docs.map(doc =>
        //     ({
        //         id: doc.id,
        //         data: doc.data()
        //     })))
        // ))
    }, [])

    function loadRooms() {
        // db.collection('rooms').onSnapshot(snapshot => (
        //     setRooms(snapshot.docs.map(doc=>
        //     ({
        //         id: doc.id,
        //         data: doc.data()
        //     })))
        // ))

        // dcidnt unsub from collection
        const roomsCol = query(collection(db, 'rooms'), orderBy('timestamp', "desc"))
        unsub.current = onSnapshot(roomsCol, rooms => {
            // console.log('rooms:', rooms)
            navigate(`/rooms/${rooms.docs[0].id}`);
            setRooms(rooms.docs.length ?
                rooms.docs.map(doc =>
                ({
                    id: doc.id,
                    data: doc.data()
                })) : [])
        })

    }



    async function createChat() {

        const roomName = prompt('Please enter name for chat')
        if (roomName) {
            const roomsCol = collection(db, 'rooms')
            await addDoc(roomsCol, {
                name: roomName,
                timestamp: serverTimestamp()
            })
            // loadRooms()
            // db.collection('rooms').add({
            //     name: roomName
            // })
        }
    }

    return (
        <div className="sidebar">
            {/* {console.log('rooms:', rooms.length)} */}
            <SidebarHeader />
            <SearchBar />
            <ChatList rooms={rooms} createChat={createChat} />
        </div>
    )
}

export default Sidebar







// import db from "../services/firebase";
// import ChatList from "./chat-list"
// import SearchBar from "./search-bar"
// import SidebarHeader from "./sidebar-header"
// // import db from "../firebase"
// import { addDoc, collection, getDocs } from 'firebase/firestore/lite';
// import { useEffect, useState } from "react"

// function Sidebar() {

//     const [rooms, setRooms] = useState([])
//     // const unsub = useRef(null)

//     useEffect(() => {
//         loadRooms()
//         // return () => {

//         // }
//         // db.collection('rooms').onSnapshot(snapshot => (
//         //     setRooms(snapshot.docs.map(doc =>
//         //     ({
//         //         id: doc.id,
//         //         data: doc.data()
//         //     })))
//         // ))
//     }, [])

//     async function loadRooms() {
//         // db.collection('rooms').onSnapshot(snapshot => (
//         //     setRooms(snapshot.docs.map(doc=>
//         //     ({
//         //         id: doc.id,
//         //         data: doc.data()
//         //     })))
//         // ))

//         // dcidnt unsub from collection
//         const roomsCol = collection(db, 'rooms')
//         const roomsSnapshot = await getDocs(roomsCol)
//         setRooms(roomsSnapshot.docs.map(doc =>
//         ({
//             id: doc.id,
//             data: doc.data()
//         })))
//     }

//     async function createChat() {

//         const roomName = prompt('Please enter name for chat')
//         if (roomName) {
//             const roomsCol = collection(db, 'rooms')
//             await addDoc(roomsCol, { name: roomName })
//             loadRooms()
//             // db.collection('rooms').add({
//             //     name: roomName
//             // })
//         }
//     }

//     return (
//         <div className="sidebar">
//             <SidebarHeader />
//             <SearchBar />
//             <ChatList rooms={rooms} createChat={createChat} />
//         </div>
//     )
// }

// export default Sidebar