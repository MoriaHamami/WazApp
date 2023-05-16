import { Avatar } from "@mui/material"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

function ChatPreview({ addNewChat, createChat, name, id }) {
    const [seed, setSeed] = useState('')

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [])



    return !addNewChat ? (
        <Link to={`rooms/${id}`}>
            <section className="chat-preview">
                {/* <Avatar src={`https://i.pravatar.cc/150?u=${seed}`} /> */}
                <Avatar src={`https://i.pravatar.cc/150?u=${seed}`} />
                <article className="preview-info">
                    <div className="user-name">{name}</div>
                    {/* <div className="user-name">hi</div> */}
                    <p>last message...</p>
                </article>
            </section>
        </Link>
    ) : (
        <div onClick={createChat}>
            <div className="add-btn">
                Add new chat
            </div>
        </div>
    )
}

export default ChatPreview