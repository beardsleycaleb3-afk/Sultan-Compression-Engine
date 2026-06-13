const {
  SEAL,
  DEFAULT_MANIFEST,
  buildManifest,
  validateSeal,
  buildMobileExport,
  serializeManifest,
} = require('../src/manifest');

describe('SEAL constant', () => {
  test('equals "8oOOo8"', () => {
    expect(SEAL).toBe('8oOOo8');
  });
});

describe('DEFAULT_MANIFEST', () => {
  test('has the correct engine name', () => {
    expect(DEFAULT_MANIFEST.engine).toBe('Sultan-v88');
  });

  test('specifies Triple-Split architecture', () => {
    expect(DEFAULT_MANIFEST.architecture).toBe('DBM Triple-Split');
  });

  test('includes all four logic gates', () => {
    expect(DEFAULT_MANIFEST.logic_gates).toEqual(['qdbp', 'IH-90', 'unnu', 'mwwm']);
  });

  test('enables Shannon limit bypass', () => {
    expect(DEFAULT_MANIFEST.shannon_limit_bypass).toBe(true);
  });

  test('carries the verification seal', () => {
    expect(DEFAULT_MANIFEST.verification_seal).toBe(SEAL);
  });
});

describe('buildManifest', () => {
  test('returns default manifest when called with no overrides', () => {
    const m = buildManifest();
    expect(m).toEqual(DEFAULT_MANIFEST);
  });

  test('allows overriding individual fields', () => {
    const m = buildManifest({ engine: 'TestEngine' });
    expect(m.engine).toBe('TestEngine');
    expect(m.architecture).toBe('DBM Triple-Split');
  });

  test('does not mutate DEFAULT_MANIFEST', () => {
    buildManifest({ engine: 'Modified' });
    expect(DEFAULT_MANIFEST.engine).toBe('Sultan-v88');
  });

  test('allows adding new fields', () => {
    const m = buildManifest({ custom: 42 });
    expect(m.custom).toBe(42);
  });
});

describe('validateSeal', () => {
  test('returns true for a manifest with the correct seal', () => {
    expect(validateSeal(buildManifest())).toBe(true);
  });

  test('returns false for a manifest with a wrong seal', () => {
    expect(validateSeal({ verification_seal: 'FAKE' })).toBe(false);
  });

  test('returns false for null/undefined', () => {
    expect(validateSeal(null)).toBe(false);
    expect(validateSeal(undefined)).toBe(false);
  });

  test('returns false when seal field is missing', () => {
    expect(validateSeal({})).toBe(false);
  });
});

describe('buildMobileExport', () => {
  test('returns object with seal and Verified status', () => {
    const exp = buildMobileExport();
    expect(exp).toEqual({ seal: '8oOOo8', status: 'Verified' });
  });
});

describe('serializeManifest', () => {
  test('produces valid JSON', () => {
    const json = serializeManifest(buildManifest());
    expect(() => JSON.parse(json)).not.toThrow();
  });

  test('pretty-prints with 4-space indentation', () => {
    const json = serializeManifest({ a: 1 });
    expect(json).toContain('    "a"');
  });

  test('round-trips the default manifest', () => {
    const json = serializeManifest(DEFAULT_MANIFEST);
    expect(JSON.parse(json)).toEqual(DEFAULT_MANIFEST);
  });
});
