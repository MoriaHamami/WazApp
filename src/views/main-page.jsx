import Chat from "../cmps/chat"
import Sidebar from "../cmps/sidebar"

function MainPage() {
    return (
        <article className="main-page">
            <Sidebar />
            <Chat />
        </article>
    )
}

export default MainPage