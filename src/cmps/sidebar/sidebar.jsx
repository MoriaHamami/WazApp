import ChatList from "./chat-list"
import SearchBar from "./search-bar"
import SidebarHeader from "./sidebar-header"
// import db from "../services/firebase"
// import { addDoc, collection, getDocs } from 'firebase/firestore/lite';
import { useEffect, useRef, useState } from "react"
import { onSnapshot, addDoc, collection, query, orderBy, serverTimestamp, where, or, and } from "firebase/firestore";
import db from "../../services/firebase";
import { useNavigate } from "react-router-dom";
import { utilService } from "../../services/util.service";
import { useSelector } from "react-redux";
import { userService } from "../../services/user.service";

function Sidebar() {

    const [rooms, setRooms] = useState([])
    const unsub = useRef(null)
    const navigate = useNavigate();
    const loggedInUser = useSelector(storeState => storeState.userModule.user)

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

    function loadRooms(filterBy = null) {
        // db.collection('rooms').onSnapshot(snapshot => (
        //     setRooms(snapshot.docs.map(doc=>
        //     ({
        //         id: doc.id,
        //         data: doc.data()
        //     })))
        // ))

        let roomsCol
        if (filterBy) {
            // const substrings = utilService.getAllSubstrings(filterBy)
            // console.log('substrings:', substrings)
            let capitalizedStr = filterBy.charAt(0).toUpperCase() + filterBy.slice(1)
            let lowercaseStr = filterBy.toLowerCase()
            // const decryptedLoggedInUser = userService.getLoggedinUser()
            // console.log('capitalizedStr:', capitalizedStr)
            // console.log('lowercaseStr:', lowercaseStr)

            // TODO: Shorten query with use of "in" and utils func
            // const filterBySubstrings = utilService.getAllSubstrings(filterBy)
            // console.log('filterBySubstrings:', filterBySubstrings)
            // roomsCol = query(collection(db, 'rooms'),
                
                    // (where("participants", "array-contains", loggedInUser.id)),
                    // (where("name", "in", filterBySubstrings)))
                
            roomsCol = query(collection(db, 'rooms'),
                or(
                    // and(where("participants", "array-contains", loggedInUser.id)),
                    and(where("name", ">=", filterBy), where('name', '<=', filterBy + '\uf8ff')),
                    and(where("name", ">=", capitalizedStr), where("name", "<=", capitalizedStr + '\uf8ff')),
                    and(where("name", ">=", lowercaseStr), where("name", "<=", lowercaseStr + '\uf8ff'))
                ))
        } else {
            roomsCol = query(collection(db, 'rooms'), orderBy('timestamp', "desc"))
        }
        unsub.current = onSnapshot(roomsCol, rooms => {
            // console.log('rooms:', rooms)
            let roomsWithData =[]
            for(let i = 0; i < rooms.docs.length; i ++){
                const room = rooms.docs[i]
                if(room.data().participants.includes(loggedInUser.id)) {
                    roomsWithData.push({id: room.id, data: room.data()})
                }
            }

            
            if (roomsWithData.length) {
                navigate('/rooms')
                // navigate(`/rooms/${roomsWithData[0].id}`)
            }
            // const roomsWithData = rooms.docs.map(room =>
            //     ({
            //         id: room.id,
            //         data: room.data()
            //     }))
            setRooms(roomsWithData)
            // setRooms(rooms.docs.length ? roomsWithData : [])
        })

    }


  



    return (
        <div className="sidebar">
            {/* {console.log('rooms:', rooms.length)} */}
            <SidebarHeader loggedInUser={loggedInUser} />
            <SearchBar loadRooms={loadRooms} />
            <ChatList rooms={rooms} />
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