# Convex Hull

The convex hull is the smallest convex polygon containing every point. Interior points do not affect its boundary until moved outside the current hull.

## Try it

Compare a cloud with points placed on a circle. Drag an interior point past the boundary, or tap empty space to add a new point.

Open `index.html` directly or serve the repository root. Presets change model parameters; Restart starts a new run with current parameters. View & playback contains display settings, speed and Restore defaults. Save PNG exports the current canvas. Sound, where available, starts only after pressing Play sound.

## Files

`script.js` owns this experiment's model, controls, presets and explanatory copy. `index.html` and `style.css` own its page. Only numerical helpers (`../shared/math.js`) and common canvas / control primitives (`../shared/lab.js`) are shared. No other experiment's implementation is loaded.

Formula: Every point lies on or inside the hull’s supporting edges.
