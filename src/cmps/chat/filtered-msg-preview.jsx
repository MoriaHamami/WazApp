import { useSelector } from "react-redux"

function FilteredMsgPreview({ id, idx, name, msg, readBy, participants, chatType, date, prevDate, timestamp}) {

    const loggedInUser = useSelector(storeState => storeState.userModule.user)


  return (
    <a className='filtered-msg-preview' href={`#${id}`}>
        {/* <div className={`rect ${name === loggedInUser.name && 'reciever'}`}></div> */}
                <div className={`chat-msg ${name === loggedInUser.name && 'reciever'}`}>
                    {chatType === 'group' && <p className="username">{name}</p>}
                    <p className="content">{msg}</p>
                    <p className="timestamp">{date}</p>
                    {/* <p className="timestamp">{new Date(timestamp?.toDate()).toUTCString()}</p> */}
                </div>
    </a>
  )
}

export default FilteredMsgPreview