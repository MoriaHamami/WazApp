import { collection, doc, getDocs, orderBy, query } from "firebase/firestore/lite";
import MsgList from "./msg-list"
import db from "../../services/firebase";
import { useEffect, useRef, useState } from "react";
import { useScrollDirection } from "react-use-scroll-direction";
import FilteredMsgList from "./filtered-msg-list";

function ChatBody({ msgs, room, filteredMsgs, isSearchShown, setIsSearchShown }) {
    const timeoutIdRef = useRef(null);
    const [isListScrolled, setIsListScrolled] = useState(false)
    const [chatBodyTop, setChatBodyTop] = useState(null)
    const { isScrollingUp, isScrollingDown, scrollTargetRef } = useScrollDirection()
    // const msgListRef = useRef()
    const [isScrollAtTop, setIsScrollAtTop] = useState(true)


    // function handleScroll(){
    //     // setPositionTop(msgListRef.current.scrollTop);
    // }

    // useEffect(() => {
    //     updateIsScrollAtTop();
    //     scrollTargetRef.current.addEventListener("scroll", updateIsScrollAtTop);
    //     return ()=> { 
    //         if(scrollTargetRef.current) scrollTargetRef.current.removeEventListener("scroll", updateIsScrollAtTop)
    //     }

    // }, [])

    // function updateIsScrollAtTop(){
    //     console.log('window.scrollY:', scrollTargetRef.current?.scrollY)
    // }

    useEffect(() => {

        // updateIsScrollAtTop()
        // setChatBodyTop(47)


        return () => {
            if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current)
        }
    }, []);

    //     function updateIsScrollAtTop() {
    //         // If the chat has no scroll, 
    //         // the chat is at top of container
    // // console.log('scrollTargetRef:', scrollTargetRef)

    //         // otherwise the user will scroll and trigger onscroll 
    //         // which will update the isScrollAtTop
    //     }

    function handleScroll(ev) {
        // setChatBodyTop(ev.target.offsetTop) // 47
        // console.log('msgListRef.current.scrollTop:', ev.target.scrollTop)
        if (!ev.target.scrollTop) setIsScrollAtTop(true)
        else setIsScrollAtTop(false)
        // console.log('ev:', ev)
        if (isListScrolled) clearTimeout(timeoutIdRef.current)
        setIsListScrolled(true)
        timeoutIdRef.current = setTimeout(() => {
            setIsListScrolled(false)
        }, 2000);
        // console.log('isListScrolled:', isListScrolled)
    }

    return (
        <article className={`chat-body ${isSearchShown && 'filtered-list'} ${isListScrolled && 'scrolled'}`} ref={scrollTargetRef} onScroll={handleScroll}>
            {/* {msgs && <MsgList msgs={msgs} isScrollingUp={isScrollingUp} isScrollingDown={isScrollingDown} chatBodyTop={chatBodyTop} isScrollAtTop={isScrollAtTop} participants={room.participants} chatType={room.chatType}/>} */}
            {isSearchShown ? (
                <FilteredMsgList filteredMsgs={filteredMsgs} participants={room.participants} chatType={room.chatType} setIsSearchShown={setIsSearchShown} />
            ) : (
                 msgs ? <MsgList msgs={msgs} isScrollingUp={isScrollingUp} isScrollingDown={isScrollingDown} chatBodyTop={chatBodyTop} isScrollAtTop={isScrollAtTop} participants={room.participants} chatType={room.chatType} /> : null
            )}
            {/* <div className={`chat-msg ${true && 'reciever'}`}>
                <p className="username">Moria Hamami</p>
                <p className="content">Hey Guys!</p>
                <p className="timestamp">03:52</p>
            </div> */}
        </article>
    )
}

export default ChatBody