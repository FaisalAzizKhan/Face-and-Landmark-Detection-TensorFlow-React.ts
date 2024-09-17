import { OutlineFace, TRIANGULATION } from "./triangulation";

export const drawMesh = (prediction: any, ctx: any) => {
  if (!prediction) return;
  const keyPoints = prediction.keypoints;
  if (!keyPoints) return;
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  function getLandMark(outlineFace: any[], keyPoints: any[]) {
    for (let i = 0; i < outlineFace.length / 3; i++) {
      const points = [
        outlineFace[i * 3],
        outlineFace[i * 3 + 1],
        outlineFace[i * 3 + 2],
      ].map((index) => keyPoints[index]);

      drawPath(ctx, points, true);
    }

    // Draw the keypoints (landmarks)
    for (let keyPoint of keyPoints) {
      ctx.beginPath();
      ctx.arc(keyPoint.x, keyPoint.y, 1, 0, 2 * Math.PI);
      ctx.fillStyle = "aqua";
      ctx.fill();
    }
  }

  // Calculate and draw bounding box
 const drawBoundingBox = (keyPoints: any[])=> {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    // Calculate min and max coordinates
    keyPoints.forEach((point: any) => {
      if (point.x < minX) minX = point.x;
      if (point.y < minY) minY = point.y;
      if (point.x > maxX) maxX = point.x;
      if (point.y > maxY) maxY = point.y;
     
    });
  
    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;  
    const radiusX = (maxX - minX) / 2;
    const radiusY = (maxY - minY) / 2;
    console.log(`Center X: ${centerX}, Center Y: ${centerY}, Radius X: ${radiusX}, Radius Y: ${radiusY}`);


    ctx.beginPath();
    ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
    ctx.strokeStyle = "green";
    ctx.lineWidth = 2;
    ctx.stroke();
  }
  
  
 
  drawBoundingBox(keyPoints);
 // checkImportantLandmarks(keyPoints);  
};
const checkImportantLandmarks = (keyPoints: any[]) => {
  const landmarksToCheck = [
    { name: 'leftEye', xRange: [0, 100], yRange: [0, 100] },
    { name: 'rightEye', xRange: [100, 200], yRange: [0, 100] },
    { name: 'lips', xRange: [50, 150], yRange: [150, 200] },
    { name: 'forehead', xRange: [50, 150], yRange: [0, 50] }
  ];
//console.log(landmarksToCheck)
  // Function to check if a keypoint is within the specified range
  const isWithinRange = (point: any, xRange: number[], yRange: number[]) => {
    return point.x >= xRange[0] && point.x <= xRange[1] &&
           point.y >= yRange[0] && point.y <= yRange[1];
  };

  // Check if each important landmark is present within the defined ranges
  const hasAllLandmarks = landmarksToCheck.every(landmark => 
    keyPoints.some(point => isWithinRange(point, landmark.xRange, landmark.yRange))
  );

  //console.log(hasAllLandmarks);
  
  return hasAllLandmarks;
};


const drawPath = (ctx: any, points: any, closePath: boolean) => {
  const region = new Path2D();
  if (points.length > 0) {
    region.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      const point = points[i];
      region.lineTo(point.x, point.y);
    }
    if (closePath) region.closePath();
    ctx.strokeStyle = "red";
    ctx.stroke(region);
  }
  
};
