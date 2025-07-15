import React, { useState, useEffect, useRef } from 'react';
import gptLogo from './assets/chatgptLogo.svg';
import addBtn from './assets/add-30.png';
import msgIcon from './assets/message.svg';
import home from './assets/home.svg';
import saved from './assets/bookmark.svg';
import rocket from './assets/rocket.svg';
import send from './assets/send.svg';

export default function App() {
  const [messages, setMessages] = useState([]); // Start with empty chat
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const generateBotResponse = async (history) => {
    const formattedHistory = history.map(({ from, text }) => ({
      role: from === 'user' ? 'user' : 'model',
      parts: [{ text }],
    }));

    const endpoint = `${import.meta.env.VITE_API_URL}?key=${import.meta.env.VITE_API_KEY}`;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: formattedHistory,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Something went wrong');
      }

      console.log('Gemini response:', data);

      // Gemini returns `candidates` array
      const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response.';
      return botReply;
    } catch (error) {
      console.error('Error:', error);
      return 'Error: Failed to get response from API.';
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { from: 'user', text: input }]);
    setLoading(true);

    try {
      const allMessages = [...messages, { from: 'user', text: input }];
      const botResponse = await generateBotResponse(allMessages);
      setMessages((prev) => [...prev, { from: 'bot', text: botResponse }]);
    } catch {
      setMessages((prev) => [...prev, { from: 'bot', text: 'Failed to get response.' }]);
    } finally {
      setLoading(false);
      setInput('');
    }
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

          <button
            className="w-full flex items-center justify-center bg-gray-700 hover:bg-gray-600 p-2 rounded mb-4"
            onClick={() => setMessages([])}
          >
            <img src={addBtn} alt="" className="w-4 h-4 mr-2" />
            New Chat
          </button>

          <div className="space-y-2">
            <button
              className="w-full text-left bg-gray-800 p-2 rounded hover:bg-gray-700"
              onClick={() => setInput('What is Programming?')}
            >
              <img src={msgIcon} alt="" className="inline-block w-4 h-4 mr-2" />
              What is Programming?
            </button>
            <button
              className="w-full text-left bg-gray-800 p-2 rounded hover:bg-gray-700"
              onClick={() => setInput('How to use an API?')}
            >
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
        <div className="flex-1 overflow-y-auto p-4 pb-24 flex flex-col space-y-4 w-full">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex w-full ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.from === 'bot' ? (
                <div className="flex items-start max-w-md">
                  <img src={gptLogo} alt="AI" className="w-8 h-8 mr-2 bg-blue-300" />
                  <div className="bg-blue-300 text-gray-900 px-4 py-2 rounded-lg rounded-bl-none shadow">
                    {msg.text}
                  </div>
                </div>
              ) : (
                <div className="bg-white text-black max-w-md px-4 py-2 rounded-lg rounded-br-none shadow">
                  {msg.text}
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex justify-start w-full">
              <div className="flex items-start max-w-md">
                <img src={gptLogo} alt="AI" className="w-8 h-8 mr-2 opacity-50" />
                <div className="bg-white text-gray-400 px-4 py-2 rounded-lg rounded-bl-none shadow italic">
                  Typing...
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input area */}
        <div className="absolute bottom-0 left-0 right-0 bg-gray-100 p-4 flex justify-center ml-9 mr-9 mb-2 rounded-2xl">
          <div className="flex items-center w-full max-w-2xl">
            <input
              type="text"
              className="flex-1 border rounded-2xl border-gray-100 bg-gray-100 text-black placeholder-gray-400 px-4 py-2 mr-2 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              disabled={loading}
            />
            <button
              className="bg-blue-500 hover:bg-blue-600 text-black px-4 py-2 rounded"
              onClick={sendMessage}
              disabled={loading}
            >
              <img src={send} alt="send" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
