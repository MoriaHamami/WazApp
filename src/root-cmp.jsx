// import Sidebar from "./cmps/sidebar";
// import Chat from "./cmps/chat";
import { useEffect, useState } from "react";
import MainPage from "./views/main-page";
import { Routes, Route } from 'react-router'
import LoginPage from "./views/login-page";
import { useDispatch, useSelector } from "react-redux";
import { userService } from "./services/user.service";
import { login } from "./services/user.actions";
import { store } from "./services/store";
import { SET_USER } from "./services/user.reducer";

import { setLoader } from "./services/loader.actions";
import Loader from "./views/loader";

function App() {
  // const [isLoading, setIsLoading] = useState(true)
  const isLoading = useSelector(storeState => storeState.loaderModule.isLoading)
  const loggedInUser = useSelector(storeState => storeState.userModule.user)
  useEffect(() => {
    // if(loggedInUser) return 
    updateUser()
  }, [])

  async function updateUser() {
    const user = await userService.getLoggedinUser()
    // console.log('user:', user)
    if (user) {
      // setLoggedInUser(user)
      // console.log('here:', user)
      await login(user)
      // Save user in store
      // store.dispatch({
      //   type: SET_USER,
      //   user
      // })
      // setLoader(true)
    } 
    // else {
      setLoader(false)
    // }
    // setIsLoading(false)
  }

  // const loggedInUser = userService.getLoggedinUser()

  return (
    isLoading ?
      <Loader /> : (
        <div className="app">
          {!loggedInUser ? (
            <LoginPage />
          ) : (
            <main className='app-body'>
              <Routes>
                <Route element={<MainPage loggedInUser={loggedInUser} />} path="rooms/:roomId?" />
              </Routes>
            </main>
          )}
        </div>
      )
  )
}

export default App;

// TODOSSSSSS

// VV - FIRST LOAD NOT ON FIRST CHAT
// VV - RENDER LIST ACCORDING TO LAST MSG
// VV - RENDER BETTER ALL -APPEAR AT ONCE
// VV - make input small after sending
// VV - Save enter spaces in input footer when sending
// VV - ADD PHONE MODE
// VV - MAKE BOTH HOMEPAGES RESPONSIVE AND NICE
// VV - IF ONLY SELF IS WRITTEN OR GROUP NAME ISNT WRITTEN IN NEW CHAT MAKE ERROR
// VV - DEAL WITH CHATS WITHOUT MSGS APPEARING
// VV - ADD READBY MARK

// VX - CHANGE TIME MARKING

// CHANGE GROUP NAME
// CHANGE PARTICIPANTS IN GROUP
// DELETE GROUP
// CHANGE GROUP FROM LAST SEEN TO PARTICIPANTS
// CREATE BACKEND FILE
// ADD TRY AND CATCH TO ALL

// HARD //////////////////////

// VV - Add scroll in chat footer input

// ADD SOUNDS FOR SENT OR INCOME
// CHANGE IMG OPTION
// When searching message in chat jump to it instead of showing only it
// ADD UNREADMSGS COUNT
// dont let user add chat that exists
// fix filter (chats dont have names)

// INFINITE SCROLL ?
// CHANGE EVRYTHING TO WORK WITH STORE?
// ADD VOICE RECORDINGS ?
// ADD FILE SENDING ?
// FIX QUERY ?
// MAKE ONLINE OPTION ?
// REMOVE LAST SEEN ENTIRELY?
// CHANGE USER NAME ?
