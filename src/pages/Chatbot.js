import React, { useState } from 'react';

const Chatbot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hello! I am your Transfer Scout. Ask me about any player or team.' }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!input) return;
    setLoading(true);
    setMessages(prev => [...prev, { role: 'user', text: input }]);

    try {
      const response = await fetch('https://api.tavily.com/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api_key: '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',
          query: `latest football transfer news about ${input}`,
          search_depth: "basic",
          include_answer: true
        })
      });

      const data = await response.json();
      const botReply = data.answer || data.results[0]?.content || "I couldn't find any recent rumors on that. Try another player!";
      
      setMessages(prev => [...prev, { role: 'bot', text: botReply }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: "Error connecting to the scouting network." }]);
    }
    
    setInput('');
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center p-6">
      <div className="w-full max-w-2xl bg-zinc-900 rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col h-[80vh]">
        {/* Header */}
        <div className="bg-blue-600 p-4 font-bold text-center uppercase tracking-tighter">
          ⚽ Transfer Bot (Live Search)
        </div>

        {/* Chat Window */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-xl ${m.role === 'user' ? 'bg-blue-500' : 'bg-zinc-800 border border-white/5'}`}>
                {m.text}
              </div>
            </div>
          ))}
          {loading && <div className="text-gray-500 animate-pulse">Scouting the latest news...</div>}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-white/10 flex gap-2">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search player (e.g. Mbappe transfer)..."
            className="flex-1 bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
          />
          <button 
            onClick={handleSearch}
            className="bg-blue-600 px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition"
          >
            Ask
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;