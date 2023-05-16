import { collection, doc, getDocs, orderBy, query } from "firebase/firestore/lite";
import MsgList from "./msg-list"
import db from "../services/firebase";
import { useEffect, useState } from "react";

function ChatBody({msgs}) {


    return (
        <article className="chat-body">
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