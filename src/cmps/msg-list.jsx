import MsgPreview from "./msg-preview"

function MsgList({msgs}) {

    return (
        <article className="msg-list">
            {msgs.length && msgs.map(msg => (
                <MsgPreview name={msg.name} msg={msg.msg} timestamp={msg.timestamp} />
            ))}
        </article>
    )
}

export default MsgList