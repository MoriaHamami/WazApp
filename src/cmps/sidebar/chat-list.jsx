import ChatPreview from "./chat-preview"

function ChatList({rooms}) {

    return (
        <article className="chat-list">
            {/* <ChatPreview addNewChat createChat={createChat}/> */}
            {/* <ChatPreview /> */}
            {rooms && rooms.map(room => (
                <ChatPreview key={room.id} id={room.id} name={room.data.name} participants={room.data.participants} />
            ))}
        </article>
    )
}

export default ChatList