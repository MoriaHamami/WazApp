import ChatPreview from "./chat-preview"

function ChatList() {
    return (
        <article className="chat-list">
            <ChatPreview addNewChat/>
            <ChatPreview />
        </article>
    )
}

export default ChatList