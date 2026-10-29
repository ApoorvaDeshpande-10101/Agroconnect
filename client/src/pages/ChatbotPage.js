import React, { useState, useRef, useEffect } from 'react';
import { getBotResponse } from '../assets/chatbotData';

const QUICK_QUESTIONS = [
  'What is NPK fertilizer?',
  'Kharif crops list',
  'Rice farming tips',
  'Drip irrigation benefits',
  'Government schemes for farmers',
  'Organic farming tips',
];

function ChatBubble({ msg }) {
  const isBot = msg.role === 'bot';
  return (
    <div className={`chat-msg flex gap-2 ${isBot ? '' : 'flex-row-reverse'}`}>
      <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-bold ${isBot ? 'bg-primary-100 text-primary-700' : 'bg-blue-100 text-blue-700'}`}>
        {isBot ? '🤖' : '👤'}
      </div>
      <div
        className={`max-w-xs sm:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
          isBot
            ? 'bg-white border border-gray-100 text-gray-700 rounded-tl-sm shadow-sm'
            : 'bg-primary-600 text-white rounded-tr-sm'
        }`}
      >
        {msg.text}
      </div>
    </div>
  );
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Namaste! 🌾 I am KrishiBot, your farming assistant. Ask me about fertilizers, crops, seasons, irrigation, or government schemes!\n\nType your question or tap a quick option below.' }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const sendMessage = (text) => {
    const userText = text || input.trim();
    if (!userText) return;
    setMessages((prev) => [...prev, { role: 'user', text: userText }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      const reply = getBotResponse(userText);
      setMessages((prev) => [...prev, { role: 'bot', text: reply }]);
      setTyping(false);
    }, 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col page-enter">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-700 to-green-600 text-white py-5 px-4 text-center">
        <div className="flex items-center justify-center gap-3">
          <span className="text-3xl">🤖</span>
          <div>
            <h1 className="text-xl font-bold">KrishiBot</h1>
            <p className="text-green-100 text-xs">Your Smart Farming Assistant · Always Online</p>
          </div>
        </div>
      </div>

      {/* Quick Questions */}
      <div className="bg-white border-b border-gray-100 px-4 py-3">
        <p className="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wide">Quick Topics</p>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {QUICK_QUESTIONS.map((q) => (
            <button
              key={q}
              onClick={() => sendMessage(q)}
              className="flex-shrink-0 text-xs bg-primary-50 text-primary-700 border border-primary-200 px-3 py-1.5 rounded-full hover:bg-primary-100 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 max-w-3xl w-full mx-auto">
        {messages.map((msg, i) => <ChatBubble key={i} msg={msg} />)}
        {typing && (
          <div className="chat-msg flex gap-2">
            <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-sm">🤖</div>
            <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
              <div className="flex gap-1 items-center h-4">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-primary-400 rounded-full animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-100 px-4 py-3 max-w-3xl w-full mx-auto">
        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            className="input flex-1 resize-none py-3 text-sm"
            placeholder="Ask about crops, fertilizers, seasons..."
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim()}
            className="btn-primary px-5 disabled:opacity-40 disabled:cursor-not-allowed self-end"
          >
            Send
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-2 text-center">Press Enter to send · Shift+Enter for new line</p>
      </div>
    </div>
  );
}
