/**
 * Sultan-v88 Fold Engine
 *
 * Pure-function implementation of the geometric fold / unfold math
 * used by the demo visualization. All functions are side-effect-free
 * so they can be tested without a DOM or canvas.
 */

const FOLD_RATE = 0.02;
const MIN_SCALE = 0.05;
const MAX_SCALE = 1.0;

function computeFoldScale(currentScale, isFolding) {
  if (isFolding && currentScale > MIN_SCALE) {
    return Math.max(currentScale - FOLD_RATE, MIN_SCALE);
  }
  if (!isFolding && currentScale < MAX_SCALE) {
    return Math.min(currentScale + FOLD_RATE, MAX_SCALE);
  }
  return currentScale;
}

function computeRotationAngle(timeMs, layerIndex, speedFactor = 0.002) {
  return timeMs * speedFactor * 0.2 + layerIndex * (Math.PI / 3);
}

function computeLayerRect(layerIndex, baseSize = 50, step = 20) {
  const offset = baseSize + layerIndex * step;
  return {
    x: -offset,
    y: -offset,
    width: offset * 2,
    height: offset * 2,
  };
}

function foldStepsToMinimum(startScale) {
  if (startScale <= MIN_SCALE) return 0;
  return Math.ceil((startScale - MIN_SCALE) / FOLD_RATE);
}

function unfoldStepsToMaximum(startScale) {
  if (startScale >= MAX_SCALE) return 0;
  return Math.ceil((MAX_SCALE - startScale) / FOLD_RATE);
}

module.exports = {
  FOLD_RATE,
  MIN_SCALE,
  MAX_SCALE,
  computeFoldScale,
  computeRotationAngle,
  computeLayerRect,
  foldStepsToMinimum,
  unfoldStepsToMaximum,
};
