import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FaPaperPlane } from "react-icons/fa";
import { createSocketConnection } from "../../utils/socket";
import { FaChevronLeft } from "react-icons/fa6";

const Chat = () => {
  let receiverId = useParams();
  const navigate = useNavigate();
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
  }, []);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const socket = createSocketConnection();
    socket.emit("sendMessage", { firstName, userId, receiver, text: input });
    setInput("");
  };

  return (
    <div className="w-[80%] h-screen mx-auto py-8 pt-24 px-4">
      <FaChevronLeft
        className="cursor-pointer duration-300 hover:scale-110"
        onClick={() => {
          navigate(-1);
        }}
      />
      <h1 className="font-thin text-center text-3xl">Chat</h1>
      <div className="max-w-sm md:max-w-md lg:max-w-lg h-[90%] mx-auto my-2 p-4 border border-accent rounded-lg shadow-lg shadow-accent bg-base-200 flex flex-col">
        <div className="flex-1 overflow-y-auto p-2 border-b border-accent-content/50">
          {messages.map((mssg, index) =>
            mssg.userId !== userId ? (
              <div key={index} className="chat chat-start space-y-2">
                <div className="chat-header">{mssg.firstName}</div>
                <div className="chat-bubble bg-base-100">{mssg.text}</div>
              </div>
            ) : (
              <div key={index} className="chat chat-end space-y-2">
                <div className="chat-header">{mssg.firstName}</div>
                <div className="chat-bubble bg-accent/60">{mssg.text}</div>
              </div>
            )
          )}
        </div>
        <div className="flex items-center gap-2 p-2">
          <input
            type="text"
            className="w-5/6 md:flex-1 p-2 border border-accent bg-base-100 rounded-lg focus:outline-0"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button
            className="bg-base-content cursor-pointer text-white p-2 rounded-lg"
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
