
// const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
// const SECRET_PASS = 'XkhZG4fW2t2W'

import { collection, deleteDoc, doc, getDoc, updateDoc } from "@firebase/firestore";
import db from "./firebase";


export const roomService = {
    deleteRoom,
    deleteParticipant
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

async function deleteParticipant(roomId, participants, participantId) {
    // console.log('roomId:', roomId)
    // console.log('participants:', participants)
    const roomRef = doc(db, "rooms", roomId)
    
    const filteredParticipants = participants.filter(currParticipantId=> participantId !== currParticipantId)
    // console.log('filteredParticipants:', filteredParticipants)
    // const roomSnapshot = await getDoc(roomRef)
    // const participants = roomSnapshot.doc.data().participants
    await updateDoc(roomRef, {
        participants: filteredParticipants
    })
    // await deleteDoc(doc(db, "rooms", roomId))
}

