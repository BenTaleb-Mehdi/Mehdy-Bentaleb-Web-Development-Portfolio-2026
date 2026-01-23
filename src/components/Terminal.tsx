"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import portfolioData from "../../data/portfolio.json";
import { Terminal as TerminalIcon, X, Maximize2, Command, Search, ArrowRight } from "lucide-react";

interface TerminalProps {
  triggerCommand?: string | null;
  onCommandComplete?: () => void;
}

export default function Terminal({ triggerCommand, onCommandComplete }: TerminalProps) {
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [output, setOutput] = useState<string[]>([]);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-trigger logic
  useEffect(() => {
    if (triggerCommand) {
      setIsOpen(true);
      // Wait for animation to open before typing
      setTimeout(() => {
          let i = 0;
          const typeInterval = setInterval(() => {
            if (i < triggerCommand.length) {
              setInput((prev) => prev + triggerCommand.charAt(i));
              i++;
            } else {
              clearInterval(typeInterval);
              setTimeout(() => {
                 handleCommandExecution(triggerCommand);
                 if (onCommandComplete) onCommandComplete();
              }, 400);
            }
          }, 50);
      }, 300);
    }
  }, [triggerCommand]);

  const handleCommandExecution = (cmd: string) => {
    if (!cmd.trim()) return;
    
    let response = "";
    const lowerCmd = cmd.trim();
    const parts = lowerCmd.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (command) {
        case "help":
          response = "Try: about, skills, contact, clear, exec --view-projects";
          break;
        case "clear":
          setOutput([]);
          setInput("");
          return;
        case "exec":
           if (args[0] === "--view-projects") response = "Navigating to projects...";
           else response = `exec: unknown option ${args[0]}`;
           break;
        case "ls":
           response = "bio.txt skills.txt projects/";
           break;
        default:
          if (command in portfolioData.terminal.commands) {
             // @ts-ignore
             response = portfolioData.terminal.commands[command];
          } else {
             response = `cmd not found: ${command}`;
          }
    }

    setOutput(prev => [...prev, `> ${cmd}`, response]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
     if (e.key === "Enter") {
        handleCommandExecution(input);
     }
  };

  useEffect(() => {
     if (scrollRef.current) {
         scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
     }
  }, [output]);

  return (
    <>
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-full max-w-2xl px-4">
          <AnimatePresence mode="wait">
            {!isOpen ? (
                <motion.button
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    onClick={() => setIsOpen(true)}
                    className="flex items-center gap-3 px-6 py-3 bg-[#0a192f]/80 backdrop-blur-md border border-accent/30 rounded-full shadow-[0_0_20px_rgba(100,255,218,0.15)] hover:bg-[#0a192f] hover:border-accent/50 transition-all group mx-auto"
                >
                    <Command className="text-accent w-5 h-5 group-hover:rotate-12 transition-transform" />
                    <span className="text-slate-400 text-sm font-mono">Type a command...</span>
                    <span className="ml-2 text-xs text-slate-600 border border-slate-700 rounded px-1.5 py-0.5">⌘K</span>
                </motion.button>
            ) : (
                <motion.div
                    initial={{ y: 20, opacity: 0, scale: 0.95 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 20, opacity: 0, scale: 0.95 }}
                    className="w-full bg-[#0a192f]/95 backdrop-blur-xl border border-accent/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                >
                    {/* Input Area (Command Pill Style) */}
                    <div className="flex items-center gap-3 px-4 py-4 border-b border-white/5">
                         <TerminalIcon className="text-accent w-5 h-5 shrink-0" />
                         <input
                            ref={inputRef}
                            className="bg-transparent border-none outline-none text-slate-100 flex-grow font-mono text-sm placeholder:text-slate-600"
                            placeholder="Enter command (e.g. 'help', 'about')..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            autoFocus
                         />
                         <button 
                            onClick={() => setIsOpen(false)}
                            className="text-slate-500 hover:text-slate-300 transition-colors"
                         >
                             <X size={18} />
                         </button>
                    </div>

                    {/* Output Area (Collapsible) */}
                    {output.length > 0 && (
                        <div 
                            ref={scrollRef}
                            className="max-h-64 overflow-y-auto p-4 font-mono text-sm space-y-2 custom-scrollbar bg-[#020c1b]/30"
                        >
                            {output.map((line, i) => (
                                <div key={i} className={`break-words ${line.startsWith(">") ? "text-accent/80 mt-2" : "text-slate-300 pl-4 border-l border-slate-700"}`}>
                                    {line}
                                </div>
                            ))}
                        </div>
                    )}
                </motion.div>
            )}
          </AnimatePresence>
      </div>
    </>
  );
}
