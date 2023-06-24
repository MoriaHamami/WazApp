import { logout } from "../../services/user.actions"
import UploadImg from "../upload-img"

function SidebarDropdown({ loggedInUserId, setIsOptionsSelected, setIsChatPopupShown, setIsGroupPopupShown }) {

    function handleClick(isChangeState, func){
        if(func && isChangeState) func(prevState => !prevState)
        else if(func) func()
        // Hide dropdown after click
        setIsOptionsSelected(prevState => !prevState)
    }

    return (
        <div className="dropdown">
            {/* <button onClick="myFunction()" className="dropbtn">Dropdown</button> */}
            <div id="myDropdown" className="dropdown-content">
                <section onChange={()=>setIsOptionsSelected(prevState => !prevState)}>
                    <p>Change profile image</p>
                    <UploadImg type={'user'} id={loggedInUserId} />
                </section>
                <a onClick={() => handleClick(true, setIsGroupPopupShown)}>New group</a>
                <a onClick={() => handleClick(true, setIsChatPopupShown)}>New chat</a>
                <a onClick={() => handleClick(false, logout)}>Log out</a>
            </div>
        </div>
    )
}

export default SidebarDropdown