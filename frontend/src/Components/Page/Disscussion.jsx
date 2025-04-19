/* eslint-disable react/prop-types */
import { FiSidebar, FiSend } from "react-icons/fi";

const Disscussion = ({ selectCom }) => {
  return (
    <div className="w-full h-full px-4">
      <nav className="navbar bg-base-100 shadow-sm border-b">
        <div className="flex-1">
          <h2 className="text-xl">{selectCom.communityName}</h2>
        </div>
      </nav>

      <div className="h-full w-full flex flex-col">
        <div className="h-5/6">
          <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <div className="chat-header">
              Obi-Wan Kenobi
              <time className="text-xs opacity-50">12:45</time>
            </div>
            <div className="chat-bubble">You were the Chosen One!</div>
            <div className="chat-footer opacity-50">Delivered</div>
          </div>
          <div className="chat chat-end">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <div className="chat-header">
              Anakin
              <time className="text-xs opacity-50">12:46</time>
            </div>
            <div className="chat-bubble">I hate you!</div>
            <div className="chat-footer opacity-50">Seen at 12:46</div>
          </div>
        </div>
        <div className="flex items-center h-fit justify-center gap-4 w-full">
          <label htmlFor="my-drawer-2" className="drawer-button lg:hidden">
            <FiSidebar className="bg-transparent w-8 h-8" />
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="input w-[60%]"
          />
          <FiSend className="cursor-pointer w-5 h-5 lg:h-7 lg:w-7  md:w-6 md:h-6" />
        </div>
      </div>
    </div>
  );
};

export default Disscussion;
