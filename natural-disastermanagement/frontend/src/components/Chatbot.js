import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm ResQBot. How can I assist you today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setLoading(true);

    // Simulated local response logic
    setTimeout(() => {
      const msg = userMessage.toLowerCase();
      let response = "";

      if (msg.includes("report") || msg.includes("incident")) {
        response = "To report a disaster, click on 'Report Disaster' in the navigation bar. You'll need to provide details, location, and optional media.";
      } else if (msg.includes("contribute") || msg.includes("donate") || msg.includes("help")) {
        response = "You can contribute resources or funds by visiting the 'Contribute' page. Select an active disaster to see current requirements.";
      } else if (msg.includes("rescue") || msg.includes("team") || msg.includes("ngo")) {
        response = "If you are part of a rescue team or NGO, you can register your team via the 'Rescue Team Registration' link on our landing page.";
      } else if (msg.includes("contact") || msg.includes("call") || msg.includes("emergency")) {
        response = "For immediate life-threatening emergencies, call 911. You can also find key contact numbers in the 'Emergency Contacts' section of your dashboard.";
      } else if (msg.includes("hello") || msg.includes("hi")) {
        response = "Hello! I am ResQBot, your automated assistant. How can I help you today?";
      } else {
        response = "I'm not sure I understand that. Try asking about 'reporting a disaster', 'making a contribution', or 'emergency contacts'.";
      }

      setMessages(prev => [...prev, { text: response, sender: 'bot' }]);
      setLoading(false);
    }, 800);
  };

  const quickActions = [
    "How to report?",
    "How to contribute?",
    "Emergency contacts",
    "Rescue registration"
  ];

  const handleQuickAction = (action) => {
    setInput(action);
  };

  return (
    <div className={`chatbot-wrapper ${isOpen ? 'open' : ''}`}>
      {!isOpen && (
        <button className="chatbot-toggle" onClick={toggleChat}>
          <span className="toggle-icon">💬</span>
          <span className="toggle-badge">Help</span>
        </button>
      )}

      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <div className="bot-info">
              <span className="bot-status"></span>
              <h3>ResQBot</h3>
            </div>
            <button className="close-btn" onClick={toggleChat}>&times;</button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                <div className="message-bubble">
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="message bot">
                <div className="message-bubble loading-dots">
                  <span>.</span><span>.</span><span>.</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-quick-actions">
            {quickActions.map((action, index) => (
              <button key={index} onClick={() => handleQuickAction(action)}>
                {action}
              </button>
            ))}
          </div>

          <form className="chatbot-input" onSubmit={handleSend}>
            <input
              type="text"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" disabled={!input.trim()}>
              <span className="send-icon">🚀</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
