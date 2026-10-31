# Sphere Projections

A sphere cannot be flattened without distortion. Orthographic projection resembles a distant view of a globe, while stereographic projection preserves local angles but stretches regions near the projection pole.

## Try it

Switch projection and drag to rotate. Use a denser graticule to compare how the same latitude circles appear on the plane.

Open `index.html` directly or serve the repository root. Presets change model parameters; Restart starts a new run with current parameters. View & playback contains display settings, speed and Restore defaults. Save PNG exports the current canvas. Sound, where available, starts only after pressing Play sound.

## Files

`script.js` owns this experiment's model, controls, presets and explanatory copy. `index.html` and `style.css` own its page. Only numerical helpers (`../shared/math.js`) and common canvas / control primitives (`../shared/lab.js`) are shared. No other experiment's implementation is loaded.

Formula: Orthographic: (x,y); stereographic: (x,y)/(1−z)
