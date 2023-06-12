
// const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
// const SECRET_PASS = 'XkhZG4fW2t2W'

import { collection, deleteDoc, doc } from "@firebase/firestore";
import db from "./firebase";


export const roomService = {
    deleteRoom
}

async function deleteRoom(roomId){
    const roomRef = doc(db, "rooms", roomId)
    // const msgsRef = collection(roomRef, "msgs")
    // Check if there are msgs in chat
    // Delete msgs
    // await deleteDoc(msgsRef)
    // Delete chat
    await deleteDoc(doc(db, "rooms", roomId))
}

