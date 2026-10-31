# Bézier Curves

A cubic Bézier curve blends four control points. De Casteljau’s construction repeatedly interpolates between neighboring points to locate the curve at a chosen parameter.

## Try it

Drag the middle control points and scrub t. Hide the construction lines to inspect the finished curve by itself.

Open `index.html` directly or serve the repository root. Presets change model parameters; Restart starts a new run with current parameters. View & playback contains display settings, speed and Restore defaults. Save PNG exports the current canvas. Sound, where available, starts only after pressing Play sound.

## Files

`script.js` owns this experiment's model, controls, presets and explanatory copy. `index.html` and `style.css` own its page. Only numerical helpers (`../shared/math.js`) and common canvas / control primitives (`../shared/lab.js`) are shared. No other experiment's implementation is loaded.

Formula: B(t) = (1−t)³P₀+3(1−t)²tP₁+3(1−t)t²P₂+t³P₃
