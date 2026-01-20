import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Bot, Box } from 'lucide-react'; // Using icons for visual appeal

const Home = () => {
    return (
        <div className="home-container">
            <div className="overlay"></div>

            <div className="hero-content">
                <h1 className="main-headline">THE BEAUTIFUL GAME <span className="highlight">DECODED</span></h1>
                <p className="sub-headline">A one-step destination for football updates and transfers</p>
            </div>

            <div className="cards-container">
                <Link to="/league" className="card glass-card">
                    <div className="card-icon"><Globe size={48} /></div>
                    <h3>Global League</h3>
                    <p>Live scores, standings, and comprehensive stats from around the world.</p>
                </Link>

                <Link to="/chatbot" className="card glass-card">
                    <div className="card-icon"><Bot size={48} /></div>
                    <h3>Transfer Bot</h3>
                    <p>AI-powered insights on player transfers, rumors, and market values.</p>
                </Link>

                <Link to="/3d" className="card glass-card">
                    <div className="card-icon"><Box size={48} /></div>
                    <h3>3D Model</h3>
                    <p>Immersive 3D stadium tours and player technique analysis.</p>
                </Link>
            </div>
        </div>
    );
};

export default Home;
