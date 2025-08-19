import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
        <div className="homepage-container">
            <div className="card">
                <h1>🎥 Video Call App</h1>
                <form onSubmit={handleFormSubmit}>
                    <label htmlFor="room-input">Enter Room Code</label>
                    <input
                        id="room-input"
                        value={roomCode}
                        onChange={(e) => setRoomCode(e.target.value)}
                        type="text"
                        required
                        placeholder="e.g. team-meeting-123"
                    />
                    <button type="submit">Join Room</button>
                </form>

                <button
                    onClick={handleCreateRoom}
                    style={{ marginTop: "1rem", background: "#10b981" }}
                >
                    + Create New Room
                </button>
            </div>
        </div>
    );
};

export default HomePage;
