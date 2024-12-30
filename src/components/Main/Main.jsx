import React, { useContext, useEffect, useState } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/context";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  // State for dynamic greeting
  const [greeting, setGreeting] = useState();
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("darkMode") === "enabled"
  );

  // Function to calculate greeting based on time
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Good Morning");
    } else if (hour < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && input.trim()) {
      onSent(); // Trigger the send function
    }
  };

  //Dark Mode
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode ? "enabled" : "disabled");
    document.body.classList.toggle("dark-mode", newDarkMode);
  };

  // Apply dark mode to body on load
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  return (
    <div className="main">
      <div className="nav">
        <p>MITRA-AI</p>
        <img src={assets.user_icon} alt="" />
        <div className="dark-mode-toggle">
          <input
            type="checkbox"
            id="dark-mode-checkbox"
            checked={isDarkMode}
            onChange={toggleDarkMode}
          />
          <label htmlFor="dark-mode-checkbox" className="toggle-label">
            {isDarkMode ? "🌙" : "☀️"}
          </label>
        </div>
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>{greeting}</span>
              </p>
              <p>How can I help you today ?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Sketch your dream destinations.</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card">
                <p>Bright ideas about nature's flyers.</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
                <p>Discuss the shades that define life.</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card">
                <p>Coding stories of humanity's finest.</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a prompt"
              onKeyDown={handleKeyPress}
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {input ? (
                <img onClick={() => onSent()} src={assets.send_icon} alt="" />
              ) : null}
            </div>
          </div>
          <p className="bottom-info">
            Its the best to use but double-check its reponses accordingly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
