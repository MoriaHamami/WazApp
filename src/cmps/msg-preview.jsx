
function ChatPreview({ timestamp, name, msg }) {

    return (
        <div className="chat-msg">
            <p className="username">{name}</p>
            <p className="content">{msg}</p>
            <p className="timestamp">{new Date(timestamp?.toDate()).toUTCString()}</p>
        </div>
    )
}

export default ChatPreview