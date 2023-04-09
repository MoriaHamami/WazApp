import Chat from "./cmps/chat";
import Sidebar from "./cmps/sidebar";

function App() {
  return (
    <div className="app">
      <main className='app-body'>
        <Sidebar />
        <Chat />
      </main>
    </div>
  )
}

export default App;
