const videoElement = document.getElementById('video');
const canvasElement = document.getElementById('overlay');
const canvasCtx = canvasElement.getContext('2d');
const earringImg = new Image();
earringImg.src = 'assets/earring.png'; // transparent PNG

// Resize canvas to video
function resizeCanvas() {
  canvasElement.width = videoElement.videoWidth;
  canvasElement.height = videoElement.videoHeight;
}

const faceMesh = new FaceMesh({
  locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4/${file}`
});
faceMesh.setOptions({
  maxNumFaces: 1,
  refineLandmarks: true,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
});

faceMesh.onResults(results => {
  if (!results.multiFaceLandmarks.length) return;
  const landmarks = results.multiFaceLandmarks[0];

  resizeCanvas();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

  // Example: Landmark 234 is left ear
  const leftEar = landmarks[234];
  const x = leftEar.x * canvasElement.width;
  const y = leftEar.y * canvasElement.height;

  const size = 60; // Adjust size based on face scale if needed
  canvasCtx.drawImage(earringImg, x - size / 2, y - size / 2, size, size);
});

const camera = new Camera(videoElement, {
  onFrame: async () => {
    await faceMesh.send({ image: videoElement });
  },
  width: 640,
  height: 480
});
camera.start();
