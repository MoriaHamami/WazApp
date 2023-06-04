import { collection, doc, getDocs, orderBy, query } from "firebase/firestore/lite";
import MsgList from "./msg-list"
import db from "../../services/firebase";
import { useEffect, useRef, useState } from "react";

function ChatBody({msgs}) {
    const timeoutIdRef = useRef(null);
    const [isListScrolled, setIsListScrolled] = useState(false)

    useEffect(() => {

        
        return (()=> {
            if(timeoutIdRef.current) clearTimeout(timeoutIdRef.current)
        })
      }, []);

    function handleScroll(){
        if(isListScrolled) clearTimeout(timeoutIdRef.current)
        setIsListScrolled(true)
        timeoutIdRef.current = setTimeout(() => {
            setIsListScrolled(false)
        }, 2000);
        // console.log('isListScrolled:', isListScrolled)
      }

    return (
        <article className={`chat-body ${isListScrolled && 'scrolled'}`} onScroll={handleScroll}>
            {msgs && <MsgList msgs={msgs} />}
        
            {/* <div className={`chat-msg ${true && 'reciever'}`}>
                <p className="username">Moria Hamami</p>
                <p className="content">Hey Guys!</p>
                <p className="timestamp">03:52</p>
            </div> */}
        </article>
    )
}

export default ChatBody