import { useState } from 'react'
import ChatInput from './components/ChatInput'
import ChatMessage from './components/ChatMessage'
import ChatMessages from './components/ChatMessages'
import './App.css'

function App() {
  // messages array
  const [chatMessages, setChatMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <div className="app-container">
      {chatMessages.length
        ? <ChatMessages chatMessages={chatMessages} />
        : <p>Welcome to the chabot project! Send a message using the textbox below!</p>
      }
      {loading &&
        <ChatMessage
          sender="robot"
          message="Thinking..."
        />
      }
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
        loading={loading}
        setLoading={setLoading}
      />
    </div>
  );
}

export default App
