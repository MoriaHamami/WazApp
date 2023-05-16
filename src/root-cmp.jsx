// import Sidebar from "./cmps/sidebar";
// import Chat from "./cmps/chat";
import HomePage from "./views/home-page";
import MainPage from "./views/main-page";
import { Routes, Route  } from 'react-router'

function App() {
  return (
    <div className="app">
      <main className='app-body'>
        <Routes>
            <Route element={<HomePage />} path="/" />
            <Route element={<MainPage />} path="rooms/:roomId?" />
            {/* <Route element={<Sidebar />} path="rooms" />
            <Route element={<Chat />} path="rooms/:roomId" /> */}
        </Routes>
      </main>
    </div>
  )
}

export default App;
