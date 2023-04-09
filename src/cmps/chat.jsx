import ChatBody from "./chat-body"
import ChatFooter from "./chat-footer"
import ChatHeader from "./chat-header"

function Chat() {
    return (
        <article className="chat">
            <ChatHeader />
            <ChatBody />
            <ChatFooter />
        </article>
    )
}

export default Chat