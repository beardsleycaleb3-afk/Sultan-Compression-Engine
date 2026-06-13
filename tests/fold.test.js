const {
  FOLD_RATE,
  MIN_SCALE,
  MAX_SCALE,
  computeFoldScale,
  computeRotationAngle,
  computeLayerRect,
  foldStepsToMinimum,
  unfoldStepsToMaximum,
} = require('../src/fold');

describe('constants', () => {
  test('FOLD_RATE is 0.02', () => expect(FOLD_RATE).toBe(0.02));
  test('MIN_SCALE is 0.05', () => expect(MIN_SCALE).toBe(0.05));
  test('MAX_SCALE is 1.0', () => expect(MAX_SCALE).toBe(1.0));
});

describe('computeFoldScale', () => {
  test('decreases scale when folding', () => {
    const result = computeFoldScale(1.0, true);
    expect(result).toBeCloseTo(0.98);
  });

  test('clamps to MIN_SCALE when folding near bottom', () => {
    const result = computeFoldScale(0.06, true);
    expect(result).toBeCloseTo(MIN_SCALE);
  });

  test('does not go below MIN_SCALE', () => {
    const result = computeFoldScale(MIN_SCALE, true);
    expect(result).toBe(MIN_SCALE);
  });

  test('increases scale when unfolding', () => {
    const result = computeFoldScale(0.5, false);
    expect(result).toBeCloseTo(0.52);
  });

  test('clamps to MAX_SCALE when unfolding near top', () => {
    const result = computeFoldScale(0.99, false);
    expect(result).toBeCloseTo(MAX_SCALE);
  });

  test('does not exceed MAX_SCALE', () => {
    const result = computeFoldScale(MAX_SCALE, false);
    expect(result).toBe(MAX_SCALE);
  });

  test('full fold cycle returns to original scale', () => {
    let scale = 1.0;
    while (scale > MIN_SCALE) scale = computeFoldScale(scale, true);
    while (scale < MAX_SCALE) scale = computeFoldScale(scale, false);
    expect(scale).toBeCloseTo(MAX_SCALE);
  });
});

describe('computeRotationAngle', () => {
  test('returns 0 when time and layer are both 0', () => {
    expect(computeRotationAngle(0, 0)).toBe(0);
  });

  test('increases with time', () => {
    const a1 = computeRotationAngle(1000, 0);
    const a2 = computeRotationAngle(2000, 0);
    expect(a2).toBeGreaterThan(a1);
  });

  test('increases with layer index', () => {
    const a0 = computeRotationAngle(0, 0);
    const a1 = computeRotationAngle(0, 1);
    expect(a1 - a0).toBeCloseTo(Math.PI / 3);
  });

  test('respects custom speed factor', () => {
    const slow = computeRotationAngle(1000, 0, 0.001);
    const fast = computeRotationAngle(1000, 0, 0.004);
    expect(fast).toBeGreaterThan(slow);
  });
});

describe('computeLayerRect', () => {
  test('layer 0 produces a 100×100 rect centered at origin', () => {
    const rect = computeLayerRect(0);
    expect(rect).toEqual({ x: -50, y: -50, width: 100, height: 100 });
  });

  test('layer 1 is larger by the step amount', () => {
    const rect = computeLayerRect(1);
    expect(rect).toEqual({ x: -70, y: -70, width: 140, height: 140 });
  });

  test('respects custom baseSize and step', () => {
    const rect = computeLayerRect(2, 30, 10);
    expect(rect).toEqual({ x: -50, y: -50, width: 100, height: 100 });
  });
});

describe('foldStepsToMinimum', () => {
  test('returns 0 when already at minimum', () => {
    expect(foldStepsToMinimum(MIN_SCALE)).toBe(0);
  });

  test('correctly computes steps from MAX_SCALE', () => {
    const steps = foldStepsToMinimum(MAX_SCALE);
    expect(steps).toBe(Math.ceil((MAX_SCALE - MIN_SCALE) / FOLD_RATE));
  });

  test('returns 0 when below minimum', () => {
    expect(foldStepsToMinimum(0.01)).toBe(0);
  });
});

describe('unfoldStepsToMaximum', () => {
  test('returns 0 when already at maximum', () => {
    expect(unfoldStepsToMaximum(MAX_SCALE)).toBe(0);
  });

  test('correctly computes steps from MIN_SCALE', () => {
    const steps = unfoldStepsToMaximum(MIN_SCALE);
    expect(steps).toBe(Math.ceil((MAX_SCALE - MIN_SCALE) / FOLD_RATE));
  });

  test('returns 0 when above maximum', () => {
    expect(unfoldStepsToMaximum(1.5)).toBe(0);
  });
});
