import { collection, getDocs, query, where } from "@firebase/firestore";
import { useState } from "react";
import { ReactMultiEmail, isEmail } from 'react-multi-email';
import 'react-multi-email/dist/style.css';
import { useSelector } from "react-redux";
import db from "../../services/firebase";
import { userService } from "../../services/user.service";

function MultiInput({ createChat }) {

    const [groupSub, setGroupSub] = useState('')
    const [emails, setEmails] = useState([])
    const [invalidEmails, setInvalidEmails] = useState([])
    const [focused, setFocused] = useState(false)
    const loggedInUser = useSelector(storeState => storeState.userModule.user)

    function handleChange(ev) {

        // Remove invalid emails

        if (ev.target) {
            const groupSub = ev.target.value
            setGroupSub(groupSub)
        } else {
            // Emails input
            const emails = ev
            setEmails(emails)
            // console.log('emails:', emails)
        }
    }

    async function onSubmit(ev) {
        ev.preventDefault()

        // If user didnt add self, add the logged in user to group
        const decryptedUser = await userService.getLoggedinUser()
        const loggedInUserEmail = decryptedUser.password
        // console.log('loggedInUserEmail:', loggedInUserEmail)
        
        // Check if emails exist in db 
        const usersCol = query(collection(db, 'users'), where("password", "in", emails))
        const usersSnapshot = await getDocs(usersCol)
        console.log('usersSnapshot.docs:', usersSnapshot.docs.map(e => e.data()))
        // console.log('usersSnapshot.docs:', usersSnapshot.docs.length)
        // If not all emails were found in db
        if (usersSnapshot.docs.length !== emails.length) {
            // If no emails were found in db, all are invalid
            if(usersSnapshot.docs.length === 0) return setInvalidEmails(emails)
            // Find all emails that werent included in db query
            const invalidEmails = emails.filter(email => {
                const foundEmail = usersSnapshot.docs.find(user => user.data().password === email)?.data()
                console.log('isEmailFound:', foundEmail)
                // If email isnt found add to invalidEmails arr
                return !foundEmail
            })
            console.log('invalidEmails:', invalidEmails)
            return setInvalidEmails(invalidEmails)
        }

        if (!emails.includes(loggedInUserEmail)) {
            emails.push(loggedInUserEmail)
        }
        // If emails dont exist, add 'send invite' option

        // Add group to db 
        // rooms => createdBy, participants, name, timeCreated
        // msgs =>
        console.log('emails:', emails)
        console.log('groupSub:', groupSub)
        createChat(emails, groupSub)
    
    }

    return (
        <form onSubmit={onSubmit}>
            <h2>New Group</h2>
            <h3>Group Subject</h3>
            <input type="text"
                value={groupSub}
                onChange={handleChange} />
            <h3>Add participants</h3>
            <ReactMultiEmail
                placeholder='Type participants emails'
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
            <br />
            {invalidEmails && <ul className="invalid-emails">
                {invalidEmails.map(invalidEmail => {
                    return(<li key={invalidEmail}>
                        {invalidEmail}
                        <a href="#"> Send invite</a>
                    </li>)
                })}
            </ul>}
            {/* <p>{emails.join(', ') || 'empty'}</p> */}
            <button>Create</button>
        </form>
    )
}

export default MultiInput