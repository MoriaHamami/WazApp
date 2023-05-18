import { useEffect, useRef } from "react";
import MsgPreview from "./msg-preview"

function MsgList({msgs}) {

    const bottomRef = useRef(null);

    useEffect(() => {
        // 👇️ scroll to bottom every time messages change
        bottomRef.current?.scrollIntoView({behavior: 'smooth'});
      }, [msgs]);

    return (
        <article className="msg-list">
            {msgs && msgs.map(msg => (
                <MsgPreview name={msg.name} msg={msg.msg} timestamp={msg.timestamp} />
            ))}
            <div ref={bottomRef} />
        </article>
    )
}

export default MsgList