import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import '@tensorflow/tfjs-backend-webgl'
import '@tensorflow/tfjs-backend-cpu'
import { drawMesh } from "./drawMesh";
 
export const runDetector = async (video: HTMLVideoElement, canvas: HTMLCanvasElement) => {

  const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
    const detectorConfig = {
      runtime: "tfjs",
      refineLandmarks: true
    };
    const detector = await faceLandmarksDetection.createDetector(model, detectorConfig as any)
    const detect = async (net: any) => {
      const estimationConfig = { flipHorizontal: false }
      const faces = await net.estimateFaces(video, estimationConfig)
      const ctx = canvas.getContext("2d")
      requestAnimationFrame(() => drawMesh(faces[0], ctx))
      detect(detector)
    };
    detect(detector)
  };
 
 
