import { logout } from "../../services/user.actions"

function Dropdown({ setIsOptionsSelected, setIsChatPopupShown, setIsGroupPopupShown }) {
    return (
        <div className="dropdown" onClick={() => setIsOptionsSelected(prevState => !prevState)}>
            {/* <button onClick="myFunction()" className="dropbtn">Dropdown</button> */}
            <div id="myDropdown" className="dropdown-content">
                <a onClick={()=>setIsGroupPopupShown(prevState => !prevState)}>New group</a>
                <a onClick={()=>setIsChatPopupShown(prevState => !prevState)}>New chat</a>
                <a onClick={logout}>Log out</a>
            </div>
        </div>
    )
}

export default Dropdown