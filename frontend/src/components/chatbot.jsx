import React, { useState, useRef, useEffect } from "react";
// Using a placeholder image directly, assuming chatbot.png is in public/
import chatbotIcon from "/chatbot.png";
import axios from "axios"; // Ensure axios is installed: npm install axios

const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]); // Stores chat history
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // For loading indicator
  const chatContentRef = useRef(null); // Ref for scrolling to bottom

  // Get API URL from environment variable
  const POLICY_BOT_API_URL = import.meta.env.VITE_POLICY_BOT_API_URL;

  // Scroll to the bottom of the chat when messages update
  useEffect(() => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  }, [messages]);

  // Initial welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          text: "Hello! I’m your HR PolicyBot. Ask me about leave, bonuses, or company rules.",
          sender: "bot",
        },
      ]);
    }
  }, [isOpen]); // Only run when chatbot opens

  const sendMessage = async () => {
    if (inputMessage.trim() === "") return;

    const userMessage = { text: inputMessage, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await axios.post(`${POLICY_BOT_API_URL}/chat`, {
        question: inputMessage,
      });
      const botMessage = { text: response.data.answer, sender: "bot" };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error sending message to chatbot:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: "Sorry, I couldn't get a response from the Policy Bot. Please try again.",
          sender: "bot",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !isLoading) {
      sendMessage();
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg z-50 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all duration-200"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open Policy Bot"
      >
        <img src={chatbotIcon} alt="chatbot icon" className="h-10 w-10" />
      </button>

      {/* Chatbot Panel */}
      <div
        className={`fixed bottom-20 right-6 w-80 h-96 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-xl z-50 flex flex-col overflow-hidden transition-transform duration-300 transform ${
          isOpen
            ? "translate-y-0 opacity-100"
            : "translate-y-5 opacity-0 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="bg-blue-800 text-white p-3 font-semibold flex justify-between items-center rounded-t-lg">
          <span>PolicyBot</span>
          <button
            onClick={() => setIsOpen(false)}
            className="text-sm focus:outline-none focus:ring-2 focus:ring-white rounded-full p-1"
            aria-label="Close Chatbot"
          >
            ✖
          </button>
        </div>

        {/* Chat content */}
        <div
          ref={chatContentRef}
          className="flex-1 p-4 overflow-y-auto text-sm text-gray-800 dark:text-gray-100 space-y-3"
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white rounded-bl-lg rounded-tl-lg rounded-tr-lg" // User message bubble style
                    : "bg-gray-200 dark:bg-gray-700 dark:text-white rounded-br-lg rounded-tr-lg rounded-tl-lg" // Bot message bubble style
                } p-3 max-w-[85%] shadow-md break-words`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-200 dark:bg-gray-700 dark:text-white p-3 rounded-br-lg rounded-tr-lg rounded-tl-lg max-w-[85%] animate-pulse">
                Typing...
              </div>
            </div>
          )}
        </div>

        {/* Input field */}
        <div className="p-2 border-t dark:border-gray-700 flex bg-white dark:bg-gray-900">
          <input
            type="text"
            placeholder="Ask me anything..."
            className="flex-1 p-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white transition-colors duration-200"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            aria-label="Chat input"
          />
          <button
            onClick={sendMessage}
            className="ml-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-colors duration-200"
            disabled={isLoading || inputMessage.trim() === ""}
            aria-label="Send message"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 rotate-90"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatbotButton;
