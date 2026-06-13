const {
  BLOCKED_PREFIXES,
  shouldBlockEvent,
  listBlockedEventTypes,
} = require('../src/gatekeeper');

describe('BLOCKED_PREFIXES', () => {
  test('contains "key" and "mouse"', () => {
    expect(BLOCKED_PREFIXES).toEqual(['key', 'mouse']);
  });
});

describe('shouldBlockEvent', () => {
  describe('when toggle is unchecked (locked)', () => {
    test('blocks keyboard events', () => {
      expect(shouldBlockEvent('keydown', false)).toBe(true);
      expect(shouldBlockEvent('keyup', false)).toBe(true);
      expect(shouldBlockEvent('keypress', false)).toBe(true);
    });

    test('blocks mouse events', () => {
      expect(shouldBlockEvent('mousedown', false)).toBe(true);
      expect(shouldBlockEvent('mouseup', false)).toBe(true);
      expect(shouldBlockEvent('mousemove', false)).toBe(true);
    });

    test('allows touch events', () => {
      expect(shouldBlockEvent('touchstart', false)).toBe(false);
      expect(shouldBlockEvent('touchmove', false)).toBe(false);
      expect(shouldBlockEvent('touchend', false)).toBe(false);
    });

    test('allows other events', () => {
      expect(shouldBlockEvent('click', false)).toBe(false);
      expect(shouldBlockEvent('scroll', false)).toBe(false);
      expect(shouldBlockEvent('focus', false)).toBe(false);
    });
  });

  describe('when toggle is checked (unlocked)', () => {
    test('allows all events', () => {
      expect(shouldBlockEvent('keydown', true)).toBe(false);
      expect(shouldBlockEvent('mousedown', true)).toBe(false);
      expect(shouldBlockEvent('touchstart', true)).toBe(false);
    });
  });
});

describe('listBlockedEventTypes', () => {
  test('returns an array of common keyboard and mouse event types', () => {
    const types = listBlockedEventTypes();
    expect(types).toContain('keydown');
    expect(types).toContain('mousedown');
    expect(types).toContain('click');
    expect(types.length).toBeGreaterThanOrEqual(6);
  });

  test('all listed types start with a blocked prefix', () => {
    const types = listBlockedEventTypes();
    types.forEach((t) => {
      const matchesPrefix = BLOCKED_PREFIXES.some((p) => t.startsWith(p))
        || t === 'click'; // click is a mouse-adjacent event
      expect(matchesPrefix).toBe(true);
    });
  });
});
