// import { logout } from "../../services/user.actions"

import { useNavigate } from "react-router-dom"
import { roomService } from "../../services/room.service"

function ChatDropdown({ roomId, chatType, setIsOptionsSelected, setIsChatPopupShown, setIsGroupPopupShown }) {
    const navigate = useNavigate()

    // Change place to upload img 
    // CHANGE GROUP NAME
    // CHANGE PARTICIPANTS IN GROUP
    // DELETE GROUP
    // CHANGE GROUP FROM LAST SEEN TO PARTICIPANTS

    function onDeleteRoom() {
        navigate('/rooms')
        roomService.deleteRoom(roomId)
    }
    
    return (
        <div className="dropdown" onClick={() => setIsOptionsSelected(prevState => !prevState)}>
            {/* <button onClick="myFunction()" className="dropbtn">Dropdown</button> */}
            <div className="dropdown-content">
                {chatType === 'group' && <a onClick={() => setIsChatPopupShown(prevState => !prevState)}>Group info</a>}
                {chatType === 'chat' && <a onClick={onDeleteRoom}>Delete chat</a>}
            </div>
        </div>
    )
}

export default ChatDropdown