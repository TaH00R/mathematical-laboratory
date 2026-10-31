# Random Walk → Diffusion

Independent random steps create diffusion: individual paths are unpredictable, but the average squared distance grows linearly with the number of steps.

## Try it

Increase the step length and compare how quickly the cloud spreads. More walkers make the measured average steadier.

Open `index.html` directly or serve the repository root. Presets change model parameters; Restart starts a new run with current parameters. View & playback contains display settings, speed and Restore defaults. Save PNG exports the current canvas. Sound, where available, starts only after pressing Play sound.

## Files

`script.js` owns this experiment's model, controls, presets and explanatory copy. `index.html` and `style.css` own its page. Only numerical helpers (`../shared/math.js`) and common canvas / control primitives (`../shared/lab.js`) are shared. No other experiment's implementation is loaded.

Formula: E[‖rₙ‖²] = nℓ² for unbiased fixed-length steps
