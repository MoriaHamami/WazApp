import { IconButton } from "@mui/material"
import MultiInput from "./multi-input"
import CloseIcon from '@mui/icons-material/Close';

function GroupPopup({ createChat, setIsGroupPopupShown }) {

    // async function addNewGroup(){
    //     const roomName = prompt('Please enter name for chat')
    //     if (roomName) {
    //         const roomsCol = collection(db, 'rooms')
    //         await addDoc(roomsCol, {
    //             name: roomName,
    //             timestamp: serverTimestamp()
    //         })
    //     }
    //     setIsGroupPopupShown(prevState => !prevState)
    // }

    return (
        <div className="group-popup" onClick={(ev)=>ev.stopPropagation()}>
            <div className="content-container">
            <IconButton className="close-btn" onClick={()=>setIsGroupPopupShown(prevState=>!prevState)}>
                <CloseIcon />
            </IconButton>

                <MultiInput createChat={createChat} />
            </div>
        </div>
    )
}

export default GroupPopup