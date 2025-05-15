/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { FiSidebar, FiSend, FiUserPlus, FiUsers } from "react-icons/fi";
import CommunitiesReq from "./CommunitiesReq";
import CommunityMembers from "./CommunityMembers";

const Disscussion = ({ selectCom }) => {
  const { _id } = selectCom;
  const [reqBtn, setReqBtn] = useState(false);
  const [memBtn, setMemBtn] = useState(false);

  useEffect(() => {
    setReqBtn(false);
    setMemBtn(false);
  }, [selectCom]);

  return (
    <div className="w-full relative max-h-screen min-h-screen overflow-y-hidden px-4 border rounded-r-sm border-accent">
      <nav className="navbar bg-base-100 border-b justify-between">
        <h2
          onClick={() => {
            setMemBtn(false);
            setReqBtn(false);
          }}
          className="text-xl cursor-pointer"
        >
          {selectCom.communityName}
        </h2>
        <div className="space-x-4 flex">
          <FiUsers
            onClick={() => {
              setMemBtn(true);
              setReqBtn(false);
            }}
            className="w-5 h-5 cursor-pointer"
          />
          <FiUserPlus
            onClick={() => {
              setReqBtn(true);
              setMemBtn(false);
            }}
            className="w-5 h-5 cursor-pointer"
          />
        </div>
      </nav>

      {!reqBtn && !memBtn ? (
        <div className="w-full h-full flex flex-col">
          <div className="">
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
          </div>
          <div className="flex mx-auto absolute bottom-5 left[0%] items-center justify-center gap-4 w-full">
            <label htmlFor="my-drawer-2" className="drawer-button lg:hidden">
              <FiSidebar className="bg-transparent w-8 h-8" />
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input w-[50%] rounded-2xl"
            />
            <FiSend className="cursor-pointer w-5 h-5 lg:h-7 lg:w-7  md:w-6 md:h-6" />
          </div>
        </div>
      ) : !memBtn ? (
        <CommunitiesReq _id={_id} />
      ) : (
        <CommunityMembers _id={_id} />
      )}
    </div>
  );
};

export default Disscussion;
