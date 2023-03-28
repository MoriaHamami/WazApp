import { Avatar, IconButton } from "@mui/material"
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function SidebarHeader() {
    return (
        <header className="sidebar-header">
            <Avatar className="profile"/>
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