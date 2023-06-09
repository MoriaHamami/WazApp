import ChatList from "./chat-list"
import SearchBar from "./search-bar"
import SidebarHeader from "./sidebar-header"
// import db from "../services/firebase"
// import { addDoc, collection, getDocs } from 'firebase/firestore/lite';
import { useEffect, useRef, useState } from "react"
import { onSnapshot, addDoc, collection, query, orderBy, serverTimestamp, where, or, and } from "firebase/firestore";
import db from "../../services/firebase";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { utilService } from "../../services/util.service";
import { useSelector } from "react-redux";
import { userService } from "../../services/user.service";
import { roomReducer } from "../../services/room.reducer";
import { setRooms } from "../../services/room.actions";
import { setLoader } from "../../services/loader.actions";
import Loader from "../../views/loader";

function Sidebar() {

    const { roomId } = useParams()

    // const [rooms, setRooms] = useState([])
    const unsub = useRef(null)
    const navigate = useNavigate();
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const rooms = useSelector(storeState => storeState.roomModule.rooms)
    // const isLoading = useSelector(storeState => storeState.loaderModule.isLoading)

    // const rooms=useSelector(storeState => storeState.roomModule.rooms)

    useEffect(() => {
        //   setLoader(true)

        // console.log('isLoading:', isLoading)
        navigate('/rooms')
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
    // }, [rooms])

    function loadRooms(filterBy = null) {
        // setLoader(false)

        // db.collection('rooms').onSnapshot(snapshot => (
        //     setRooms(snapshot.docs.map(doc=>
        //     ({
        //         id: doc.id,
        //         data: doc.data()
        //     })))
        // ))

        let roomsCol
        if (filterBy) {
            console.log('filterBy:', filterBy)
            navigate('/rooms')
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
                where("filterOpts", "array-contains", filterBy)
                // or(
                //     // and(where("participants", "array-contains", loggedInUser.id)),
                //     and(where('name', '>=', filterBy), where('name', '<=', filterBy + '\uf8ff')),
                //     and(where('name', '>=', capitalizedStr), where('name', '<=', capitalizedStr + '\uf8ff')),
                //     and(where('name', '>=', lowercaseStr), where('name', '<=', lowercaseStr + '\uf8ff')),
                //     // and(where('participants', 'array-contains-any', filterBySubstrings)),
                //     // and(where('name', '>=', capitalizedStr), where('name', '<=', capitalizedStr + '\uf8ff')),
                //     // and(where('name', '>=', lowercaseStr), where('name', '<=', lowercaseStr + '\uf8ff'))
                // ))
            )
        } else {
            roomsCol = query(collection(db, 'rooms'), orderBy('lastMsgTime', 'desc'))
        }
        unsub.current = onSnapshot(roomsCol, rooms => {
            // console.log('rooms:', rooms)
            let roomsWithData = []
            for (let i = 0; i < rooms.docs.length; i++) {
                const room = rooms.docs[i]
                if (room.data().participants.includes(loggedInUser.id)) {
                    // If a chat is empty
                    if(room.data().chatType === 'chat' && room.data().lastMsgTime?.seconds === room.data().timestamp?.seconds) continue
                    roomsWithData.push({ id: room.id, data: room.data() })
                }
            }


            // if (roomsWithData.length) {
            //     navigate('/rooms')
            //     // navigate(`/rooms/${roomsWithData[0].id}`)
            // }
            // const roomsWithData = rooms.docs.map(room =>
            //     ({
            //         id: room.id,
            //         data: room.data()
            //     }))
            // setRooms(roomsWithData)
            setRooms(roomsWithData)
            // setRooms(rooms.docs.length ? roomsWithData : [])
        })

    }






    return (
        <>
        < div className={`sidebar ${roomId ? 'not-active' : null}`} >
            {/* {console.log('rooms:', rooms.length)} */}
            < SidebarHeader loggedInUser={loggedInUser} />
            <SearchBar loadRooms={loadRooms} />
            <ChatList rooms={rooms} />
        </div >
        <Outlet/>
        </>
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