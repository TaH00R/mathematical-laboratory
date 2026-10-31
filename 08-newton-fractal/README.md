# Newton Fractal

Newton’s method can find complex roots as well as real ones. Each starting point is colored by the root it approaches; intricate boundaries separate different basins of attraction.

## Try it

Compare three roots with five roots. Lower relaxation to see slower convergence, and raise the iteration budget to resolve the basin edges.

Open `index.html` directly or serve the repository root. Presets change model parameters; Restart starts a new run with current parameters. View & playback contains display settings, speed and Restore defaults. Save PNG exports the current canvas. Sound, where available, starts only after pressing Play sound.

## Files

`script.js` owns this experiment's model, controls, presets and explanatory copy. `index.html` and `style.css` own its page. Only numerical helpers (`../shared/math.js`) and common canvas / control primitives (`../shared/lab.js`) are shared. No other experiment's implementation is loaded.

Formula: zₙ₊₁ = zₙ − α(zₙᵈ−1)/(d zₙᵈ⁻¹)
