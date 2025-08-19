import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import "./room.css";

const RoomPage = () => {
    const { roomId } = useParams<{ roomId: string }>();
    const meetingRef = useRef<HTMLDivElement | null>(null);
    const zpRef = useRef<any | null>(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [joined, setJoined] = useState(false);
    const [_, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!roomId) {
            setError("Missing roomId");
            setLoading(false);
            return;
        }

        const appIdRaw = import.meta.env.VITE_ZEGO_APP_ID;
        const serverSecret = import.meta.env.VITE_ZEGO_SERVER_SECRET as string | undefined;

        const appID = appIdRaw ? Number(appIdRaw) : NaN;
        if (!appID || Number.isNaN(appID) || !serverSecret) {
            setError("Server configuration error");
            setLoading(false);
            return;
        }

        let mounted = true;

        const startMeeting = async () => {
            try {
                const userID = Date.now().toString();
                const userName = "Guest_" + userID.slice(-4);

                const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
                    appID,
                    serverSecret,
                    roomId,
                    userID,
                    userName
                );

                const zp = ZegoUIKitPrebuilt.create(kitToken);
                zpRef.current = zp;

                zp.joinRoom({
                    container: meetingRef.current ?? undefined,
                    scenario: { mode: ZegoUIKitPrebuilt.VideoConference },
                    onJoinRoom: () => {
                        if (!mounted) return;
                        setLoading(false);
                        setJoined(true);
                    },
                    onLeaveRoom: () => {
                        try {
                            zp.destroy();
                        } catch {}
                        zpRef.current = null;
                        setJoined(false);
                    },
                });

                // 🔑 fallback: stop loading after 5s if joinRoom doesn’t fire
                setTimeout(() => {
                    if (mounted && loading) {
                        setLoading(false);
                    }
                }, 1000);

            } catch (err) {
                setError("Failed to join the room.");
                setLoading(false);
            }
        };

        startMeeting();

        return () => {
            mounted = false;
            if (zpRef.current) {
                try {
                    zpRef.current.destroy();
                } catch {}
                zpRef.current = null;
            }
        };
    }, [roomId]);

    const handleLeave = () => {
        if (zpRef.current) {
            try {
                zpRef.current.destroy();
            } catch {}
            zpRef.current = null;
        }
        setJoined(false);
        navigate("/");
    };

    return (
        <div className="room-container">
            <header className="room-header">
                <div className="left">
                    <span className="logo">🎥 VideoCall</span>
                    <span className="room-badge">Room: {roomId}</span>
                </div>
                <div className="right">
                    <button
                        onClick={handleLeave}
                        className="leave-btn"
                        disabled={!joined && loading}
                    >
                        🚪 Leave Room
                    </button>
                </div>
            </header>

            {loading && !joined && (
                <div className="loading-overlay">
                    <div className="spinner"></div>
                    <p>Connecting to room...</p>
                </div>
            )}

            <main ref={meetingRef} className="room-main" />
        </div>
    );
};

export default RoomPage;
