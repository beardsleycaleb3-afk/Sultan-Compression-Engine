/**
 * Sultan-v88 Equilibrium Map
 *
 * Implements the 018810 mirror logic equilibrium sequence and
 * instruction-set classification from SULTAN_CORE_SPEC.json.
 */

const EQUILIBRIUM_MAP = [
  'o', 'oO0', 'oO001', 'oO00110', 'oO0011001',
  'oO00110', 'oO001', 'oO0', 'o',
];

const INSTRUCTION_SET = {
  rotational: ['q', 'd', 'b', 'p'],
  pivotal: ['I', 'H'],
  vibrational: ['u', 'n', 'm', 'w'],
};

function isSymmetric() {
  const len = EQUILIBRIUM_MAP.length;
  for (let i = 0; i < Math.floor(len / 2); i++) {
    if (EQUILIBRIUM_MAP[i] !== EQUILIBRIUM_MAP[len - 1 - i]) {
      return false;
    }
  }
  return true;
}

function getEquilibriumAtIndex(index) {
  if (index < 0 || index >= EQUILIBRIUM_MAP.length) return null;
  return EQUILIBRIUM_MAP[index];
}

function getPeakIndex() {
  let maxLen = 0;
  let peakIdx = 0;
  for (let i = 0; i < EQUILIBRIUM_MAP.length; i++) {
    if (EQUILIBRIUM_MAP[i].length > maxLen) {
      maxLen = EQUILIBRIUM_MAP[i].length;
      peakIdx = i;
    }
  }
  return peakIdx;
}

function classifyInstruction(char) {
  for (const [category, chars] of Object.entries(INSTRUCTION_SET)) {
    if (chars.includes(char)) return category;
  }
  return 'unknown';
}

function getAllInstructions() {
  return Object.values(INSTRUCTION_SET).flat();
}

module.exports = {
  EQUILIBRIUM_MAP,
  INSTRUCTION_SET,
  isSymmetric,
  getEquilibriumAtIndex,
  getPeakIndex,
  classifyInstruction,
  getAllInstructions,
};
