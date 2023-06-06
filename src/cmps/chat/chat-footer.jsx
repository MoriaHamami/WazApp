import { AttachFile, InsertEmoticon, Mic, Send, SendOutlined } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { useEffect, useRef, useState } from "react"
// import Picker from 'emoji-picker-react';
import EmojiPicker from "emoji-picker-react";
import { recordingSettings } from "../../services/firebase";

function ChatFooter({ saveMsg }) {

    // const [isRecording, setIsRecording] = useState(false);
    // const [recording, setRecording] = useState(null);
    // const [sound, setSound] = useState(null);
    // const [isPlaying, setIsPlaying] = useState(false);

    // async function startRecording() {
    //     // stop playback
    //     if (sound !== null) {
    //         await sound.unloadAsync()
    //         sound.setOnPlaybackStatusUpdate(null)
    //         setSound(null)
    //     }

    //     await Audio.setAudioModeAsync({
    //         allowsRecordingIOS: true,
    //         interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
    //         playsInSilentModeIOS: true,
    //         shouldDuckAndroid: true,
    //         interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    //         playThroughEarpieceAndroid: false,
    //         staysActiveInBackground: true,
    //     })
    //     const _recording = new Audio.Recording()
    //     try {
    //         await _recording.prepareToRecordAsync(recordingSettings)
    //         setRecording(_recording)
    //         await _recording.startAsync()
    //         console.log("recording")
    //         setIsRecording(true)
    //     } catch (error) {
    //         console.log("error while recording:", error)
    //     }
    // }

    // async function stopRecording() {
    //     try {
    //       await recording.stopAndUnloadAsync()
    //     } catch (error) {
    //       // Do nothing -- we are already unloaded.
    //     }
    //     const info = await FileSystem.getInfoAsync(recording.getURI())
    //     console.log(`FILE INFO: ${JSON.stringify(info)}`)
    //     await Audio.setAudioModeAsync({
    //       allowsRecordingIOS: false,
    //       interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
    //       playsInSilentModeIOS: true,
    //       playsInSilentLockedModeIOS: true,
    //       shouldDuckAndroid: true,
    //       interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    //       playThroughEarpieceAndroid: false,
    //       staysActiveInBackground: true,
    //     })
    //     const { sound: _sound, status } = await recording.createNewLoadedSoundAsync(
    //       {
    //         isLooping: true,
    //         isMuted: false,
    //         volume: 1.0,
    //         rate: 1.0,
    //         shouldCorrectPitch: true,
    //       }
    //     )
    //     setSound(_sound)
    //     setIsRecording(false)
    //   }


    //   async function uploadAudio(){
    //     const uri = recording.getURI()
    //     try {
    //       const blob = await new Promise((resolve, reject) => {
    //         const xhr = new XMLHttpRequest()
    //         xhr.onload = () => {
    //           try {
    //             resolve(xhr.response)
    //           } catch (error) {
    //             console.log("error:", error)
    //           }
    //         }
    //         xhr.onerror = (e) => {
    //           console.log(e)
    //           reject(new TypeError("Network request failed"))
    //         }
    //         xhr.responseType = "blob"
    //         xhr.open("GET", uri, true)
    //         xhr.send(null)
    //       })
    //       if (blob != null) {
    //         const uriParts = uri.split(".")
    //         const fileType = uriParts[uriParts.length - 1]
    //         firebase
    //           .storage()
    //           .ref()
    //           .child(`nameOfTheFile.${fileType}`)
    //           .put(blob, {
    //             contentType: `audio/${fileType}`,
    //           })
    //           .then(() => {
    //             console.log("Sent!")
    //           })
    //           .catch((e) => console.log("error:", e))
    //       } else {
    //         console.log("erroor with blob")
    //       }
    //     } catch (error) {
    //       console.log("error:", error)
    //     }
    //   }


    //   async function downloadAudio() {
    //     const uri = await firebase
    //       .storage()
    //       .ref("nameOfTheFile.filetype")
    //       .getDownloadURL()

    //     console.log("uri:", uri)

    //     // The rest of this plays the audio
    //     const soundObject = new Audio.Sound()
    //     try {
    //       await soundObject.loadAsync({ uri })
    //       await soundObject.playAsync()
    //     } catch (error) {
    //       console.log("error:", error)
    //     }
    //   }







    const [input, setInput] = useState('')
    const [showPicker, setShowPicker] = useState(false)
    const inputRef = useRef(null)
    const [textareaheight, setTextareaheight] = useState(1);

    useEffect(() => {
        inputRef.current.focus()
    }, [])

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
        inputRef.current.rows = 1
    }

    // function handleChange(ev) {
    //     setInput(ev.target.value)
    //     console.log(ev.target.rows)
    //     const height = ev.target.scrollHeight;
    //     const rowHeight = 15;
    //     const textRows = Math.ceil(height / rowHeight) - 1;

    //     if (textRows !== textareaheight) {

    //         setTextareaheight(textRows);

    //     }
    // }

    function handleChange(ev) {

        setInput(ev.target.value)

        // console.log(ev.target.rows)
        // const rowHeight = 21.36;
        // const rowHeight = 46.36;

        // According to scroll height
        const rowHeight = 14.5;

        // const rowHeight = 16;
        // const rowHeight = 24;
        const minRows = 1
        const maxRows = 10

        // Reset number of rows in textarea 
        // so scrollHeight will see min height available is 1 row
        ev.target.rows = minRows
        const height = ev.target.scrollHeight;
        const previousRows = ev.target.rows;

        console.log('ev.target.scrollHeight:', ev.target.scrollHeight)
        // const rowHeight = 15;
        // const currentRows = Math.ceil(height / rowHeight) ;
        const currentRows = Math.ceil(height / rowHeight) - 2;
        // console.log('Math.ceil(height / rowHeight) - 1:', height)
        // if (currentRows <= previousRows) {

        //     setTextareaheight(currentRows);

        // }

        if (currentRows !== previousRows) {
            // console.log('currentRows:', currentRows)
            ev.target.rows = currentRows;
        }
        // console.log('currentRows:', currentRows)
        // if (currentRows >= maxRows) {
        //     ev.target.rows = maxRows;
        //     ev.target.scrollTop = ev.target.scrollHeight;
        // }

        // setTextareaheight(currentRows < maxRows ? currentRows : maxRows)
        // setTextareaheight(currentRows)
    }

    return (
        <footer className="chat-footer">
            <IconButton onClick={() => setShowPicker(val => !val)}>
                <InsertEmoticon />
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
                {/* <textarea
                    rows={1}
                    placeholder="Type a message"
                    value={input}
                    onChange={handleChange}
                    ref={inputRef}
                // height={scrollHeight}
                /> */}
                <input type="text"
                    placeholder="Type a message"
                    value={input}
                    onChange={ev => setInput(ev.target.value)}
                    ref={inputRef} />
            </form>
            {input ?
                <IconButton onClick={sendMsg}>
                    <Send />
                </IconButton> :
                <IconButton>
                    <Mic />
                </IconButton>}
        </footer>
    )
}

export default ChatFooter





// function handleChange(ev) {
//     const textareaLineHeight = 24;
//     const rows = 5
//     const minRows = 5
//     const maxRows = 10
//     const previousRows = ev.target.rows;
//     ev.target.rows = minRows; // reset number of rows in textarea

//     const currentRows = ~~(ev.target.scrollHeight / textareaLineHeight)

//     if (currentRows === previousRows) {
//         ev.target.rows = currentRows;
//     }

//     if (currentRows >= maxRows) {
//         ev.target.rows = maxRows;
//         ev.target.scrollTop = ev.target.scrollHeight;
//     }

//     setTextareaheight(currentRows < maxRows ? currentRows : maxRows)
// };

