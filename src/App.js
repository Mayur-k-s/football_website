import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Chatbot from './pages/Chatbot';
import League from './pages/League';
import ThreeD from './pages/ThreeD';
import TeamBuilder from './pages/TeamBuilder';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation Bar */}
        <nav className="navbar glass-nav">
          <div className="logo">SANTOS FC</div>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/league">League</Link>
            <Link to="/chatbot">Chatbot</Link>
            <Link to="/3d">3D</Link>
            <Link to="/team-builder">Team Builder</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/league" element={<League />} />
          <Route path="/3d" element={<ThreeD />} />
          <Route path="/team-builder" element={<TeamBuilder />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
