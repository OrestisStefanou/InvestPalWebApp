import { useState, useEffect, useRef } from 'react';
import { MessageBubble } from './components/chat/MessageBubble';
import { InputArea } from './components/chat/InputArea';
import { Button } from './components/ui/Button';
import { Loader2, Plus, MessageSquare } from 'lucide-react';

const API_BASE_URL = 'http://localhost:8000';
const USER_ID = 'orestis_user_id';

function App() {
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Create new session on mount
  useEffect(() => {
    createSession();
  }, []);

  const createSession = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: USER_ID })
      });

      if (!response.ok) throw new Error('Failed to create session');

      const data = await response.json();
      setSessionId(data.session_id);
      setError(null);
    } catch (err) {
      setError('Failed to connect to backend. Is it running on port 8000?');
      console.error(err);
    }
  };

  const handleSendMessage = async (manualMessage = null) => {
    const messageToSend = manualMessage || inputMessage.trim();
    if (!messageToSend || !sessionId || isLoading) return;

    if (!manualMessage) {
      setInputMessage('');
    }

    const userEntry = {
      id: Date.now().toString(),
      role: 'user',
      // User message is treated as a text component for uniformity
      components: [{ type: 'text', content: messageToSend }]
    };

    setMessages(prev => [...prev, userEntry]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/chat/gen-ui`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId,
          message: messageToSend
        })
      });

      if (!response.ok) throw new Error('Failed to send message');

      const data = await response.json();

      // The backend returns { components: [...] } based on our investigation
      const assistantEntry = {
        id: Date.now().toString() + '_bot',
        role: 'assistant',
        components: data.components || [] // Fallback to empty if missing
      };

      setMessages(prev => [...prev, assistantEntry]);
    } catch (err) {
      setError('Failed to send message. Check your backend connection.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    createSession(); // Optional: create new session on clear
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-gray-900 tracking-tight">InvestPal</h1>
              <p className="text-[10px] text-gray-500 font-medium">AI Financial Assistant</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-500">
              <span className={`w-2 h-2 rounded-full ${sessionId ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
              {sessionId ? 'Connected' : 'Connecting...'}
            </div>
            <Button variant="outline" size="sm" onClick={clearChat} className="hidden sm:flex">
              <Plus className="w-4 h-4 mr-1" />
              New Chat
            </Button>
          </div>
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 w-full max-w-4xl mx-auto p-4 md:p-6 pb-0 flex flex-col">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4 flex items-center justify-between">
            <span>{error}</span>
            <button onClick={createSession} className="underline hover:no-underline font-medium">Retry</button>
          </div>
        )}

        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-6 opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-2 shadow-sm">
              <MessageSquare className="w-8 h-8 text-blue-600" />
            </div>
            <div className="space-y-2 max-w-md">
              <h2 className="text-2xl font-bold text-gray-900">Welcome to InvestPal</h2>
              <p className="text-gray-500">
                Your intelligent financial companion. Ask about market trends, analyze stocks, or track your portfolio.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg mt-8">
              {['Analyze AAPL stock', 'Show my portfolio summary', 'Latest market news', 'Compare TSLA and F'].map((q) => (
                <button
                  key={q}
                  onClick={() => handleSendMessage(q)}
                  className="bg-white p-3 rounded-xl border border-gray-200 text-sm text-gray-600 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all text-left shadow-sm"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6 pb-4">
            {messages.map((msg, index) => (
              <MessageBubble
                key={index}
                message={msg}
                isUser={msg.role === 'user'}
                onAction={handleSendMessage}
              />
            ))}

            {isLoading && (
              <div className="flex justify-start w-full max-w-3xl mx-auto">
                <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-3">
                  <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                  <span className="text-sm text-gray-500">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </main>

      {/* Footer / Input */}
      <footer className="sticky bottom-0 z-40">
        <InputArea
          value={inputMessage}
          onChange={setInputMessage}
          onSend={handleSendMessage}
          isLoading={isLoading}
          disabled={!sessionId}
        />
      </footer>
    </div>
  );
}

export default App;
