import { useEffect, useRef } from 'react'
import ChatMessage from './ChatMessage'
import './ChatMessages.css'

export default function ChatMessages({ chatMessages }) {
  const chatMessagesRef = useRef(null); // this is used to save html element for future use

  useEffect(() => {
    // here we can run some code after the component is created/updated
    // console.log("updated");
    const containerElem = chatMessagesRef.current;
    if (containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  }, [chatMessages]); // array controls when useEffect runs and also we can put some data in this array

  return (
    <div
      className="chat-messages-container"
      ref={chatMessagesRef}>
      {
        chatMessages.map((chatMessage) => {
          return (
            <ChatMessage
              sender={chatMessage.sender}
              message={chatMessage.message}
              key={chatMessage.id}
            />
          );
        })
      }
    </div>
  );
}