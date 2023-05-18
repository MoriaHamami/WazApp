import { useSelector } from "react-redux"

function ChatPreview({ timestamp, name, msg }) {
    const loggedInUser = useSelector(storeState => storeState.userModule.user)

    return (
    <>
        <div className={`chat-msg ${name === loggedInUser.displayName && 'reciever'}`}>
            <p className="username">{name}</p>
            <p className="content">{msg}</p>
            <p className="timestamp">{new Date(timestamp?.toDate()).toUTCString()}</p>
        </div>
        <div className={`circle ${name === loggedInUser.displayName && 'reciever'}`}></div>
        <div className={`rect ${name === loggedInUser.displayName && 'reciever'}`}></div>
    </>
    )
}

export default ChatPreview