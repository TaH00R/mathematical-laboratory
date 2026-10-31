# Integration Race

Quadrature rules approximate the same definite integral using different local models. Comparing their absolute errors shows how sample count and function shape affect convergence.

## Try it

Compare the quartic with a sine wave. Increase intervals and observe how the higher-order Simpson estimate converges faster for these smooth functions.

Open `index.html` directly or serve the repository root. Presets change model parameters; Restart starts a new run with current parameters. View & playback contains display settings, speed and Restore defaults. Save PNG exports the current canvas. Sound, where available, starts only after pressing Play sound.

## Files

`script.js` owns this experiment's model, controls, presets and explanatory copy. `index.html` and `style.css` own its page. Only numerical helpers (`../shared/math.js`) and common canvas / control primitives (`../shared/lab.js`) are shared. No other experiment's implementation is loaded.

Formula: Compare ∫₀² f(x) dx using left, midpoint, trapezoid and Simpson rules.
