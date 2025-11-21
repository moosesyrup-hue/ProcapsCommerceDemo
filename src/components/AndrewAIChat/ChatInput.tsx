import React, { useState, useRef, KeyboardEvent } from 'react';
import { Send, Mic } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSendMessage, disabled = false }: ChatInputProps) {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const handleSubmit = () => {
    if (input.trim() && !disabled) {
      onSendMessage(input.trim());
      setInput('');
      
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };
  
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px';
    }
  };
  
  return (
    <div className="relative">
      {/* Input Container */}
      <div className="bg-white border-2 border-[#e8e4d8] rounded-2xl p-4 focus-within:border-[#009296] transition-colors">
        <div className="flex items-end gap-4">
          {/* Text Input */}
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything about supplements, health goals, or specific symptoms..."
            disabled={disabled}
            className="flex-1 resize-none outline-none text-[#003b3c] placeholder:text-[#999999] max-h-[200px] min-h-[24px]"
            rows={1}
          />
          
          {/* Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Voice Input (Future Feature) */}
            <button
              className="w-10 h-10 rounded-lg hover:bg-[#f5f1e8] flex items-center justify-center text-[#666666] hover:text-[#009296] transition-all"
              title="Voice input (coming soon)"
            >
              <Mic className="w-5 h-5" />
            </button>
            
            {/* Send Button */}
            <button
              onClick={handleSubmit}
              disabled={!input.trim() || disabled}
              className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#009296] to-[#007a7d] text-white flex items-center justify-center hover:shadow-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Helper Text */}
      <div className="mt-3 px-4 flex items-center justify-between text-xs text-[#999999]">
        <div>
          Press <kbd className="px-2 py-0.5 bg-[#f5f1e8] rounded border border-[#e8e4d8] text-[#666666]">Enter</kbd> to send, <kbd className="px-2 py-0.5 bg-[#f5f1e8] rounded border border-[#e8e4d8] text-[#666666]">Shift + Enter</kbd> for new line
        </div>
        <div>
          Powered by AI • Not medical advice
        </div>
      </div>
    </div>
  );
}
