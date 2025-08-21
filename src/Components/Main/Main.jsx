import React, { useState, useRef, useEffect } from "react";
import "./Main.css";
import {
  IoCompassOutline,
  IoBulbOutline,
  IoChatboxOutline,
} from "react-icons/io5";
import { BsCodeSlash } from "react-icons/bs";
import { LuSendHorizonal } from "react-icons/lu"; // Corrected import name
import { GrGallery } from "react-icons/gr";
import { CiMicrophoneOn } from "react-icons/ci";
import axios from "axios";

const Main = ({ setRecentPrompt }) => {
  const inputRef = useRef(null);
  const [input, setInput] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [showContent, setShowContent] = useState(true);
  const [hidedp, setHidedp] = useState(false);
  const [question, setQuestion] = useState("");

  useEffect(() => {
    // Automatically focus the input element when the component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSendButton = () => {
    if (input.trim() === "") {
      return;
    }
    setRecentPrompt(input);
    getResponse();
    hideContent();
    hidepfp();
    setQuestion(input);
    setInput("");
  };

  async function getResponse() {
    setAnswer("");
    setLoading(true);
    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBYeV7lJET24ajD9z27U0BIe-IzZV4Rz-U",
        method: "post",
        data: {
          contents: [{ parts: [{ text: input }] }],
        },
      });

      const oldResponse = response.data.candidates[0].content.parts[0].text;
      let newResponse = oldResponse.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
      let finalResponse = newResponse.split("*").join("</br>");
      setAnswer(finalResponse);
    } catch (error) {
      console.error("Error fetching data:", error);
      setAnswer("Error fetching data. Please try again.");
    } finally {
      setLoading(false);
      setShowContent(false);
    }
  }

  const hideContent = () => {
    setShowContent(false);
  };

  const hidepfp = () => {
    setHidedp(true);
  };

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYmkp9a2rrD1Sskb9HLt5mDaTt4QaIs8CcBg&s"
          alt=""
        />
      </div>
      <div className="main-container">
        <div className="answer">
          <div className="ans-container">
            {hidedp && question && (
              <div className="query">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYmkp9a2rrD1Sskb9HLt5mDaTt4QaIs8CcBg&s"
                  alt=""
                />
                <p>{question}</p>
              </div>
            )}
            {loading && (
              <div className="loader">
                <img
                  src="https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg"
                  alt=""
                />
                <hr />
                <hr />
                <hr />
              </div>
            )}
            {!loading && answer && (
              <div className="result">
                <p dangerouslySetInnerHTML={{ __html: answer }}></p>
              </div>
            )}
          </div>
        </div>
        {showContent && (
          <div className="greet">
            <>
              <span>Hello, Developer</span>
              <p>How can I help you today?</p>
            </>
          </div>
        )}
        {showContent && (
          <div className="cards">
            <div className="card">
              <p>Suggest beautiful places to see on upcoming road trip</p>
              <IoCompassOutline className="img" />
            </div>
            <div className="card">
              <p>Brainstorm team bonding activities for our work retreat</p>
              <IoChatboxOutline className="img" />
            </div>
            <div className="card">
              <p>Help design a database schema for a business</p>
              <BsCodeSlash className="img" />
            </div>
          </div>
        )}
        <div className="main-bottom">
          <div className="items">
            <input
              type="text"
              placeholder="Enter a prompt here"
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <div className="icons">
              <div className="icon-hide">
                <GrGallery />
                <CiMicrophoneOn />
              </div>
              <LuSendHorizonal onClick={handleSendButton} />
            </div>
          </div>
          <div className="bottom-info">
            <p>
              Gemini may display inaccurate info, including about people, so
              double-check its response.{" "}
              <span>Your privacy and Gemini Apps</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
