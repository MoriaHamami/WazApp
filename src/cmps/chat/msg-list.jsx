import { useEffect, useRef, useState } from "react";
import MsgPreview from "./msg-preview"
import { utilService } from "../../services/util.service";

function MsgList({ msgs }) {
    const bottomRef = useRef(null);
    const [floatingTimestamp, setFloatingTimestamp] = useState()
    // const ref = useRef([])
    const msgsRef = useRef([])

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            // const entry = entries[0]
            const firstVisibleMsgIdx = entries.findIndex(entry => entry.isIntersecting)
            // console.log('entries:', entries)
            // console.log('firstVisibleMsgIdx:', entries[firstVisibleMsgIdx])
        if(firstVisibleMsgIdx !== -1 ) setFloatingTimestamp(entries[firstVisibleMsgIdx].target.getAttribute('timestamp'))
            // const floatingTS = msgs[firstVisibleMsgIdx].timestamp
            // const formattedfloatingTS =  utilService.getChatListFormattedDate(floatingTS)
            // setFloatingTimestamp(formattedfloatingTS)
            
            // console.log('floatingTS:', floatingTS)
            // if(firstVisibleMsgIdx) {
            //     const firstVisibleMsg = entries[firstVisibleMsgIdx]
            //     console.log('firstVisibleMsg:', firstVisibleMsg)
            //     // console.log('entries:', entries)
            // }
            
        })
        
        // console.log('ref.current:', msgsRef.current)
        if (msgsRef.current.length) {
            msgsRef.current.forEach(msg=>{
                observer.observe(msg)
            })
        }
        
        return (() => {
            if (msgsRef.current.length) {
                msgsRef.current.forEach(msg=>{
                    observer.unobserve(msg)
                })
            }
        })
    }, [msgsRef, msgs])

    useEffect(() => {
        // scroll to bottom every time messages change
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });

        // msgsRef.current = [33]
        
        // If the new items array is smaller than the previous one, slice will return an array which size will be equal to the new items array size
        msgsRef.current = msgsRef.current.slice(0, msgs.length);

    }, [msgs]);



    return (
        <article className="msg-list" >
            <div className="timestamp"></div>
            {msgs && msgs.map((msg, idx) => (
                // <MsgPreview key={idx} ref={el=>msgsRef.current.push(el)} name={msg.name} msg={msg.msg} timestamp={msg.timestamp} prevTimestamp={msgs[idx - 1]?.timestamp} nextTimestamp={msgs[idx + 1]?.timestamp} floatingTimestamp={floatingTimestamp}/>
                <MsgPreview key={idx} idx={idx} msgsRef={msgsRef} name={msg.name} msg={msg.msg} timestamp={msg.timestamp} prevTimestamp={msgs[idx - 1]?.timestamp} nextTimestamp={msgs[idx + 1]?.timestamp} floatingTimestamp={floatingTimestamp}/>
            ))}
            <div ref={bottomRef} />
            {/* {console.log('firstVisibleMsg:', floatingTimestamp)} */}
        {/* {console.log('ref.current:', msgsRef.current)} */}
        </article>
    )
}

export default MsgList