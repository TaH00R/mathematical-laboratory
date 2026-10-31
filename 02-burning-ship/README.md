# Burning Ship Fractal

The Burning Ship repeats a complex quadratic map after taking the absolute values of both coordinates. Points that escape receive a color based on how long they remain bounded.

## Try it

Increase detail near the edge, then shift the palette to reveal bands with similar escape times.

Open `index.html` directly or serve the repository root. Presets change model parameters; Restart starts a new run with current parameters. View & playback contains display settings, speed and Restore defaults. Save PNG exports the current canvas. Sound, where available, starts only after pressing Play sound.

## Files

`script.js` owns this experiment's model, controls, presets and explanatory copy. `index.html` and `style.css` own its page. Only numerical helpers (`../shared/math.js`) and common canvas / control primitives (`../shared/lab.js`) are shared. No other experiment's implementation is loaded.

Formula: zₙ₊₁ = (|Re zₙ| + i|Im zₙ|)² + c
