# Numerical Methods Race

Euler, midpoint and fourth-order Runge–Kutta approximate the same differential equation. Comparing them against the exact exponential solution shows how numerical error depends on the step size.

## Try it

Use just a few steps, then double the count. Extend the time horizon to make accumulated error more visible.

Open `index.html` directly or serve the repository root. Presets change model parameters; Restart starts a new run with current parameters. View & playback contains display settings, speed and Restore defaults. Save PNG exports the current canvas. Sound, where available, starts only after pressing Play sound.

## Files

`script.js` owns this experiment's model, controls, presets and explanatory copy. `index.html` and `style.css` own its page. Only numerical helpers (`../shared/math.js`) and common canvas / control primitives (`../shared/lab.js`) are shared. No other experiment's implementation is loaded.

Formula: y′ = y,  y(0)=1  ⇒  y(t)=eᵗ
