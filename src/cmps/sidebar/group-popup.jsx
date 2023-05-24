import MultiInput from "./multi-input"

function GroupPopup({createChat}) {

    // async function addNewGroup(){
    //     const roomName = prompt('Please enter name for chat')
    //     if (roomName) {
    //         const roomsCol = collection(db, 'rooms')
    //         await addDoc(roomsCol, {
    //             name: roomName,
    //             timestamp: serverTimestamp()
    //         })
    //     }
    //     setIsGroupPopupShown(prevState => !prevState)
    // }

  return (
    <div className="group-popup">
        <div className="content-container">

        <MultiInput createChat={createChat} />
        </div>
    </div>
  )
}

export default GroupPopup