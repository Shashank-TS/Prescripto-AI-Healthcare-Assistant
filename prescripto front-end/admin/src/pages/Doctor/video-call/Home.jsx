import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";

const Home = () => {

  const { roomId } = useParams();
  //   const [value, setValue] = useState("ts123");
  const navigateTo = useNavigate();
  const handleJoin = useCallback(() => {
    navigateTo(`/video-call/room/${roomId}`);
  });

  return (
    <div className="home-container">
      <div className="home-box">
        <h1>
          Join Video Call</h1>       
        {/* <input
          value={value}
          type="text"
          placeholder="Enter Your Room ID"
          onChange={(e) => setValue(e.target.value)}
          className="room-input"
        /> */}
        <input
          value={roomId}
          type="text"
          className="room-input"
          readOnly
        />
        <button onClick={handleJoin} className="join-button">
          Join
        </button>
      </div>
    </div>
  );
};

export default Home;
