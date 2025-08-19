import { Routes, Route, Link, useLocation } from "react-router-dom";
import { SendHorizontal, Twitter, Facebook, Instagram, Linkedin, Github, Globe } from "lucide-react";
import "./App.css";
import HomePage from "./pages/home";
import RoomPage from "./pages/room";

function App() {
    const location = useLocation();
    const isRoomPage = location.pathname.startsWith("/room");

    return (
        <div className="app-container">
            {/* Header */}
            <header className="app-header">
                <div className="logo">
                    <Link to="/">🎥 PremiumMeet</Link>
                </div>
                {!isRoomPage && (
                    <nav className="nav-links">
                        <Link to="/">Home</Link>
                        <Link to="/room/demo">Join Room</Link>
                    </nav>
                )}
            </header>

            {/* Main Content */}
            <main className={`app-main ${isRoomPage ? "room-view" : "homepage-view"}`}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/room/:roomId" element={<RoomPage />} />
                </Routes>
            </main>

            {/* Footer */}
            {!isRoomPage && (
                <footer className="app-footer">
                    <div className="footer-content">
                        <div className="social-links">
                            <a href="https://t.me/" target="_blank" rel="noopener noreferrer" aria-label="Telegram"><SendHorizontal /></a>
                            <a href="https://twitter.com/Rabidas_Prakash" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><Twitter /></a>
                            <a href="https://www.facebook.com/light144/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook /></a>
                            <a href="https://www.instagram.com/__prakash_r__/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram /></a>
                            <a href="https://www.linkedin.com/in/prakashrabidas/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin /></a>
                            <a href="https://github.com/prakash144" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github /></a>
                            <a href="https://prakashrabidas.in/" target="_blank" rel="noopener noreferrer" aria-label="Portfolio"><Globe /></a>
                        </div>
                        <p className="footer-text">
                            © {new Date().getFullYear()} PremiumMeet. Built by <a href="https://prakashrabidas.in/" target="_blank" rel="noopener noreferrer">Prakash</a>. All Rights Reserved.
                        </p>
                    </div>
                </footer>
            )}
        </div>
    );
}

export default App;
