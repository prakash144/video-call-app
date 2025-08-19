import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

const HomePage = () => {
    const [roomCode, setRoomCode] = useState("");
    const navigate = useNavigate();

    const handleFormSubmit = (ev: React.FormEvent) => {
        ev.preventDefault();
        if (!roomCode.trim()) return;
        navigate(`/room/${roomCode}`);
    };

    const handleCreateRoom = () => {
        const newRoom = Math.random().toString(36).substring(2, 8);
        navigate(`/room/${newRoom}`);
    };

    return (
        <div className="homepage">
            <div className="home-card">
                <h1 className="title">🎥 Premium Video Call</h1>
                <p className="subtitle">Join or create a secure meeting room instantly</p>

                <form onSubmit={handleFormSubmit}>
                    <input
                        id="room-input"
                        value={roomCode}
                        onChange={(e) => setRoomCode(e.target.value)}
                        type="text"
                        required
                        placeholder="Enter Room Code"
                        className="input-box"
                    />
                    <button type="submit" className="btn join-btn">Join Room</button>
                </form>

                <button onClick={handleCreateRoom} className="btn create-btn">
                    + Create New Room
                </button>
            </div>
        </div>
    );
};

export default HomePage;
