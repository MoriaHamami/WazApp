import { useEffect, useRef, useState } from "react";
import MsgPreview from "./msg-preview"
import { utilService } from "../../services/util.service";
import { useScrollDirection } from "react-use-scroll-direction";

function MsgList({ msgs, isScrollAtTop, isScrollingUp, isScrollingDown, chatBodyTop }) {
    const bottomRef = useRef(null);
    const [floatingTimestamp, setFloatingTimestamp] = useState(null)
    // const ref = useRef([])
    const msgsRef = useRef([])
    const [positionTop, setPositionTop] = useState(0);
    const msgListRef = useRef()
    // const [isScrollAtTop, setIsScrollAtTop] = useState(false)

    // function handleScroll(){
    //     console.log('msgListRef.current.scrollTop:', msgListRef.current.scrollTop)
    //     // setPositionTop(msgListRef.current.scrollTop);
    // }
    // useEffect(() => {
    //     }, [])
    // useEffect(() => {
    //     updateIsScrollAtTop();
    //     msgListRef.current.addEventListener("scroll", updateIsScrollAtTop);
    //     return ()=> { 
    //         if(msgListRef.current) msgListRef.current.removeEventListener("scroll", updateIsScrollAtTop)
    //     }

    // }, [])

    // function updateIsScrollAtTop(){
    //     console.log('window.scrollY:', msgListRef.current.scrollY)
    // }

    // useEffect(() => {

    //     return () => {

    //             if (msgsRef.current.length) {
    //                 msgsRef.current.map(msg => {
    //                     msg && observer.unobserve(msg)
    //                     if (msg) console.log('msg:', msg)
    //                 })
    //             }

    //     }
    // }, [])
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            // const entry = entries[0]
            // let firstVisibleMsgIdx
            // if(!entries.length) return
            const containerViewportHeight = entries[0].rootBounds?.height
            const intersectingEntries = entries.filter(entry => {
                const elHighestPos = entry.boundingClientRect.bottom + entry.boundingClientRect.height
                return entry.isIntersecting && elHighestPos < containerViewportHeight
            })
            if (intersectingEntries.length) {
                const firstVisMsg = intersectingEntries[0].target
                const firstVisMsgPos = intersectingEntries[0].boundingClientRect.top
                // console.log('entries:', firstVisMsgPos)
                if (isScrollAtTop) {
                    // if (firstVisMsgPos > 0 && firstVisMsgPos < chatBodyTop * 2) {
                    // This is the first message, we dont need a floating date
                    setFloatingTimestamp(null)
                } else setFloatingTimestamp(firstVisMsg.getAttribute('date'))
            }

        })

        // console.log('ref.current:', msgsRef.current)
        if (msgsRef.current.length) {
            msgsRef.current.map(msg => {
                msg && observer.observe(msg)
            })
        }
        // console.log('msgsRef.current:', msgsRef.current)
        return (() => {
            if (msgsRef.current.length) {
                msgsRef.current.map(msg => {
                    msg && observer.unobserve(msg)
                    // if(!msg) console.log('msg:', msg)
                })
                // console.log('here:')
                // msgsRef.current=[]
            }
        })
    }, [msgs, isScrollingDown, isScrollingUp])
    // }, [msgsRef, msgs, isScrollingDown, isScrollingUp])
    // useEffect(() => {
    //     const observer = new IntersectionObserver((entries) => {
    //         // const entry = entries[0]
    //         // let firstVisibleMsgIdx
    //         if(isScrollingUp) {
    //             // const firstVisibleMsgIdx = entries.findIndex(entry => entry.isIntersecting && entry.boundingClientRect.top > 0)
    //             console.log('entries:', entries)
    //             const firstVisibleMsgIdx = entries.findIndex(entry => {
    //                 // console.log('entry.boundingClientRect.top:', entry.boundingClientRect.top)
    //                 return entry.isIntersecting
    //             })
    //             if(firstVisibleMsgIdx !== -1 ) setFloatingTimestamp(entries[firstVisibleMsgIdx].target.getAttribute('date'))

    //             // If user is at the top of msgs dont have a floating timestamp
    //             // if(!entry.boundingClientRect.top) setFloatingTimestamp(null)
    //             // console.log('up:')
    //         } 
    //         if(isScrollingDown){
    //             // if(entries.length <= 1) return
    //             // console.log('down:')
    //             const intersectingEntries = entries.filter(entry => {
    //                 const elHighestPos = entry.boundingClientRect.bottom + entry.boundingClientRect.height
    //                 const containerViewportHeight = entry.rootBounds.height
    //                 return entry.isIntersecting && elHighestPos < containerViewportHeight
    //             })
    //             if(intersectingEntries.length) setFloatingTimestamp(intersectingEntries[0].target.getAttribute('date'))
    //             // const intersectingEntries = entries.filter(entry => entry.isIntersecting)
    //             // const intersectingEntries = entries.filter(entry => entry.boundingClientRect.top < 0)
    //             // const intersectingEntries = entries.filter(entry => entry.isIntersecting && entry.boundingClientRect.top < 200)
    //             // console.log('entries:', intersectingEntries)
    //             // console.log('intersectingEntries:', intersectingEntries)
    //             // if(intersectingEntries.length) console.log('check', intersectingEntries[intersectingEntries.length - 1].target.nextElementSibling.getAttribute('timestamp'))
    //             // if(intersectingEntries.length) setFloatingTimestamp(intersectingEntries[intersectingEntries.length - 1].target.nextElementSibling.getAttribute('timestamp'))
    //         }
    //         // console.log('entries:', entries)
    //         // console.log('firstVisibleMsgIdx:', entries[firstVisibleMsgIdx])
    //         // const floatingTS = msgs[firstVisibleMsgIdx].timestamp
    //         // const formattedfloatingTS =  utilService.getChatListFormattedDate(floatingTS)
    //         // setFloatingTimestamp(formattedfloatingTS)

    //         // console.log('floatingTS:', floatingTS)
    //         // if(firstVisibleMsgIdx) {
    //         //     const firstVisibleMsg = entries[firstVisibleMsgIdx]
    //         //     console.log('firstVisibleMsg:', firstVisibleMsg)
    //         //     // console.log('entries:', entries)
    //         // }

    //     })
    //     // }, {threshold: 0, root:null})

    //     // console.log('ref.current:', msgsRef.current)
    //     if (msgsRef.current.length) {
    //         msgsRef.current.map(msg=>{
    //             observer.observe(msg)
    //         })
    //     }

    //     return (() => {
    //         if (msgsRef.current.length) {
    //             msgsRef.current.map(msg=>{
    //                 observer.unobserve(msg)
    //             })
    //         }
    //     })
    // }, [msgsRef, msgs, isScrollingDown, isScrollingUp])

    useEffect(() => {
        // scroll to bottom every time messages change
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });

        // msgsRef.current = [33]

        // If the new items array is smaller than the previous one, slice will return an array which size will be equal to the new items array size
        msgsRef.current = msgsRef.current.slice(0, msgs.length);

    }, [msgs]);



    return (
        <article className="msg-list" >
            {/* <article className="msg-list" ref={msgListRef} > */}
            {/* <div className="timestamp"></div> */}
            {msgs && msgs.map((msg, idx) => (
                // <MsgPreview key={idx} ref={el=>msgsRef.current.push(el)} name={msg.name} msg={msg.msg} timestamp={msg.timestamp} prevTimestamp={msgs[idx - 1]?.timestamp} nextTimestamp={msgs[idx + 1]?.timestamp} floatingTimestamp={floatingTimestamp}/>
                <MsgPreview 
                    key={msg.timestamp?.seconds}
                    idx={idx}
                    msgsRef={msgsRef}
                    name={msg.name}
                    msg={msg.msg}
                    date={utilService.getChatFormattedDate(msg.timestamp)}
                    prevDate={utilService.getChatFormattedDate(msgs[idx - 1]?.timestamp)}
                    // nextTimestamp={msgs[idx + 1]?.timestamp}
                    floatingTimestamp={floatingTimestamp} 
                    timestamp={utilService.getTime(msg.timestamp)} />
            ))}
            <div ref={bottomRef} />
            {/* {console.log('firstVisibleMsg:', floatingTimestamp)} */}
            {/* {console.log('isscrolling down:', isScrollingDown)} */}
            {/* {console.log('isscrolling down:', isScrollingUp)} */}
            {/* {console.log('ref.current:', msgsRef.current)} */}
        </article>
    )
}

export default MsgList