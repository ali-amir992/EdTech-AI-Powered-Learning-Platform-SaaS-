import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import socket from "@/services/socket";
import { fetchMessages, addMessage } from "@/store/slices/chatSlice";
import { useAppDispatch } from "@/store/hooks/useAppDispatch";
import { RootState } from "@/store/store";

// Define the type for the Chat component props
interface ChatProps {
  receiverId: string;
}

// Define the type for a message
interface Message {
  senderId: string;
  message: string;
}

const Chat = ({ receiverId }: ChatProps) => {
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState<string>("");

  // Use typed useSelector for the Redux store
  const { user } = useSelector((state: RootState) => state.auth);
  const { messages } = useSelector((state: RootState) => state.chat);

  console.log("messages are " , messages);

  useEffect(() => {
    if (user) {
      socket.emit("join", user._id);
    }

    // Load previous messages when chat opens
    dispatch(fetchMessages(receiverId));

    // Listen for incoming messages
    socket.on("receive_message", (data: Message) => {
      dispatch(addMessage(data));
    });

    // Cleanup the socket listener
    return () => {
      socket.off("receive_message");
    };
  }, [user, dispatch, receiverId]);

  const sendMessage = () => {
    if (message.trim() !== "") {
      // Emit the message to the server
      socket.emit("send_message", {
        senderId: user?._id,
        receiverId,
        message,
      });

      // Add the message to the local state
      if (user != null) {
        dispatch(addMessage({ senderId: user._id, message }));
      } else {
        console.log("user is null");
      }
      setMessage("");
    }
  };

  return (
    <div>
      
      <div>
        {messages.map((msg: Message, idx: number) => (
          <div
            key={idx}
            className={msg.senderId === user?._id ? "sent" : "received"}
          >
            {msg.message}
          </div>
        ))}
      </div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;