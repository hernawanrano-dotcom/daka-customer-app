// apps/customer-app/src/components/customer/ChatPage.jsx
import React, { useState, useRef, useEffect } from 'react';

export default function ChatPage({ chats, onSendMessage, customerName }) {
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);
  const [localChats, setLocalChats] = useState(chats);

  useEffect(() => {
    setLocalChats(chats);
  }, [chats]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [localChats]);

  const handleSend = async () => {
    if (!message.trim()) return;
    await onSendMessage(message);
    setMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div>
      <h2 className="page-title">Live Chat</h2>
      <div style={{ background: '#f8fafc', borderRadius: '16px', padding: '16px', height: '400px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, overflowY: 'auto', marginBottom: '16px' }}>
          {localChats.map((chat, idx) => (
            <div
              key={idx}
              style={{
                textAlign: chat.sender === 'customer' ? 'right' : 'left',
                marginBottom: '12px',
              }}
            >
              <div
                style={{
                  display: 'inline-block',
                  background: chat.sender === 'customer' ? '#667eea' : '#f1f5f9',
                  color: chat.sender === 'customer' ? 'white' : '#1e293b',
                  padding: '10px 14px',
                  borderRadius: '18px',
                  maxWidth: '80%',
                }}
              >
                {chat.message}
              </div>
              <div style={{ fontSize: '0.65rem', color: '#94a3b8', marginTop: '4px' }}>
                {new Date(chat.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ketik pesan..."
            style={{ flex: 1, padding: '12px', borderRadius: '24px', border: '1px solid #e2e8f0' }}
          />
          <button className="btn-primary" onClick={handleSend}>Kirim</button>
        </div>
      </div>
    </div>
  );
}