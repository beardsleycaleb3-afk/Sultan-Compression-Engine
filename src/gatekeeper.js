/**
 * Sultan-v88 Input Gatekeeper
 *
 * Determines whether a browser event should be blocked based on the
 * toggle state. Extracted from demo.html so the decision logic can
 * be unit-tested without a real DOM.
 */

const BLOCKED_PREFIXES = ['key', 'mouse'];

function shouldBlockEvent(eventType, isToggleChecked) {
  if (isToggleChecked) return false;
  return BLOCKED_PREFIXES.some((prefix) => eventType.startsWith(prefix));
}

function listBlockedEventTypes() {
  return [
    'keydown', 'keyup', 'keypress',
    'mousedown', 'mouseup', 'mousemove', 'mouseenter', 'mouseleave', 'click',
  ];
}

module.exports = {
  BLOCKED_PREFIXES,
  shouldBlockEvent,
  listBlockedEventTypes,
};
