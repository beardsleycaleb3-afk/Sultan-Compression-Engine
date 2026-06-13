const {
  SULTAN_SYMBOLS,
  ROTATIONAL_CODES,
  PIVOT_CODES,
  lookupSymbol,
  isRotational,
  isPivot,
  classifyHex,
} = require('../src/symbols');

describe('SULTAN_SYMBOLS table', () => {
  test('contains exactly 11 entries', () => {
    expect(Object.keys(SULTAN_SYMBOLS)).toHaveLength(11);
  });

  test.each([
    [0x71, 'q'],
    [0x64, 'd'],
    [0x62, 'b'],
    [0x70, 'p'],
    [0x49, 'I'],
    [0x48, 'H'],
    [0x21, '!'],
    [0x69, 'i'],
    [0x30, '0'],
    [0x31, '1'],
    [0x38, '8'],
  ])('maps 0x%s → %s', (hex, expected) => {
    expect(SULTAN_SYMBOLS[hex]).toBe(expected);
  });
});

describe('lookupSymbol', () => {
  test('returns correct symbol for known hex values', () => {
    expect(lookupSymbol(0x71)).toBe('q');
    expect(lookupSymbol(0x48)).toBe('H');
    expect(lookupSymbol(0x38)).toBe('8');
  });

  test('returns "?" for unknown hex values', () => {
    expect(lookupSymbol(0xff)).toBe('?');
    expect(lookupSymbol(0x00)).toBe('?');
    expect(lookupSymbol(999)).toBe('?');
  });
});

describe('isRotational', () => {
  test('returns true for qdbp hex codes', () => {
    ROTATIONAL_CODES.forEach((code) => {
      expect(isRotational(code)).toBe(true);
    });
  });

  test('returns false for non-rotational codes', () => {
    expect(isRotational(0x49)).toBe(false);
    expect(isRotational(0x30)).toBe(false);
    expect(isRotational(0xff)).toBe(false);
  });
});

describe('isPivot', () => {
  test('returns true for IH hex codes', () => {
    PIVOT_CODES.forEach((code) => {
      expect(isPivot(code)).toBe(true);
    });
  });

  test('returns false for non-pivot codes', () => {
    expect(isPivot(0x71)).toBe(false);
    expect(isPivot(0x30)).toBe(false);
  });
});

describe('classifyHex', () => {
  test('classifies rotational codes', () => {
    expect(classifyHex(0x71)).toBe('rotational');
    expect(classifyHex(0x64)).toBe('rotational');
    expect(classifyHex(0x62)).toBe('rotational');
    expect(classifyHex(0x70)).toBe('rotational');
  });

  test('classifies pivotal codes', () => {
    expect(classifyHex(0x49)).toBe('pivotal');
    expect(classifyHex(0x48)).toBe('pivotal');
  });

  test('classifies core codes (pulse + numerics)', () => {
    expect(classifyHex(0x21)).toBe('core');
    expect(classifyHex(0x69)).toBe('core');
    expect(classifyHex(0x30)).toBe('core');
    expect(classifyHex(0x31)).toBe('core');
    expect(classifyHex(0x38)).toBe('core');
  });

  test('returns "unknown" for unmapped codes', () => {
    expect(classifyHex(0xff)).toBe('unknown');
    expect(classifyHex(0x00)).toBe('unknown');
  });
});
