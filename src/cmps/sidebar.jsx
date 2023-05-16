import ChatList from "./chat-list"
import SearchBar from "./search-bar"
import SidebarHeader from "./sidebar-header"
import db from "../firebase"
import { addDoc, collection, getDocs } from 'firebase/firestore/lite';
import { useEffect, useState } from "react"

function Sidebar() {

    const [rooms, setRooms] = useState([])
    // const unsub = useRef(null)

    useEffect(() => {
        loadRooms()
        return () => {

        }
        // db.collection('rooms').onSnapshot(snapshot => (
        //     setRooms(snapshot.docs.map(doc =>
        //     ({
        //         id: doc.id,
        //         data: doc.data()
        //     })))
        // ))
    }, [])

    async function loadRooms() {
        // db.collection('rooms').onSnapshot(snapshot => (
        //     setRooms(snapshot.docs.map(doc=>
        //     ({
        //         id: doc.id,
        //         data: doc.data()
        //     })))
        // ))

        // dcidnt unsub from collection
        const roomsCol = collection(db, 'rooms')
        const roomsSnapshot = await getDocs(roomsCol)
        setRooms(roomsSnapshot.docs.map(doc =>
        ({
            id: doc.id,
            data: doc.data()
        })))
    }

    async function createChat() {

        const roomName = prompt('Please enter name for chat')
        if (roomName) {
            const roomsCol = collection(db, 'rooms')
            await addDoc(roomsCol, { name: roomName })
            loadRooms()
            // db.collection('rooms').add({
            //     name: roomName
            // })
        }
    }

    return (
        <div className="sidebar">
            <SidebarHeader />
            <SearchBar />
            <ChatList rooms={rooms} createChat={createChat} />
        </div>
    )
}

export default Sidebar