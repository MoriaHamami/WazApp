import { useState } from "react";
import { ReactMultiEmail, isEmail } from 'react-multi-email';
import 'react-multi-email/dist/style.css';

function MultiInput() {

    const [emails, setEmails] = useState([])
  const [focused, setFocused] =useState(false)

    return (
        <form>
            <h2>New Group</h2>
            <h3>Group Subject</h3>
            <input type="text" />
        <h3>Add participants</h3>
        <ReactMultiEmail
          placeholder='Type participants emails'
          emails={emails}
          onChange={(_emails) => {
            setEmails(_emails)
          }}
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
        {/* <p>{emails.join(', ') || 'empty'}</p> */}
        <button>Create</button>
      </form>
    )
}

export default MultiInput