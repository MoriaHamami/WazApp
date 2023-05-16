import Chat from "../cmps/chat"
import Sidebar from "../cmps/sidebar"

function MainPage({loggedInUser}) {
    return (
        <article className="main-page">
            <Sidebar />
            <Chat loggedInUser={loggedInUser}/>
        </article>
    )
}

export default MainPage