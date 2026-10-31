# Integral Builder

Numerical integration replaces an area under a curve with simpler shapes. Left rectangles, midpoint rectangles, trapezoids and quadratic Simpson panels give different errors for the same interval count.

## Try it

Use a coarse left sum, then switch to midpoint and Simpson. Change the interval endpoint to compare the signed area on either side of zero.

Open `index.html` directly or serve the repository root. Presets change model parameters; Restart starts a new run with current parameters. View & playback contains display settings, speed and Restore defaults. Save PNG exports the current canvas. Sound, where available, starts only after pressing Play sound.

## Files

`script.js` owns this experiment's model, controls, presets and explanatory copy. `index.html` and `style.css` own its page. Only numerical helpers (`../shared/math.js`) and common canvas / control primitives (`../shared/lab.js`) are shared. No other experiment's implementation is loaded.

Formula: ∫₀ᵇ x² dx = b³/3
