import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import '@tensorflow/tfjs-backend-webgl'
import '@tensorflow/tfjs-backend-cpu'
 
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
      detect(detector);
    };
    detect(detector);
  };
  export const TRIANGULATION = [0, 127, 34, 139, 11, 0, 37, 232, 38, 1, 39, 2, 40, 3, 41, 4, 42, 5, 43, 6, 44]
  
  export const drawMesh = (prediction: any, ctx: any) => {
    if (!prediction) return;
    const keyPoints = prediction.keypoints;
    if (!keyPoints) return;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    for (let i = 0; i < TRIANGULATION.length / 3; i++) {
      const points = [
        TRIANGULATION[i * 3],
        TRIANGULATION[i * 3 + 1],
        TRIANGULATION[i * 3 + 2],
      ].map((index) => keyPoints[index]);
      drawPath(ctx, points, true);
    }

    for (let keyPoint of keyPoints) {
      ctx.beginPath();
      ctx.arc(keyPoint.x, keyPoint.y, 1, 0, 3 * Math.PI);
      ctx.fillStyle = "aqua";
      ctx.fill();
    }

  }
 
  const drawPath = (ctx: any, points: any, closePath: any) => {
    const region = new Path2D();
    region.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      const point = points[i];
      region.lineTo(point.x, point.y);
    }
    if (closePath) region.closePath();
    ctx.stokeStyle = "black";
    ctx.stroke(region);
  };