import React from "react";
import SideBar from "./Components/Sidebar/SideBar";
import Main from "./Components/Main/Main";
import { useState } from "react";

const App = () => {
  const [recentPrompt, setRecentPrompt] = useState("");
  return (
    <>
      <SideBar recentPrompt={recentPrompt} />
      <Main setRecentPrompt={setRecentPrompt} />
    </>
  );
};

export default App;
