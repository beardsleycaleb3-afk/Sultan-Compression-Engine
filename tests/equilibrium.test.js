const {
  EQUILIBRIUM_MAP,
  INSTRUCTION_SET,
  isSymmetric,
  getEquilibriumAtIndex,
  getPeakIndex,
  classifyInstruction,
  getAllInstructions,
} = require('../src/equilibrium');

describe('EQUILIBRIUM_MAP', () => {
  test('has 9 entries', () => {
    expect(EQUILIBRIUM_MAP).toHaveLength(9);
  });

  test('starts and ends with "o"', () => {
    expect(EQUILIBRIUM_MAP[0]).toBe('o');
    expect(EQUILIBRIUM_MAP[EQUILIBRIUM_MAP.length - 1]).toBe('o');
  });

  test('peak entry is "oO0011001"', () => {
    expect(EQUILIBRIUM_MAP[4]).toBe('oO0011001');
  });
});

describe('isSymmetric', () => {
  test('returns true — the map is a palindrome', () => {
    expect(isSymmetric()).toBe(true);
  });
});

describe('getEquilibriumAtIndex', () => {
  test('returns correct entry for valid indices', () => {
    expect(getEquilibriumAtIndex(0)).toBe('o');
    expect(getEquilibriumAtIndex(4)).toBe('oO0011001');
    expect(getEquilibriumAtIndex(8)).toBe('o');
  });

  test('returns null for out-of-range indices', () => {
    expect(getEquilibriumAtIndex(-1)).toBeNull();
    expect(getEquilibriumAtIndex(9)).toBeNull();
    expect(getEquilibriumAtIndex(100)).toBeNull();
  });
});

describe('getPeakIndex', () => {
  test('returns index 4 (the longest entry)', () => {
    expect(getPeakIndex()).toBe(4);
  });
});

describe('INSTRUCTION_SET', () => {
  test('rotational contains q, d, b, p', () => {
    expect(INSTRUCTION_SET.rotational).toEqual(['q', 'd', 'b', 'p']);
  });

  test('pivotal contains I, H', () => {
    expect(INSTRUCTION_SET.pivotal).toEqual(['I', 'H']);
  });

  test('vibrational contains u, n, m, w', () => {
    expect(INSTRUCTION_SET.vibrational).toEqual(['u', 'n', 'm', 'w']);
  });
});

describe('classifyInstruction', () => {
  test('classifies rotational chars', () => {
    ['q', 'd', 'b', 'p'].forEach((ch) => {
      expect(classifyInstruction(ch)).toBe('rotational');
    });
  });

  test('classifies pivotal chars', () => {
    ['I', 'H'].forEach((ch) => {
      expect(classifyInstruction(ch)).toBe('pivotal');
    });
  });

  test('classifies vibrational chars', () => {
    ['u', 'n', 'm', 'w'].forEach((ch) => {
      expect(classifyInstruction(ch)).toBe('vibrational');
    });
  });

  test('returns "unknown" for unrecognized chars', () => {
    expect(classifyInstruction('z')).toBe('unknown');
    expect(classifyInstruction('0')).toBe('unknown');
  });
});

describe('getAllInstructions', () => {
  test('returns all 10 instruction characters', () => {
    const all = getAllInstructions();
    expect(all).toHaveLength(10);
    expect(all).toEqual(expect.arrayContaining(['q', 'd', 'b', 'p', 'I', 'H', 'u', 'n', 'm', 'w']));
  });
});
