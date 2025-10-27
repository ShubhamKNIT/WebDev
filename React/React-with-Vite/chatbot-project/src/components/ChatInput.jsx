import { useState } from 'react'
import { Chatbot } from 'supersimpledev';
import './ChatInput.css'

export default function ChatInput({ chatMessages, setChatMessages, loading, setLoading }) {
  const [inputText, setInputText] = useState('');

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  function checkEscape(event) {
    // console.log(event.key);
    if (event.key == "Escape") {
      setInputText("");
    }
  }


  async function sendMessage() {
    if (loading || inputText === "") return;

    const text = inputText;
    setInputText("");
    setLoading(true);

    const newChatMessages = [
      ...chatMessages, // spread operator => to copy the old data
      {
        sender: "user",
        message: text,
        id: crypto.randomUUID()
      }
    ];

    setChatMessages(newChatMessages);

    // getResponse
    const response = await Chatbot.getResponseAsync(text);

    // console.log(response);
    setChatMessages([
      ...newChatMessages, // spread operator => to copy the old data
      {
        sender: "robot",
        message: response,
        id: crypto.randomUUID()
      }
    ]);

    setInputText(""); // set input to empty after button click
    setLoading(false);
  }

  return (
    <div className="chat-input-container">
      <input
        placeholder="Send a message to Chatbot"
        size="30"
        value={inputText}
        onChange={saveInputText}
        onKeyDown={checkEscape}
        className="chat-input"
      />
      <button
        onClick={sendMessage}
        disabled={loading}
        className="send-button"
      >Send</button>
    </div>
  );
}