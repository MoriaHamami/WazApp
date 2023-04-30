function ChatBody() {
    return (
        <article className="chat-body">
            <div className="chat-msg">
                <p className="username">Moria Hamami</p>
                <p className="content">Hey Guys!</p>
                <p className="timestamp">03:52</p>
            </div>
            <div className={`chat-msg ${true && 'reciever'}`}>
                <p className="username">Moria Hamami</p>
                <p className="content">Hey Guys!</p>
                <p className="timestamp">03:52</p>
            </div>
        </article>
    )
}

export default ChatBody