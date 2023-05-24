import ChatPreview from "./chat-preview"

function ChatList({rooms}) {

    return (
        <article className="chat-list">
            {/* <ChatPreview addNewChat createChat={createChat}/> */}
            {/* <ChatPreview /> */}
            {rooms && rooms.map(room => (
                <ChatPreview key={room.id} id={room.id} name={room.data.name} />
            ))}
        </article>
    )
}

export default ChatList