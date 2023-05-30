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

function App() {
  // const [loggedInUser, setLoggedInUser] = 
const loggedInUser=useSelector(storeState => storeState.userModule.user)
  useEffect(() => {
    // if(loggedInUser) return 
    updateUser()
  }, [])

  async function updateUser(){
    const user = await userService.getLoggedinUser()
    // console.log('user:', user)
    if (user) {
      // setLoggedInUser(user)
      // console.log('here:', user)
      login(user)
      // Save user in store
      // store.dispatch({
      //   type: SET_USER,
      //   user
      // })
    }
  }

  // const loggedInUser = userService.getLoggedinUser()

  return (
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
}

export default App;

// TODOSSSSSS

// VV - FIRST LOAD NOT ON FIRST CHAT
// RENDER LIST ACCORDING TO LAST MSG
// CHANGE IMG OPTION
// CHANGE TIME MARKING
// ADD PHONE MODE
// CREATE BACKEND FILE

// HARD //////////////////////

// ADD SOUNDS FOR SENT OR INCOME
// ADD V MARK
// RENDER BETTER ALL -APPEAR AT ONCE

// ADD VOICE RECORDINGS ?
// ADD FILE SENDING ?
// FIX QUERY ?
