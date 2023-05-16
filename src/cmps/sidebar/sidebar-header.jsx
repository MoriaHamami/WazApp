import { Avatar, IconButton } from "@mui/material"
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useSelector } from "react-redux";

function SidebarHeader() {
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
                <IconButton>
                    <MoreVertIcon />
                </IconButton>
            </div>
        </header>
    )
}

export default SidebarHeader