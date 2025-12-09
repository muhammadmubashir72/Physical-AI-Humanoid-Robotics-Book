import React, { useState, useRef, useEffect } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

const ChatInterface = ({ backendUrl = 'http://localhost:8000' }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your AI assistant for the Physical AI & Humanoid Robotics textbook. Ask me anything about the content!", sender: 'bot', timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setError(null);

    try {
      // Send query to backend
      const response = await fetch(`${backendUrl}/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: userMessage.text,
          top_k: 5
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const botMessage = {
        id: Date.now() + 1,
        text: data.answer,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      setError(error.message);

      const errorMessage = {
        id: Date.now() + 1,
        text: 'Sorry, I encountered an error processing your request. Please check that the backend is running and try again.',
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const clearChat = () => {
    setMessages([
      { id: 1, text: "Hello! I'm your AI assistant for the Physical AI & Humanoid Robotics textbook. Ask me anything about the content!", sender: 'bot', timestamp: new Date() }
    ]);
  };

  return (
    <BrowserOnly>
      {() => (
        <>
          {/* Chat Toggle Button */}
          {!isChatOpen && (
            <button
              onClick={toggleChat}
              style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                backgroundColor: '#25c2a0',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '60px',
                height: '60px',
                fontSize: '24px',
                cursor: 'pointer',
                zIndex: 1000,
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
              }}
            >
              💬
            </button>
          )}

          {/* Chat Interface */}
          {isChatOpen && (
            <div style={{
              position: 'fixed',
              bottom: '20px',
              right: '20px',
              width: '400px',
              height: '500px',
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 1000,
              fontFamily: 'system-ui, -apple-system, sans-serif',
              border: '1px solid #e0e0e0',
              overflow: 'hidden'
            }}>
              {/* Chat Header */}
              <div style={{
                backgroundColor: '#25c2a0',
                color: 'white',
                padding: '15px',
                fontWeight: '600',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '1.2em' }}>🤖</span>
                  <span>Physical AI Assistant</span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={clearChat}
                    style={{
                      background: 'rgba(255,255,255,0.2)',
                      border: 'none',
                      color: 'white',
                      borderRadius: '4px',
                      padding: '4px 8px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                    title="Clear chat"
                  >
                    C
                  </button>
                  <button
                    onClick={toggleChat}
                    style={{
                      background: 'rgba(255,255,255,0.2)',
                      border: 'none',
                      color: 'white',
                      borderRadius: '4px',
                      width: '28px',
                      height: '28px',
                      cursor: 'pointer',
                      fontSize: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    title="Close chat"
                  >
                    ×
                  </button>
                </div>
              </div>

              {/* Messages Container */}
              <div style={{
                flex: 1,
                padding: '15px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                backgroundColor: '#fafafa'
              }}>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    style={{
                      display: 'flex',
                      justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                      animation: 'fadeIn 0.3s ease'
                    }}
                  >
                    <div
                      style={{
                        maxWidth: '85%',
                        padding: '12px 16px',
                        borderRadius: message.sender === 'user'
                          ? '18px 18px 4px 18px'
                          : '18px 18px 18px 4px',
                        backgroundColor: message.sender === 'user' ? '#e3f2fd' : '#ffffff',
                        color: '#333',
                        wordWrap: 'break-word',
                        fontSize: '14px',
                        lineHeight: '1.5',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                        border: message.sender === 'user' ? '1px solid #bbdefb' : '1px solid #e0e0e0'
                      }}
                    >
                      {message.text}
                      <div style={{
                        fontSize: '0.75em',
                        color: '#999',
                        marginTop: '4px',
                        textAlign: 'right'
                      }}>
                        {message.timestamp ? message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <div style={{
                      maxWidth: '85%',
                      padding: '12px 16px',
                      borderRadius: '18px 18px 18px 4px',
                      backgroundColor: '#ffffff',
                      color: '#333',
                      fontSize: '14px',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                      border: '1px solid #e0e0e0'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <div style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: '#25c2a0',
                          animation: 'bounce 1.5s infinite'
                        }}></div>
                        <div style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: '#25c2a0',
                          animation: 'bounce 1.5s infinite',
                          animationDelay: '0.2s'
                        }}></div>
                        <div style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: '#25c2a0',
                          animation: 'bounce 1.5s infinite',
                          animationDelay: '0.4s'
                        }}></div>
                        <span style={{ marginLeft: '8px' }}>Thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
                {error && (
                  <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <div style={{
                      maxWidth: '85%',
                      padding: '12px 16px',
                      borderRadius: '18px 18px 18px 4px',
                      backgroundColor: '#ffebee',
                      color: '#c62828',
                      fontSize: '14px',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                      border: '1px solid #ffcdd2'
                    }}>
                      Error: {error}
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div style={{
                padding: '12px',
                borderTop: '1px solid #e0e0e0',
                backgroundColor: 'white'
              }}>
                <div style={{
                  display: 'flex',
                  gap: '8px',
                  alignItems: 'flex-end'
                }}>
                  <textarea
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about the textbook content..."
                    style={{
                      flex: 1,
                      padding: '12px 14px',
                      border: '1px solid #ddd',
                      borderRadius: '20px',
                      outline: 'none',
                      resize: 'none',
                      maxHeight: '100px',
                      fontSize: '14px',
                      lineHeight: '1.4'
                    }}
                    rows={1}
                    disabled={isLoading}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={isLoading || !inputValue.trim()}
                    style={{
                      minWidth: '60px',
                      padding: '12px 16px',
                      backgroundColor: isLoading || !inputValue.trim() ? '#bbdefb' : '#25c2a0',
                      color: 'white',
                      border: 'none',
                      borderRadius: '20px',
                      cursor: (isLoading || !inputValue.trim()) ? 'not-allowed' : 'pointer',
                      fontSize: '14px',
                      fontWeight: '500',
                      transition: 'background-color 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (!(isLoading || !inputValue.trim())) {
                        e.target.style.backgroundColor = '#21a88f';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!(isLoading || !inputValue.trim())) {
                        e.target.style.backgroundColor = '#25c2a0';
                      }
                    }}
                  >
                    {isLoading ? '...' : 'Send'}
                  </button>
                </div>
                <div style={{
                  fontSize: '0.7em',
                  color: '#999',
                  textAlign: 'center',
                  marginTop: '6px'
                }}>
                  Powered by RAG & Gemini
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </BrowserOnly>
  );
};

export default ChatInterface;