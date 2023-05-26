import { collection, getDocs, query, where } from "@firebase/firestore";
import { useState } from "react";
import { ReactMultiEmail, isEmail } from 'react-multi-email';
import 'react-multi-email/dist/style.css';
import { useSelector } from "react-redux";
import db from "../../services/firebase";
import { userService } from "../../services/user.service";
import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

function ChatPopup({ createChat, setIsChatPopupShown, loggedInEmail }) {

    const [email, setEmail] = useState('')
    const [invalidEmail, setInvalidEmail] = useState('')
    const loggedInUser = useSelector(storeState => storeState.userModule.user)

    function handleChange({ target }) {
        const email = target.value
        // Remove invalid emails
        if (invalidEmail !== email) setInvalidEmail('')
        setEmail(email)
    }


    async function onSubmit(ev) {
        ev.preventDefault()

        // TODO - Dont add chat if there is a chat with same user 

        // If user didnt add different member, dont open chat
        if(loggedInEmail === email) return

        // const decryptedUser = await userService.getLoggedinUser()
        // const loggedInUserEmail = decryptedUser.password
        // console.log('loggedInUserEmail:', loggedInUserEmail)

        // Check if emails exist in db 
        const usersCol = query(collection(db, 'users'), where("password", "==", email))

        // TODO - CHANGE TO ONSNAPSHOT
        const usersSnapshot = await getDocs(usersCol)
        // console.log('usersSnapshot.docs:', usersSnapshot.docs.map(e => e.data()))
        // console.log('usersSnapshot.docs:', usersSnapshot.docs.length)
        // If email was not found in db
        const participants = [loggedInUser.id]
        usersSnapshot.docs.map(user => {
            // return ({
                //     email: user.data().password,
                //     name: user.data().name
                // })
                participants.push(user.id)
                // return user.data().id
            })
        if (!usersSnapshot.docs.length) {
            return setInvalidEmail(email)
        }

        // console.log('participants:', participants)
        // console.log('groupSub:', groupSub)
        createChat(participants, null)
    }


    return (
        <div className="chat-popup" onClick={(ev) => ev.stopPropagation()}>
            <div className="content-container">
                <IconButton className="close-btn" onClick={() => setIsChatPopupShown(prevState => !prevState)}>
                    <CloseIcon />
                </IconButton>
                <form onSubmit={onSubmit}>
                    <h2>New Chat</h2>
                    <h3>Contact email</h3>
                    <input type="text"
                        placeholder="Type contact email"
                        value={email}
                        onChange={handleChange} />

                    {invalidEmail && <div className="invalid-msg">
                        {invalidEmail} isn't a member on WazApp <a target="_blank" href={`https://mail.google.com/mail/?view=cm&fs=1&to=${invalidEmail}&su=Let\'s chat!&body=Let\'s chat on WazApp! It\'s a fast, simple, and secure app we can use to message each other for free. Join at https://wazapp-fc40f.web.app/`}>send invite</a>
                    </div>}
                    {loggedInEmail === email && <div className="invalid-msg">
                        Chat must include a different member
                    </div>}
                    <button>Open chat</button>
                </form>
            </div>
        </div>
    )
}

export default ChatPopup







