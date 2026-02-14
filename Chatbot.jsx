// components/Chatbot.jsx
import { useState } from 'react';
import axios from 'axios';

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    try {
      const res = await axios.post('http://localhost:5000/api/chatbot', {
        userMessage: input,
      });

      setMessages([...newMessages, { sender: 'bot', text: res.data.reply }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages([...newMessages, { sender: 'bot', text: '⚠️ Error: Could not get response' }]);
    }
  };

  return (
    <div className="chatbot-container p-4 rounded-xl bg-white shadow-md max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4 text-center">Welcome to PeerMate Bot</h2>
      <div className="h-64 overflow-y-scroll space-y-2 border rounded p-2 bg-gray-50">
        {messages.map((msg, idx) => (
          <div key={idx} className={msg.sender === 'user' ? 'text-right' : 'text-left'}>
            <div className={`inline-block p-2 rounded-lg ${msg.sender === 'user' ? 'bg-blue-200' : 'bg-gray-200'}`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex">
        <input
          className="flex-1 border p-2 rounded-l focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="bg-black text-white px-4 rounded-r hover:bg-gray-800"
        >
          Send
        </button>
      </div>
    </div>
  );
}
