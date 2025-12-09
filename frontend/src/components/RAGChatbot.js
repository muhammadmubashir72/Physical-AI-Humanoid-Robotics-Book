import React, { useState, useRef, useEffect } from 'react';
import { useDocusaurusContext } from '@docusaurus/core';
import BrowserOnly from '@docusaurus/BrowserOnly';

// This is a simplified example of how the chatbot could be integrated
// In a real implementation, you would use ChatKit or a similar library

const RAGChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [sessionId, setSessionId] = useState(null);
  const messagesEndRef = useRef(null);

  // Initialize session
  useEffect(() => {
    // Generate a simple session ID
    const newSessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    setSessionId(newSessionId);

    // Add welcome message
    setMessages([
      {
        id: 'welcome',
        text: 'Hello! I\'m your AI assistant for the Physical AI & Humanoid Robotics textbook. You can ask me questions about the content, or select text on the page and ask questions about it.',
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
  }, []);

  // Scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Function to get selected text
  const getSelectedText = () => {
    const selection = window.getSelection();
    const text = selection.toString().trim();

    if (text) {
      setSelectedText(text);
      return text;
    }
    return null;
  };

  // Handle text selection
  const handleTextSelection = () => {
    const selectedText = getSelectedText();
    if (selectedText) {
      // Add a message indicating text was selected
      const newMessage = {
        id: Date.now() + '_selection',
        text: `You selected: "${selectedText.substring(0, 50)}${selectedText.length > 50 ? '...' : ''}"`,
        sender: 'system',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newMessage]);
    }
  };

  // Capture text selection when user releases mouse
  useEffect(() => {
    const handleMouseUp = () => {
      setTimeout(() => { // Use timeout to ensure selection is complete
        getSelectedText();
      }, 0);
    };

    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Prepare request payload
      const requestBody = {
        query: inputValue,
        top_k: 5,
        use_user_selection: selectedText.length > 0,
        user_selection_id: sessionId,
        filters: {}
      };

      // Add selected text if available
      if (selectedText) {
        // First, send the selected text to be processed
        await fetch('http://localhost:8000/api/v1/selections/process', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content: selectedText,
            session_id: sessionId,
            context_info: {
              page: window.location.pathname,
              title: document.title
            }
          })
        });

        // Clear the selected text after processing
        setSelectedText('');
      }

      // Send query to backend
      const response = await fetch('http://localhost:8000/api/v1/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();

      // Add bot response
      const botMessage = {
        id: Date.now() + 1,
        text: data.answer,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);

      const errorMessage = {
        id: Date.now() + 1,
        text: 'Sorry, I encountered an error processing your request. Please try again.',
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

  return (
    <div className="rag-chatbot-container" style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      width: '400px',
      height: '500px',
      backgroundColor: 'white',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: '#25c2a0',
        color: 'white',
        padding: '10px 15px',
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px',
        fontWeight: 'bold'
      }}>
        Physical AI & Robotics Assistant
      </div>

      <div style={{
        flex: 1,
        padding: '15px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {messages.map((message) => (
          <div
            key={message.id}
            style={{
              marginBottom: '10px',
              textAlign: message.sender === 'user' ? 'right' : 'left',
              maxWidth: '80%'
            }}
          >
            <div
              style={{
                display: 'inline-block',
                padding: '8px 12px',
                borderRadius: '18px',
                backgroundColor: message.sender === 'user'
                  ? '#e3f2fd'
                  : message.sender === 'system'
                  ? '#fff3e0'
                  : '#f5f5f5',
                color: '#333'
              }}
            >
              {message.text}
            </div>
            <div style={{
              fontSize: '0.7em',
              color: '#999',
              marginTop: '4px'
            }}>
              {message.timestamp ? message.timestamp.toLocaleTimeString() : ''}
            </div>
          </div>
        ))}
        {isLoading && (
          <div style={{ textAlign: 'left', marginBottom: '10px' }}>
            <div style={{
              display: 'inline-block',
              padding: '8px 12px',
              borderRadius: '18px',
              backgroundColor: '#f5f5f5',
              color: '#333'
            }}>
              Thinking...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div style={{
        padding: '10px',
        borderTop: '1px solid #eee',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ marginBottom: '8px', fontSize: '0.9em', color: '#666' }}>
          {selectedText ? `Selected: "${selectedText.substring(0, 30)}..."` : 'Select text on the page to ask questions about it'}
        </div>
        <div style={{ display: 'flex' }}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about the textbook content..."
            style={{
              flex: 1,
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: '18px',
              outline: 'none'
            }}
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !inputValue.trim()}
            style={{
              marginLeft: '8px',
              padding: '8px 16px',
              backgroundColor: '#25c2a0',
              color: 'white',
              border: 'none',
              borderRadius: '18px',
              cursor: (isLoading || !inputValue.trim()) ? 'not-allowed' : 'pointer',
              opacity: (isLoading || !inputValue.trim()) ? 0.6 : 1
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

// Wrapper to ensure this only runs in browser environment
const RAGChatbotWrapper = () => {
  return (
    <BrowserOnly>
      {() => <RAGChatbot />}
    </BrowserOnly>
  );
};

export default RAGChatbotWrapper;