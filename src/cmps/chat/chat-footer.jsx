import { AttachFile, InsertEmoticon, Mic } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { useEffect, useRef, useState } from "react"
// import Picker from 'emoji-picker-react';
import EmojiPicker from "emoji-picker-react";

function ChatFooter({ saveMsg }) {

    const [input, setInput] = useState('')
    const [showPicker, setShowPicker] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    function onEmojiClick(emojiObject, ev) {
        // ev.preventDefault()
        // console.log('emojiObject:', emojiObject)
        // console.log('event:', event)
        setInput(prevInput => prevInput + emojiObject.emoji);
        // setShowPicker(false);
        inputRef.current.focus()
    }

    function sendMsg(ev) {
        ev.preventDefault()
        // console.log('input:', input)
        saveMsg(input)
        setInput('')
    }



    return (
        <footer className="chat-footer">
            <IconButton>
                <InsertEmoticon onClick={() => setShowPicker(val => !val)} />
            </IconButton>
            {showPicker && <EmojiPicker
                pickerStyle={{ width: '100%' }}
                onEmojiClick={onEmojiClick}
                autoFocusSearch={false}
                previewConfig={{
                    defaultCaption: "Pick one!",
                    // defaultEmoji: "1f92a" // 🤪
                }} />
            }
            <IconButton>
                <AttachFile />
            </IconButton>
            <form onSubmit={sendMsg}>
                <input type="text"
                    placeholder="Type a message"
                    value={input}
                    onChange={ev => setInput(ev.target.value)}
                    ref={inputRef} />
            </form>
            <IconButton>
                <Mic />
            </IconButton>
        </footer>
    )
}

export default ChatFooter