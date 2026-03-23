import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { getGeminiResponse } from '../../lib/gemini';

interface ChatMessage {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, text: "Hi there! I'm Mehdi's portfolio assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen, isTyping]);

  const handleSend = async () => {
    if (!inputValue.trim() || isTyping) return;

    const userText = inputValue.trim();
    const newUserMessage: ChatMessage = { id: Date.now(), text: userText, sender: 'user' };
    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    setIsTyping(true);

    // Convert history for Gemini
    const history = messages.slice(1).map(msg => ({
      role: (msg.sender === 'user' ? 'user' : 'model') as "user" | "model",
      parts: [{ text: msg.text }]
    }));

    try {
      const botResponseText = await getGeminiResponse(userText, history);
      const botResponse: ChatMessage = { 
        id: Date.now() + 1, 
        text: botResponseText, 
        sender: 'bot' 
      };
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 left-8 z-[60] w-14 h-14 bg-white text-black rounded-full flex items-center justify-center border border-zinc-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:scale-110 transition-transform"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <X size={20} /> : <MessageSquare size={20} />}
      </motion.button>

      {/* Chat interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, x: -20 }}
            animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
            exit={{ opacity: 0, y: 20, scale: 0.95, x: -20 }}
            className="fixed bottom-28 left-8 z-[60] w-[360px] h-[520px] bg-white border border-zinc-200 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col font-sans"
          >
            {/* Header */}
            <div className="p-5 bg-white border-b border-zinc-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-zinc-900 flex items-center justify-center text-white">
                  <Bot size={18} />
                </div>
                <div>
                  <h3 className="text-[13px] font-bold text-zinc-900 tracking-tight">Project Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                    <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider">Active Now</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-zinc-50 text-zinc-400 hover:text-zinc-900 transition-all"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-5 scrollbar-hide bg-[#fafafa]"
            >
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl text-[12px] leading-[1.6] ${
                    msg.sender === 'user' 
                      ? 'bg-zinc-900 text-white shadow-md' 
                      : 'bg-white border border-zinc-200/60 text-zinc-800 shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-zinc-200/60 p-4 rounded-2xl text-xs flex items-center gap-1.5 shadow-sm">
                    <span className="w-1 h-1 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1 h-1 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1 h-1 bg-zinc-400 rounded-full animate-bounce"></span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-zinc-100">
              <div className="relative flex items-center gap-2">
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask something..."
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl py-3.5 pl-5 pr-12 text-[12px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900 focus:bg-white transition-all"
                />
                <button 
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isTyping}
                  className="absolute right-2.5 p-2 bg-zinc-900 text-white rounded-xl hover:scale-105 active:scale-95 disabled:opacity-30 disabled:hover:scale-100 transition-all shadow-md"
                >
                  <Send size={14} />
                </button>
              </div>
              <p className="text-[9px] text-center text-zinc-400 mt-3 font-medium tracking-wide">
                Powered by Gemini AI • Secure Connection
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
