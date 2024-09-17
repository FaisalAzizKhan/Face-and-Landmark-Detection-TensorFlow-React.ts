import React, { useRef, useState } from "react";
// import * as tf from "@tensorflow/tfjs";
// import * as facemesh from "@tensorflow-models/facemesh";
import Webcam from "react-webcam";
import { runDetector } from "./dectector";

<<<<<<< HEAD
=======
const inputResolution = {
  width: 700,
  height: 700,
};
>>>>>>> 942a729c41dc164f73ea0cc95295ef73017cecb2


 

function App() {
  const inputResolution = { width: 1080, height: 900}
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const handleVideoLoad = (videoNode: any) => {
    const video = videoNode.target;
    if (video.readyState === 4) return runDetector(video, canvasRef.current as any)
  }

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
      <div>
        
      </div>
    </div>
  );
}

export default App;