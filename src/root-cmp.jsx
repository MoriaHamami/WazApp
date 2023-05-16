// import Sidebar from "./cmps/sidebar";
// import Chat from "./cmps/chat";
import { useState } from "react";
import MainPage from "./views/main-page";
import { Routes, Route  } from 'react-router'
import LoginPage from "./views/login-page";
import { useDispatch, useSelector } from "react-redux";

function App() {

  const loggedInUser = useSelector(storeState => storeState.userModule.user)
  
  return (
    <div className="app">
    {!loggedInUser ? (
      <LoginPage/>
    ) : (
      <main className='app-body'>
        <Routes>
            <Route element={<MainPage loggedInUser={loggedInUser}/>} path="rooms/:roomId?" />
            {/* <Route element={<Sidebar />} path="rooms" />
            <Route element={<Chat />} path="rooms/:roomId" /> */}
        </Routes>
      </main>
    )}
    </div>
  )
}

export default App;
