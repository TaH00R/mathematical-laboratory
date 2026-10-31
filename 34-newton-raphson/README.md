# Newton-Raphson

Newton–Raphson follows a tangent line to its x-axis intercept, then repeats. Here it finds the positive square root of a configurable target.

## Try it

Try an initial guess close to zero and compare its first jump with a guess near the root. Step through the tangent construction.

Open `index.html` directly or serve the repository root. Presets change model parameters; Restart starts a new run with current parameters. View & playback contains display settings, speed and Restore defaults. Save PNG exports the current canvas. Sound, where available, starts only after pressing Play sound.

## Files

`script.js` owns this experiment's model, controls, presets and explanatory copy. `index.html` and `style.css` own its page. Only numerical helpers (`../shared/math.js`) and common canvas / control primitives (`../shared/lab.js`) are shared. No other experiment's implementation is loaded.

Formula: xₙ₊₁ = xₙ − (xₙ²−a)/(2xₙ)
