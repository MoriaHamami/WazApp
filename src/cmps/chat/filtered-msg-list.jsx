import { utilService } from "../../services/util.service"
import FilteredMsgPreview from "./filtered-msg-preview"

function FilteredMsgList({ setIsSearchShown, filteredMsgs, chatType, participants}) {
    
  return (
    <div className="filtered-msg-list" onClick={()=> setIsSearchShown(false)}>
        {filteredMsgs.length ? filteredMsgs.map((msg, idx) => (
                    <FilteredMsgPreview 
                    id={msg.id}
                        key={msg.id}
                        idx={idx}
                        name={msg.name}
                        msg={msg.msg}
                        readBy={msg.readBy}
                        participants={participants}
                        chatType={chatType}
                        date={utilService.getChatListFormattedDate(msg.timestamp)} />
            )) : <p className="search-msg">Search messages</p>}
    </div>
  )
}

export default FilteredMsgList