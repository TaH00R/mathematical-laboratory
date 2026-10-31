# Voronoi Universe

A Voronoi diagram assigns each location to its closest seed. Moving a seed changes the boundaries between territories; choosing a different distance metric changes what “closest” means.

## Try it

Drag a seed toward its neighbor, then switch from Euclidean distance to Manhattan distance to produce angular territories.

Open `index.html` directly or serve the repository root. Presets change model parameters; Restart starts a new run with current parameters. View & playback contains display settings, speed and Restore defaults. Save PNG exports the current canvas. Sound, where available, starts only after pressing Play sound.

## Files

`script.js` owns this experiment's model, controls, presets and explanatory copy. `index.html` and `style.css` own its page. Only numerical helpers (`../shared/math.js`) and common canvas / control primitives (`../shared/lab.js`) are shared. No other experiment's implementation is loaded.

Formula: Vᵢ = {x : d(x,pᵢ) ≤ d(x,pⱼ) for all j}
