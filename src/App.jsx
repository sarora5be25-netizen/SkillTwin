import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Resume from "./pages/Resume";
import Github from "./pages/Github";
import Dashboard from "./pages/Dashboard";
import Career from "./pages/Career";
import Interview from "./pages/Interview";
import Login from "./pages/Login";

import AIChat from "./components/AIChat";

import "./App.css";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/github" element={<Github />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/career" element={<Career />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      <AIChat />
    </>
  );
}

export default App;