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

// CHANGE IMG OPTION
// CHANGE TIME MARKING
// make input small after sending
// CREATE BACKEND FILE
// DEAL WITH CHATS WITHOUT MSGS APPEARING
// ADD PHONE MODE
// MAKE BOTH HOMEPAGES RESPONSIVE AND NICE
// ADD TRY AND CATCH TO ALL

// HARD //////////////////////

// VV - Add scroll in chat footer input

// INFINITE SCROLL
// ADD SOUNDS FOR SENT OR INCOME
// ADD V MARK
// dont let user add chat that exists
// fix filter (chats dont have names)
// Save enter spaces in input footer when sending

// CHANGE EVRYTHING TO WORK WITH STORE?
// ADD VOICE RECORDINGS ?
// ADD FILE SENDING ?
// FIX QUERY ?
