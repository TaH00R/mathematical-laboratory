# Percolation

Site percolation randomly occupies cells of a grid. The green cluster contains occupied sites connected to the top; percolation occurs when that cluster reaches the bottom.

## Try it

Compare occupation probabilities below and above 0.59 with four-neighbor connectivity. Add diagonal connections and observe how crossing becomes easier.

Open `index.html` directly or serve the repository root. Presets change model parameters; Restart starts a new run with current parameters. View & playback contains display settings, speed and Restore defaults. Save PNG exports the current canvas. Sound, where available, starts only after pressing Play sound.

## Files

`script.js` owns this experiment's model, controls, presets and explanatory copy. `index.html` and `style.css` own its page. Only numerical helpers (`../shared/math.js`) and common canvas / control primitives (`../shared/lab.js`) are shared. No other experiment's implementation is loaded.

Formula: A crossing is an occupied path from top to bottom.
