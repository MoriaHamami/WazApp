import { useEffect, useRef, useState } from "react"
import db from "../../services/firebase";
import { FieldPath, collection, doc, documentId, onSnapshot, orderBy, query, where } from "@firebase/firestore";
import ParticipantPreview from "./participant-preview";
// import firebase from 'firebase/app';
// import 'firebase/firestore';

function ParticipantList({ participants, onDeleteParticipant }) {
    const usersUnsub = useRef(null)
    const [participantsWithData, setParticipantsWithData] = useState([])

    useEffect(() => {
        // console.log('participants:', participants)
        loadParticipants()
        return () => {
            usersUnsub.current && usersUnsub.current()
        }
    }, [participants])

    function loadParticipants() {
        // if(!participants?.length) return
        try {
            // console.log('participants:', participants)
            const usersCol = query(collection(db, 'users'), where(documentId(), "in", participants))
            usersUnsub.current = onSnapshot(usersCol, users => {
                // setParticipantsWithData(users)
                // users.docs.map(user=> {
                //     setParticipantsWithData(prevUsers=> prevUsers ? [...prevUsers, user] : [user])
                // })
                setParticipantsWithData(users.docs)
                // console.log('users:', users.docs[idx])
            })
        } catch (err) {
            console.log('err:', err)
        }
        // usersCol = query(getDocumentByIds(db, 'users'),where(documentId, "in", participants), orderBy('name', 'desc'))
    }

    return (
        <article className="participant-list">
            {/* <ChatPreview addNewChat createChat={createChat}/> */}
            {/* <ChatPreview /> */}
            {participantsWithData.length ? participantsWithData.map(participant => (
                // <p>{JSON.stringify(participant)}</p>
                <ParticipantPreview key={participant.id} id={participant.id} name={participant.data().name} imgURL={participant.data().imgURL} onDeleteParticipant={onDeleteParticipant} />
            )): null}
        </article>
    )
}

export default ParticipantList