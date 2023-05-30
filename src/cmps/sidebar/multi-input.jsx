import { collection, getDocs, query, where } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { ReactMultiEmail, isEmail } from 'react-multi-email';
import 'react-multi-email/dist/style.css';
import { useSelector } from "react-redux";
import db from "../../services/firebase";
import { userService } from "../../services/user.service";

function MultiInput({ createChat, loggedInEmail }) {

    const [groupSub, setGroupSub] = useState('')
    const [emails, setEmails] = useState([])
    // const [loggedInEmail, setLoggedInEmail] = useState('')
    const [invalidEmails, setInvalidEmails] = useState([])
    const [focused, setFocused] = useState(false)
    const loggedInUser = useSelector(storeState => storeState.userModule.user)

    // useEffect(() => {
    //     updateLoggedInEmail()
    // }, [loggedInUser])
    
    // async function updateLoggedInEmail() {
    //     const decryptedUser = await userService.getLoggedinUser()
    // setLoggedInEmail(decryptedUser.password)
    // }

    function handleChange(ev) {


        if (ev.target) {
            const groupSub = ev.target.value
            setGroupSub(groupSub)
        } else {
            // Emails input
            const emails = ev
            // Remove invalid emails
            const updatedInvalidEmails = invalidEmails.filter(email => emails.includes(email))
            setInvalidEmails(updatedInvalidEmails)
            setEmails(emails)
            // console.log('emails:', emails)
        }
    }

    async function onSubmit(ev) {

        // TODO - Group subject is required

        ev.preventDefault()

        // const decryptedUser = await userService.getLoggedinUser()
        // const loggedInUserEmail = decryptedUser.password
        // console.log('loggedInUserEmail:', loggedInUserEmail)

        // Dont open group if logged in user is only one added to group
        if(emails.length === 1 && loggedInEmail === emails[0]) return
        // Check if emails exist in db 
        const usersCol = query(collection(db, 'users'), where("password", "in", emails))
        const usersSnapshot = await getDocs(usersCol)
        // console.log('usersSnapshot.docs:', usersSnapshot.docs.map(e => e.data()))
        // console.log('usersSnapshot.docs:', usersSnapshot.docs.length)
        // If not all emails were found in db
        if (usersSnapshot.docs.length !== emails.length) {
            // If no emails were found in db, all are invalid
            if (usersSnapshot.docs.length === 0) return setInvalidEmails(emails)
            // Find all emails that werent included in db query
            const invalidEmails = emails.filter(email => {
                const foundEmail = usersSnapshot.docs.find(user => user.data().password === email)?.data()
                // console.log('isEmailFound:', foundEmail)
                // If email isnt found add to invalidEmails arr
                return !foundEmail
            })
            // console.log('invalidEmails:', invalidEmails)
            return setInvalidEmails(invalidEmails)
        }


let participants = []
        usersSnapshot.docs.map(user => {
            // return ({
                //     email: user.data().password,
                //     name: user.data().name
                // })
                participants.push(user.id)
                // return user.data().id
            })
            // // If user didnt add self, add the logged in user to group
            if (!emails.includes(loggedInEmail)) {
                participants.push(loggedInUser.id)
            }
        // console.log('participants:', participants)
        // Add group to db 
        // rooms => createdBy, participants, name, timeCreated
        // msgs =>
        // console.log('emails:', emails)
        // console.log('groupSub:', groupSub)
        createChat(participants, groupSub, 'group')

    }

    return (
        <form onSubmit={onSubmit}>
            <h2>New Group</h2>
            <h3>Group Subject</h3>
            <input type="text"
                value={groupSub}
                placeholder="Type group subject"
                onChange={handleChange} />
            <h3>Add participants</h3>
            <ReactMultiEmail
                placeholder="Type participants' emails"
                emails={emails}
                onChange={handleChange}
                autoFocus={true}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                getLabel={(email, index, removeEmail) => {
                    return (
                        <div data-tag key={index}>
                            <div data-tag-item>{email}</div>
                            <span data-tag-handle onClick={() => removeEmail(index)}>
                                ×
                            </span>
                        </div>
                    );
                }}
            />
            {/* <br /> */}
            {invalidEmails.length ? <ul className="invalid-msg">
                {invalidEmails.map(invalidEmail => {
                    return (<li key={invalidEmail}>
                        {invalidEmail} isn't a member on WazApp <a target="_blank" href={`https://mail.google.com/mail/?view=cm&fs=1&to=${invalidEmail}&su=Let\'s chat!&body=Let\'s chat on WazApp! It\'s a fast, simple, and secure app we can use to message each other for free. Join at https://wazapp-fc40f.web.app/`}>send invite</a>
                    </li>)
                })}
            </ul> : ''}
            {emails.length === 1 && loggedInEmail === emails[0] && <div className="invalid-msg">
                Groups must include at least two members 
                </div>}
            {/* <p>{emails.join(', ') || 'empty'}</p> */}
            <button>Create</button>
        </form>
    )
}

export default MultiInput