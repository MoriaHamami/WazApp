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
import InfoPage from "./views/info-page";
import Chat from "./cmps/chat/chat";
import Sidebar from "./cmps/sidebar/sidebar";
import IntroChat from "./cmps/chat/intro-chat";
import GroupInfo from "./cmps/chat/group-info";

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
  // <Route element={<InfoPage loggedInUser={loggedInUser} />} path="rooms/:roomId/info" />
  // <Route element={<MainPage loggedInUser={loggedInUser} />} path="rooms/:roomId?" />
  // <Route element={<GroupInfo loggedInUser={loggedInUser} />} path="info" />

  return (
    isLoading ?
      <Loader /> : (
        <div className="app">
          {!loggedInUser ? (
            <LoginPage />
          ) : (
            <main className='app-body'>
              <article className="main-page">

                <Routes>
                  <Route path="rooms" element={<Sidebar />}  >
                    <Route index element={<IntroChat />} />
                    <Route path=":roomId" element={<Chat loggedInUser={loggedInUser} />} />
                    <Route path=":roomId/info" element={<GroupInfo loggedInUser={loggedInUser} />} />
                  </Route>
                </Routes>
              </article>
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
// VV - CHANGE TIME MARKING
// VV - Show image of chats according to other participants
// VV- CHANGE GROUP NAME
// VV - CHANGE PARTICIPANTS IN GROUP
// VV - DELETE GROUP / LEAVE GROUP
// VV - Change place to upload img 


// CHANGE GROUP FROM LAST SEEN TO PARTICIPANTS
// CREATE BACKEND FILE
// ADD TRY AND CATCH TO ALL


// HARD //////////////////////

// VV - Add scroll in chat footer input
// VV - CHANGE IMG OPTION
// VV - fix filter (chats dont have names)
// VV - dont let user add chat that exists

// When searching message show list and if selected jump to it (with key id) instead of showing only it
// ADD SOUNDS FOR SENT OR INCOME


// VV - IMPROVE QUERY ?

// ADD VOICE RECORDINGS ?
// ADD FILE SENDING ?


// DECIDED NOT TO //////////////////

// REMOVE LAST SEEN ENTIRELY ?
// ADD UNREAD chats COUNT to chat header ?
// INFINITE SCROLL ?
// CHANGE EVRYTHING TO WORK WITH STORE?
// MAKE ONLINE OPTION ?
// CHANGE USER NAME ?
