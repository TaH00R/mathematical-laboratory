# Mathematical Universe

Phyllotaxis places points at steadily increasing radii and a fixed divergence angle. Angles near the golden angle spread points evenly; nearby rational fractions of a turn create visible spokes.

## Try it

Compare the golden-angle preset with 135 degrees. Increase point size to make the change from even packing to spokes easier to inspect.

Open `index.html` directly or serve the repository root. Presets change model parameters; Restart starts a new run with current parameters. View & playback contains display settings, speed and Restore defaults. Save PNG exports the current canvas. Sound, where available, starts only after pressing Play sound.

## Files

`script.js` owns this experiment's model, controls, presets and explanatory copy. `index.html` and `style.css` own its page. Only numerical helpers (`../shared/math.js`) and common canvas / control primitives (`../shared/lab.js`) are shared. No other experiment's implementation is loaded.

Formula: rₙ = √(n/N),  θₙ = nα; golden angle ≈ 137.507°
