// backend/utils/faceRecognition.js
const faceapi = require("@vladmandic/face-api");
const canvas = require("canvas");
const path = require("path");

const { Canvas, Image, ImageData } = canvas;
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

async function loadModels() {
  const modelPath = path.join(__dirname, "..", "models");
  await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelPath);
  await faceapi.nets.faceLandmark68Net.loadFromDisk(modelPath);
  await faceapi.nets.faceRecognitionNet.loadFromDisk(modelPath);
}

async function getDescriptor(imagePath) {
  const img = await canvas.loadImage(imagePath);
  const detection = await faceapi
    .detectSingleFace(img)
    .withFaceLandmarks()
    .withFaceDescriptor();

  return detection?.descriptor;
}

module.exports = {
  loadModels,
  getDescriptor,
  faceapi,
};
