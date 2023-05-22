import { Avatar, IconButton } from "@mui/material"
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useSelector } from "react-redux";
import Dropdown from "./dropdown";
import { useState } from "react";
import ChatPopup from "./chat-popup";
import GroupPopup from "./group-popup";

function SidebarHeader() {
    const [isOptionsSelected, setIsOptionsSelected] = useState(false)
    const [isGroupPopupShown, setIsGroupPopupShown] = useState(false)
    const [isChatPopupShown, setIsChatPopupShown] = useState(false)
    const loggedInUser = useSelector(storeState => storeState.userModule.user)


    return (
        <header className="sidebar-header">
            <Avatar src={loggedInUser?.photoURL} className="profile"/>
            <div className="sidebar-icons">
                <IconButton>
                    <DonutLargeIcon />
                </IconButton>
                <IconButton>
                    <ChatIcon />
                </IconButton>
                <IconButton className={isOptionsSelected && 'selected'} onClick={()=>setIsOptionsSelected(prevState => !prevState)}>
                    <MoreVertIcon />
                    {isOptionsSelected && <Dropdown setIsGroupPopupShown={setIsGroupPopupShown} setIsChatPopupShown={setIsChatPopupShown}/>}
                    {isChatPopupShown && <ChatPopup />}
                    {isGroupPopupShown && <GroupPopup />}
                </IconButton>
            </div>
        </header>
    )
}

export default SidebarHeader