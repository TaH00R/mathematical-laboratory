# Penrose Tiling

Penrose tilings use a small set of tiles to form patterns that never repeat by translation. This finite patch subdivides golden-ratio Robinson triangles while preserving fivefold structure.

## Try it

Increase subdivision depth to reveal smaller tiles. Hide outlines to focus on the interlocking regions of the two triangle types.

Open `index.html` directly or serve the repository root. Presets change model parameters; Restart starts a new run with current parameters. View & playback contains display settings, speed and Restore defaults. Save PNG exports the current canvas. Sound, where available, starts only after pressing Play sound.

## Files

`script.js` owns this experiment's model, controls, presets and explanatory copy. `index.html` and `style.css` own its page. Only numerical helpers (`../shared/math.js`) and common canvas / control primitives (`../shared/lab.js`) are shared. No other experiment's implementation is loaded.

Formula: φ = (1+√5)/2; subdivision divides edges in the ratio φ.

Reference: [Penrose Tiling Explained](https://preshing.com/20110831/penrose-tiling-explained/).
