// import { logout } from "../../services/user.actions"

import { useNavigate } from "react-router-dom"
import { roomService } from "../../services/room.service"

function ChatDropdown({ roomId, chatType, setIsOptionsSelected }) {
    const navigate = useNavigate()



    function onDeleteRoom() {
        if(!window.confirm(`Are you sure you want to delete ${chatType}?`)) return
        setIsOptionsSelected(prevState=>!prevState)
        navigate('/rooms')
        roomService.deleteRoom(roomId)
    }
    
    function onGroupClick(){
        setIsOptionsSelected(prevState=>!prevState)
        // navigate(`/info`)
        navigate(`/rooms/${roomId}/info`)
    }

    return (
        <div className="dropdown" onClick={() => setIsOptionsSelected(prevState => !prevState)}>
            {/* <button onClick="myFunction()" className="dropbtn">Dropdown</button> */}
            <div className="dropdown-content">
                {chatType === 'group' && <a onClick={onGroupClick}>Group info</a>}
                {chatType === 'chat' && <a onClick={onDeleteRoom}>Delete chat</a>}
            </div>
        </div>
    )
}

export default ChatDropdown