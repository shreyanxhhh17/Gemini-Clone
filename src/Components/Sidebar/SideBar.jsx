import React, { useState } from "react";
import "./SideBar.css";
import { HiMenu, HiPlus } from "react-icons/hi";
import { HiOutlineChatBubbleLeft } from "react-icons/hi2";
import { BsQuestionCircle } from "react-icons/bs";
import { FaClockRotateLeft } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";

const SideBar = ({ recentPrompt }) => {
  const [extended, setExtended] = useState(false);

  // Toggle extended state
  const toggleExtended = () => {
    setExtended((prev) => !prev);
  };

  return (
    <div className={`sidebar ${extended ? "extended" : ""}`}>
      <div className="top">
        <HiMenu onClick={toggleExtended} className="menu" />
        <div className="new-chat">
          <HiPlus />
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            <div className="recent-entry">
              {<HiOutlineChatBubbleLeft />}
              <p>{recentPrompt}</p>
            </div>
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <BsQuestionCircle />
          {extended ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <FaClockRotateLeft />
          {extended ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <IoSettingsOutline />
          {extended ? <p>Setting</p> : null}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
