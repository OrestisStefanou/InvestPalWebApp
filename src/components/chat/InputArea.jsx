import { useRef, useEffect } from "react";
import { Send, Sparkles } from "lucide-react";
import { Button } from "../ui/Button";

export function InputArea({ value, onChange, onSend, isLoading, disabled }) {
    const textareaRef = useRef(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
        }
    }, [value]);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSend();
        }
    };

    return (
        <div className="bg-white border-t border-gray-200 p-4 pb-8">
            <div className="max-w-3xl mx-auto relative">
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-blue-50 text-blue-700 text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-blue-100 shadow-sm opacity-90 backdrop-blur">
                    <Sparkles className="w-3 h-3" />
                    Ask about stocks, portfolios, or market news
                </div>

                <div className="relative flex items-end gap-2 bg-gray-50 border border-gray-200 rounded-xl p-2 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all shadow-sm hover:border-gray-300">
                    <textarea
                        ref={textareaRef}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={disabled}
                        placeholder="How is AAPL performing today?"
                        className="flex-1 max-h-[120px] bg-transparent border-0 focus:ring-0 resize-none py-3 px-3 placeholder:text-gray-400 text-gray-900 text-sm"
                        rows={1}
                    />
                    <Button
                        onClick={onSend}
                        disabled={!value.trim() || isLoading || disabled}
                        size="icon"
                        className="mb-1 mr-1" // Align bottom right
                    >
                        <Send className="w-4 h-4" />
                    </Button>
                </div>
                <p className="text-center text-[10px] text-gray-400 mt-3">
                    AI can make mistakes. Please verify important financial information.
                </p>
            </div>
        </div>
    );
}
