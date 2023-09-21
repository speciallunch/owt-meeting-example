import React, { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const constraints = {
    video: true,
    audio: true,
  };
  const videoRef = useRef<HTMLVideoElement>(null);
  const [myStream, setMyStream] = useState<MediaStream | undefined>(undefined);

  function getUserStream() {
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        console.log("Got MediaStream:", stream);
        setMyStream(stream);
      })
      .catch((error) => {
        // 권한이 거부되면 PermissionDeniedError
        // 연결된 기기가 연결되어 있지 않으면 NotFoundError
        console.error("Error accessing media devices.", error);
      });
  }

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.srcObject = myStream ?? null;
  }, [myStream]);
  return (
    <div className="App">
      <button onClick={getUserStream}>getUserStream</button>
      <video autoPlay ref={videoRef} />
    </div>
  );
}

export default App;
