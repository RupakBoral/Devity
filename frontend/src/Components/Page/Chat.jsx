import { useEffect, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { createSocketConnection } from "../../utils/socket";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Chat = () => {
  let receiverId = useParams();
  const user = useSelector((store) => store.user);
  const [messages, setMessages] = useState([[]]);
  const [input, setInput] = useState("");

  const userId = user?._id;
  const firstName = user?.firstName;
  const receiver = receiverId?.receiverId;

  useEffect(() => {
    if (!userId) return;

    const mssgs = messages.filter((mssg) => mssg.length > 0);
    setMessages(mssgs);

    const socket = createSocketConnection();
    // as soon as page loads, the socket connection is done, and joinEvent is emit
    socket.emit("joinChat", { receiver, userId });

    socket.on("messageReceived", ({ firstName, userId, text }) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { firstName, userId, text },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, receiver]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const socket = createSocketConnection();
    socket.emit("sendMessage", { firstName, userId, receiver, text: input });
    setInput("");
  };

  return (
    <div className="w-screen h-screen pt-10">
      <div className="max-w-md h-10/12 mx-auto my-auto p-4 border rounded-lg shadow-md bg-base-200 flex flex-col">
        <div className="flex-1 overflow-y-auto p-2 border-b">
          {messages.map((mssg, index) =>
            mssg.userId !== userId ? (
              <div key={index} className="chat chat-start">
                <div className="chat-header">{mssg.firstName}</div>
                <div className="chat-bubble">{mssg.text}</div>
              </div>
            ) : (
              <div key={index} className="chat chat-end">
                <div className="chat-header">{mssg.firstName}</div>
                <div className="chat-bubble">{mssg.text}</div>
              </div>
            )
          )}
        </div>
        <div className="flex items-center gap-2 p-2">
          <input
            type="text"
            className="flex-1 p-2 border bg-base-100 rounded-lg focus:outline-0"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button
            className="bg-primary-content  cursor-pointer text-white p-2 rounded-lg"
            onClick={handleSendMessage}
          >
            <FaPaperPlane className="text-accent" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
