import React, { useState } from 'react';
import gptLogo from './assets/chatgpt.svg';
import addBtn from './assets/add-30.png';
import msgIcon from './assets/message.svg';
import home from './assets/home.svg';
import saved from './assets/bookmark.svg';
import rocket from './assets/rocket.svg';

function App() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi there! How can I help you today?' },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: 'user', text: input }]);
    setInput('');
    // 🧠 TODO: hook into GPT API and update:
    // setMessages(prev => [...prev, { from: 'bot', text: apiReply }]);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col justify-between p-4">
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
              <img src={msgIcon} alt="" className="inline-block w-4 h-4 mr-2" />
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

      {/* Chat Area */}
      <div className="flex-1 bg-gray-100 flex flex-col">
        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.from === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  msg.from === 'user'
                    ? 'bg-blue-500 text-white rounded-br-none'
                    : 'bg-white text-gray-900 rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 bg-white flex items-center">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded px-4 py-2 mr-2 focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Type your message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
