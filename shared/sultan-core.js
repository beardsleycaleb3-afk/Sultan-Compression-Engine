/**
 * Sultan-v88 Shared Core Utilities
 *
 * Constants, logging, canvas helpers, and download logic used by both
 * the verification engine (index.html) and the mobile demo (demo.html).
 */

// ── Constants ────────────────────────────────────────────────────────

const SULTAN_SYMBOLS = {
    0x71: 'q', 0x64: 'd', 0x62: 'b', 0x70: 'p', // The Flips
    0x49: 'I', 0x48: 'H',                         // The 90° Pivot
    0x21: '!', 0x69: 'i',                          // The Pulse
    0x30: '0', 0x31: '1', 0x38: '8'                // The Core
};

const SULTAN_CONFIG = {
    engine:   "Sultan-v88",
    arch:     "DBM Triple-Split",
    entry:    ".go",
    gates:    ["qdbp", "IH-90", "unnu", "mwwm"],
    memMap:   "64KB_Symmetry_Bus",
    ratio:    "3000:1",
    seal:     "8oOOo8",
    origin:   "018810",
    shannonBypass: true
};

const FLIP_HEX_CODES = [0x71, 0x64, 0x62, 0x70];
const PIVOT_HEX_CODES = [0x49, 0x48];

// ── Logging ──────────────────────────────────────────────────────────

function createLogger(consoleEl) {
    if (typeof consoleEl === 'string') {
        consoleEl = document.getElementById(consoleEl);
    }
    if (!consoleEl) {
        console.error('[Sultan-v88] Console element not found — logging to browser console only');
        return function log(msg) { console.log('[Sultan-v88]', msg); };
    }
    return function log(msg) {
        consoleEl.innerHTML += `> ${msg}<br>`;
        consoleEl.scrollTop = consoleEl.scrollHeight;
    };
}

function logError(log, msg, err) {
    var detail = err ? ' [' + err.name + ': ' + err.message + ']' : '';
    log('ERROR: ' + msg + detail);
    console.error('[Sultan-v88] ' + msg, err || '');
}

// ── Canvas ───────────────────────────────────────────────────────────

function initCanvas(canvasId, strokeColor) {
    strokeColor = strokeColor || '#00FF41';
    var canvas = document.getElementById(canvasId);
    if (!canvas) {
        throw new Error('Canvas element "' + canvasId + '" not found in DOM');
    }
    var ctx = canvas.getContext('2d');
    if (!ctx) {
        throw new Error('Unable to acquire 2D rendering context from canvas "' + canvasId + '"');
    }
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth   = 1;
    return { canvas: canvas, ctx: ctx };
}

// ── Download ─────────────────────────────────────────────────────────

function downloadJSON(data, filename) {
    try {
        var blob = new Blob(
            [JSON.stringify(data, null, 4)],
            { type: 'application/json' }
        );
        var url = URL.createObjectURL(blob);
        var a   = document.createElement('a');
        a.href     = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    } catch (err) {
        console.error('[Sultan-v88] Failed to download "' + filename + '"', err);
        throw err;
    }
}
