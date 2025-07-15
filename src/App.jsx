import React, { useState } from 'react';
import gptLogo from './assets/chatgpt.svg';
import addBtn from './assets/add-30.png';
import msgIcon from './assets/message.svg';
import home from './assets/home.svg';
import saved from './assets/bookmark.svg';
import rocket from './assets/rocket.svg';
import send from './assets/send.svg'

export default function App() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi there! How can I help you today?' },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: 'user', text: input }]);
    setInput('');
    // Example placeholder for bot response
    setTimeout(() => {
      setMessages(prev => [...prev, { from: 'bot', text: "I'm an AI. Here's my answer!" }]);
    }, 500);
  };

  return (
    <div className="flex h-screen w-screen">
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
      <div className="flex-1 relative flex flex-col bg-gray-700 w-full">
        {/* Messages Area with bottom padding */}
        <div className="flex-1 overflow-y-auto p-4 pb-24 flex flex-col space-y-4 w-full">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex w-full ${
                msg.from === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.from === 'bot' ? (
                <div className="flex items-start max-w-md">
                  <img src={gptLogo} alt="AI" className="w-8 h-8 mr-2" />
                  <div className="bg-white text-gray-900 px-4 py-2 rounded-lg rounded-bl-none shadow">
                    {msg.text}
                  </div>
                </div>
              ) : (
                <div className="bg-blue-500 text-white max-w-md px-4 py-2 rounded-lg rounded-br-none shadow">
                  {msg.text}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input area floating at bottom */}
        <div className="absolute bottom-0 rounded-2xl left-0 right-0 bg-gray-500 p-4 flex justify-center m-4">
          <div className="flex items-center w-full max-w-2xl">
            <input
              type="text"
              className="flex-1 border rounded-2xl border-gray-500 bg-gray-200 text-black placeholder-gray-400 px-4 py-2 mr-2 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              onClick={sendMessage}
            >
              <img src={send} alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
