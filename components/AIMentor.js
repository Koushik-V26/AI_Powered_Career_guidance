'use client'
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Lightbulb, BookOpen, Target, Loader, AlertCircle, RefreshCw, X } from 'lucide-react';

const AIMentor = ({ userId, currentProgress, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('online');
  const [retryCount, setRetryCount] = useState(0);
  const [suggestions] = useState([
    "How can I improve my learning speed?",
    "What skills should I focus on next?",
    "Can you review my progress?",
    "I'm feeling stuck, what should I do?",
    "How do I transition to a new career?",
    "What are the trending skills in tech?",
    "How to stay motivated in learning?",
    "Best practices for skill development?"
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage = currentProgress?.mindsetType 
        ? `Hi! I'm your AI career mentor. I can see you have a ${currentProgress.mindsetType} mindset, which is perfect for your ${currentProgress.domain} journey. I'm here to help guide your learning, answer questions, and provide personalized career advice. How can I assist you today?`
        : "Hi! I'm your AI career mentor. I'm here to help guide your learning journey, answer questions, and provide personalized career advice. How can I assist you today?";

      setMessages([{
        id: Date.now(),
        role: 'assistant',
        content: welcomeMessage,
        timestamp: new Date(),
        type: 'greeting'
      }]);
    }
  }, [currentProgress]);

  const sendMessage = async (messageText = null) => {
    const messageToSend = messageText || inputMessage;
    
    if (!messageToSend.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: messageToSend,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    if (!messageText) setInputMessage('');
    setIsLoading(true);
    setConnectionStatus('connecting');

    try {
      const res = await fetch('/api/aiMentor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userInput: messageToSend, 
          currentProgress: {
            ...currentProgress,
            context: 'career_mentoring',
            userQuery: messageToSend
          },
          userId
        })
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();

      const aiMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: data.aiMessage,
        timestamp: new Date(),
        type: data.source === 'fallback' ? 'fallback' : 'advice',
        metadata: {
          source: data.source,
          note: data.note
        }
      };

      setMessages(prev => [...prev, aiMessage]);
      setConnectionStatus('online');
      setRetryCount(0);
      
    } catch (err) {
      console.error('AI Mentor Error:', err);
      
      const errorMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: `I'm having trouble connecting to my AI systems right now, but I'm still here to help! 

This might be due to high demand. You can:
- Try asking your question again in a moment
- Check out my suggested questions below
- I'll do my best to provide helpful guidance based on common career scenarios

Your question was: "${messageToSend}"

What specific aspect of your career would you like guidance on?`,
        timestamp: new Date(),
        type: 'error',
        metadata: { canRetry: true }
      };
      
      setMessages(prev => [...prev, errorMessage]);
      setConnectionStatus('error');
      setRetryCount(prev => prev + 1);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputMessage(suggestion);
  };

  const handleQuickSend = (suggestion) => {
    sendMessage(suggestion);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleRetry = () => {
    if (messages.length > 0) {
      const lastUserMessage = [...messages].reverse().find(msg => msg.role === 'user');
      if (lastUserMessage) {
        sendMessage(lastUserMessage.content);
      }
    }
  };

  const getMessageIcon = (role, type) => {
    if (role === 'user') return <User className="h-5 w-5" />;

    switch (type) {
      case 'suggestion': return <Lightbulb className="h-5 w-5 text-yellow-500" />;
      case 'resource': return <BookOpen className="h-5 w-5 text-blue-500" />;
      case 'encouragement': return <Target className="h-5 w-5 text-green-500" />;
      case 'fallback': return <Bot className="h-5 w-5 text-orange-500" />;
      case 'error': return <AlertCircle className="h-5 w-5 text-red-500" />;
      default: return <Bot className="h-5 w-5 text-blue-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'connecting': return 'bg-yellow-500 animate-pulse';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'online': return 'Online';
      case 'connecting': return 'Connecting...';
      case 'error': return 'Connection Issues';
      default: return 'Unknown';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl flex flex-col h-[600px] relative">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bot className="h-6 w-6 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">AI Career Mentor</h2>
            {currentProgress?.mindsetType && (
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                {currentProgress.mindsetType}
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {connectionStatus === 'error' && retryCount > 0 && (
              <button
                onClick={handleRetry}
                className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 px-2 py-1 rounded-full transition-colors flex items-center space-x-1"
              >
                <RefreshCw className="h-3 w-3" />
                <span>Retry</span>
              </button>
            )}
            <div className={`w-2 h-2 rounded-full ${getStatusColor(connectionStatus)}`}></div>
            <span className="text-xs text-gray-500">{getStatusText(connectionStatus)}</span>
            {onClose && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-xs lg:max-w-md ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`flex-shrink-0 ${message.role === 'user' ? 'ml-2' : 'mr-2'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.role === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : message.type === 'fallback' 
                      ? 'bg-orange-100 text-orange-600'
                      : message.type === 'error'
                        ? 'bg-red-100 text-red-600'
                        : 'bg-gray-200 text-gray-600'
                }`}>
                  {getMessageIcon(message.role, message.type)}
                </div>
              </div>

              <div className={`px-4 py-2 rounded-lg ${
                message.role === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : message.type === 'fallback'
                    ? 'bg-orange-50 text-gray-900 border border-orange-200'
                    : message.type === 'error'
                      ? 'bg-red-50 text-gray-900 border border-red-200'
                      : 'bg-gray-100 text-gray-900'
              }`}>
                <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                {message.metadata?.note && (
                  <div className="text-xs mt-2 opacity-70 italic">
                    {message.metadata.note}
                  </div>
                )}
                <p className="text-xs mt-1 opacity-70">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="flex mr-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">
                <Bot className="h-5 w-5" />
              </div>
            </div>
            <div className="bg-gray-100 px-4 py-2 rounded-lg">
              <div className="flex items-center space-x-2">
                <Loader className="h-4 w-4 animate-spin" />
                <span className="text-sm text-gray-600">Thinking...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Performance Context Display */}
      {currentProgress?.performanceData && (
        <div className="px-4 py-2 bg-blue-50 border-t border-blue-200 flex-shrink-0">
          <p className="text-xs text-blue-700">
            Context: {currentProgress.currentPhase ? `Phase ${currentProgress.currentPhase} • ` : ''}
            {currentProgress.performanceData.currentStreak} day streak • 
            {currentProgress.performanceData.skillsAcquired} skills acquired
          </p>
        </div>
      )}

      {/* Suggestions */}
      {(messages.length === 1 || connectionStatus === 'error') && (
        <div className="px-4 py-2 border-t border-gray-100 flex-shrink-0">
          <p className="text-xs text-gray-500 mb-2">
            {connectionStatus === 'error' ? 'Try these common questions:' : 'Quick questions:'}
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestions.slice(0, connectionStatus === 'error' ? 6 : 4).map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleQuickSend(suggestion)}
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-full transition-colors"
                disabled={isLoading}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-gray-200 flex-shrink-0">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={
              connectionStatus === 'error' 
                ? "I'm having connection issues but still here to help..."
                : "Ask me anything about your career journey..."
            }
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            onClick={() => sendMessage()}
            disabled={!inputMessage.trim() || isLoading}
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIMentor;