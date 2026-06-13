/**
 * Sultan-v88 Symbol Table
 *
 * Maps hex byte values to their Sultan opcode characters.
 * Used by the verification engine to decode data streams.
 */

const SULTAN_SYMBOLS = {
  0x71: 'q', // qdbp rotational gate
  0x64: 'd',
  0x62: 'b',
  0x70: 'p',
  0x49: 'I', // IH 90-degree pivot
  0x48: 'H',
  0x21: '!', // pulse
  0x69: 'i',
  0x30: '0', // core numerics
  0x31: '1',
  0x38: '8',
};

const ROTATIONAL_CODES = [0x71, 0x64, 0x62, 0x70];
const PIVOT_CODES = [0x49, 0x48];

function lookupSymbol(hex) {
  return SULTAN_SYMBOLS[hex] || '?';
}

function isRotational(hex) {
  return ROTATIONAL_CODES.includes(hex);
}

function isPivot(hex) {
  return PIVOT_CODES.includes(hex);
}

function classifyHex(hex) {
  if (isRotational(hex)) return 'rotational';
  if (isPivot(hex)) return 'pivotal';
  if (hex in SULTAN_SYMBOLS) return 'core';
  return 'unknown';
}

module.exports = {
  SULTAN_SYMBOLS,
  ROTATIONAL_CODES,
  PIVOT_CODES,
  lookupSymbol,
  isRotational,
  isPivot,
  classifyHex,
};
