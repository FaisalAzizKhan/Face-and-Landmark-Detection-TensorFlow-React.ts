import React, { useRef, useState } from "react";
// import * as tf from "@tensorflow/tfjs";
// import * as facemesh from "@tensorflow-models/facemesh";
import Webcam from "react-webcam";
import { runDetector } from "./dectector";

const inputResolution = {
  width: 700,
  height: 700,
};

const videoConstraints = {
  width: inputResolution.width,
  height: inputResolution.height,
  facingMode: "user",
};

function App() {
  const [loaded, setLoaded] = useState(false);
  const webcamRef = useRef(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const handleVideoLoad = (videoNode: any) => {
    const video = videoNode.target;
    if (video.readyState !== 4) return;
    runDetector(video, canvasRef.current as any);
  };

  return (
    <div>
        <Webcam
        width={inputResolution.width}
        height={inputResolution.height}
        style={{ position: "absolute" }}
        videoConstraints={{ width: 1080, height: 900, facingMode: "user" }}
        onLoadedData={handleVideoLoad}
    
      />
      <canvas
        ref={canvasRef}
        width={inputResolution.width}
        height={inputResolution.height}
        style={{ position: "absolute" }}
      />
    </div>
  );
}

export default App;