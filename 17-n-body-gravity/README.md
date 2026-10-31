# N-Body Gravity

Every body attracts every other body through Newtonian gravity. A small softening term prevents nearly coincident bodies from producing infinite numerical accelerations.

## Try it

Try a faster starting orbit, then increase gravity. Watch whether the group expands, forms temporary pairs or collapses inward.

Open `index.html` directly or serve the repository root. Presets change model parameters; Restart starts a new run with current parameters. View & playback contains display settings, speed and Restore defaults. Save PNG exports the current canvas. Sound, where available, starts only after pressing Play sound.

## Files

`script.js` owns this experiment's model, controls, presets and explanatory copy. `index.html` and `style.css` own its page. Only numerical helpers (`../shared/math.js`) and common canvas / control primitives (`../shared/lab.js`) are shared. No other experiment's implementation is loaded.

Formula: aᵢ = G Σⱼ (rⱼ−rᵢ)/(‖rⱼ−rᵢ‖²+ε²)³ᐟ²
