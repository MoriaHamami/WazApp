import ChatList from "./chat-list"
import SearchBar from "./search-bar"
import SidebarHeader from "./sidebar-header"

function Sidebar() {
    return (
        <div className="sidebar">
            <SidebarHeader />
            <SearchBar />
            <ChatList />
        </div>
    )
}

export default Sidebar