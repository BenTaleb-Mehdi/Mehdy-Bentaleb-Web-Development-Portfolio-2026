// components/Chatbot.tsx
'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RobotIcon } from './Icons';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    { role: 'bot', text: "Hi! I'm Mehdi's AI assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatbotRef = useRef<HTMLDivElement>(null); // Ref bsh n-géro l-Click Outside

  // Auto-scroll l-t7t mli kaytzad message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Logic dyal Click Outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (chatbotRef.current && !chatbotRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg })
      });
      const data = await res.json();
      
      setMessages(prev => [...prev, { role: 'bot', text: data.reply || "Sorry, I couldn't process that." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: "Connection error. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 left-6 z-40 w-14 h-14 bg-[#111111] text-white rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.15)] flex items-center justify-center hover:scale-105 transition-transform"
          >
            <RobotIcon className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window (Responsive + Click Outside) */}
<AnimatePresence>
  {isOpen && (
    <motion.div
      ref={chatbotRef}
      initial={{ opacity: 0, y: 20, scale: 0.95 }} 
      animate={{ opacity: 1, y: 0, scale: 1 }} 
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      // ⚠️ FIX HNA: Mab9ash inset-0 (full screen). Db floor box sghir rounded f mobile o desktop!
      className="fixed bottom-6 left-6 z-50 w-[calc(100%-3rem)] max-w-[350px] h-[480px] sm:h-[500px] bg-white border border-gray-100 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col"
    >
      {/* Header Pro */}
      <div className="bg-[#111111] p-4 flex justify-between items-center text-white shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-8 h-8 bg-gradient-to-tr from-gray-700 to-gray-500 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold">AI</span>
            </div>
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#111111] rounded-full"></div>
          </div>
          <div>
            <h4 className="font-semibold text-sm">Ask AI Assistant</h4>
            <p className="text-[10px] text-gray-400">Powered by Gemini</p>
          </div>
        </div>
        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors p-1 bg-gray-800/50 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50/50 flex flex-col gap-4">
        {messages.map((msg, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={i} 
            className={`max-w-[85%] p-3 text-sm leading-relaxed ${msg.role === 'user' ? 'bg-[#111111] text-white self-end rounded-2xl rounded-tr-sm shadow-sm' : 'bg-white border border-gray-100 text-gray-800 self-start rounded-2xl rounded-tl-sm shadow-sm'}`}
          >
            {msg.text}
          </motion.div>
        ))}
        {isLoading && (
          <div className="bg-white border border-gray-100 text-gray-400 self-start p-3 rounded-2xl rounded-tl-sm text-sm flex gap-1 items-center shadow-sm h-10">
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></span>
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area Pro */}
      <form onSubmit={sendMessage} className="p-3 bg-white border-t border-gray-100 shrink-0">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="w-full bg-gray-100/80 text-[#111111] placeholder-gray-500 rounded-full pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 transition-shadow"
          />
          <button 
            type="submit" 
            disabled={isLoading || !input.trim()} 
            className="absolute right-1.5 w-8 h-8 bg-[#111111] text-white rounded-full flex items-center justify-center hover:bg-gray-800 disabled:opacity-50 disabled:hover:bg-[#111111] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-0.5">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </form>
    </motion.div>
  )}
</AnimatePresence>
    </>
  );
}