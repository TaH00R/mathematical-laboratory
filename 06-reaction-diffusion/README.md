# Reaction-Diffusion

In the Gray–Scott model, two chemicals diffuse at different rates while reacting with each other. Feeding one chemical and removing the other produces spots, branching patterns and moving boundaries.

## Try it

Try the spots preset, then tap the field to add a new seed. Change diffusion to compare how quickly neighboring regions mix.

Open `index.html` directly or serve the repository root. Presets change model parameters; Restart starts a new run with current parameters. View & playback contains display settings, speed and Restore defaults. Save PNG exports the current canvas. Sound, where available, starts only after pressing Play sound.

## Files

`script.js` owns this experiment's model, controls, presets and explanatory copy. `index.html` and `style.css` own its page. Only numerical helpers (`../shared/math.js`) and common canvas / control primitives (`../shared/lab.js`) are shared. No other experiment's implementation is loaded.

Formula: ∂u/∂t = Dᵤ∇²u − uv² + f(1−u)
