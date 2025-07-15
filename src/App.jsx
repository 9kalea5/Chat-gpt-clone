import gptLogo from './assets/chatgpt.svg'
import addBtn from "./assets/add-30.png"
import msgIcon from "./assets/message.svg"
import home from "./assets/home.svg"
import saved from "./assets/bookmark.svg"
import rocket from "./assets/rocket.svg"

function App() {
  return (
    <>
      <div className="w-64 h-screen bg-gray-900 text-white flex flex-col justify-between p-4">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <img src={gptLogo} alt="logo" className="h-6 w-6" />
            <span className="text-lg font-semibold">TheBot</span>
          </div>

          <button className="w-full flex items-center justify-center bg-gray-700 hover:bg-gray-600 p-2 rounded mb-4">
            <img src={addBtn} alt="" className="w-4 h-4 mr-2" />
            New Chat
          </button>

          <div className="space-y-2">
            <button className="w-full text-left bg-gray-800 p-2 rounded hover:bg-gray-700">
              <img src={msgIcon} alt="" className="inline-block w-4 h-4 mr-2" />
              What is Programming?
            </button>
            <button className="w-full text-left bg-gray-800 p-2 rounded hover:bg-gray-700">
              <img src="msgIcon" alt="" className="inline-block w-4 h-4 mr-2" />
              How to use an API?
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm hover:bg-gray-800 p-2 rounded cursor-pointer">
            <img src={home} alt="" className="w-4 h-4" />
            Home
          </div>
          <div className="flex items-center gap-2 text-sm hover:bg-gray-800 p-2 rounded cursor-pointer">
            <img src={saved} alt="" className="w-4 h-4" />
            Save
          </div>
          <div className="flex items-center gap-2 text-sm hover:bg-gray-800 p-2 rounded cursor-pointer">
            <img src={rocket} alt="" className="w-4 h-4" />
            Upgrade
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
