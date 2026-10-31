# Buffon’s Needle → π

Buffon’s needle estimates π by dropping short needles onto parallel lines. A crossing depends on both the needle’s position and its random orientation.

## Try it

Compare short needles with needles as long as the line spacing. Increase the batch size to see the estimate stabilize faster.

Open `index.html` directly or serve the repository root. Presets change model parameters; Restart starts a new run with current parameters. View & playback contains display settings, speed and Restore defaults. Save PNG exports the current canvas. Sound, where available, starts only after pressing Play sound.

## Files

`script.js` owns this experiment's model, controls, presets and explanatory copy. `index.html` and `style.css` own its page. Only numerical helpers (`../shared/math.js`) and common canvas / control primitives (`../shared/lab.js`) are shared. No other experiment's implementation is loaded.

Formula: π ≈ 2LN/(D·crossings),  for L ≤ D
