# Traveling Salesman

The traveling-salesman problem asks for the shortest closed route visiting every city. A nearest-neighbor route supplies a starting guess, and 2-opt repeatedly removes avoidable edge crossings.

## Try it

Start with many cities and step through route improvements. Increase the search budget to try more edge swaps per update.

Open `index.html` directly or serve the repository root. Presets change model parameters; Restart starts a new run with current parameters. View & playback contains display settings, speed and Restore defaults. Save PNG exports the current canvas. Sound, where available, starts only after pressing Play sound.

## Files

`script.js` owns this experiment's model, controls, presets and explanatory copy. `index.html` and `style.css` own its page. Only numerical helpers (`../shared/math.js`) and common canvas / control primitives (`../shared/lab.js`) are shared. No other experiment's implementation is loaded.

Formula: Tour length = Σ ‖pᵢ₊₁−pᵢ‖; the last edge returns to the start.
