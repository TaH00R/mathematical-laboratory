# Collatz 3D Landscape

The Collatz process halves even integers and replaces odd integers with 3n+1. Each trajectory here is lifted into a landscape by its logarithmic value; the general conjecture remains unproved.

## Try it

Increase the starting range to include 27, whose trajectory rises much higher than nearby starting values. Drag to rotate the paths.

Open `index.html` directly or serve the repository root. Presets change model parameters; Restart starts a new run with current parameters. View & playback contains display settings, speed and Restore defaults. Save PNG exports the current canvas. Sound, where available, starts only after pressing Play sound.

## Files

`script.js` owns this experiment's model, controls, presets and explanatory copy. `index.html` and `style.css` own its page. Only numerical helpers (`../shared/math.js`) and common canvas / control primitives (`../shared/lab.js`) are shared. No other experiment's implementation is loaded.

Formula: T(n) = n/2 if n is even; otherwise 3n+1
