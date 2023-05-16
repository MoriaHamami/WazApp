import ChatPreview from "./chat-preview"

function ChatList({rooms, createChat}) {

    return (
        <article className="chat-list">
            <ChatPreview addNewChat createChat={createChat}/>
            {/* <ChatPreview /> */}
            {rooms.length && rooms.map(room => (
                <ChatPreview key={room.id} id={room.id} name={room.data.name}/>
            ))}
        </article>
    )
}

export default ChatList