import RobotProfileImage from '../assets/robot.png'
import UserProfileImage from '../assets/user.png'
import './ChatMessage.css'

export default function ChatMessage({ sender, message }) {
  return (
    <div className={
      sender === "user"
        ? "chat-message-user"
        : "chat-message-robot"
    }>
      {(sender === 'robot') && (
        <img src={UserProfileImage} alt="robot image" className="chat-message-profile {
              width: 50px;
            }" />
      )}
      <div className="chat-message-text">
        {message}
      </div>
      {(sender === 'user') && (
        <img src={RobotProfileImage} alt="user image" className="chat-message-profile {
              width: 50px;
            }" />
      )}
    </div>
  );
}