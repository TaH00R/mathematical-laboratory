# Matrix Transformations

A matrix can rotate, shear and scale the plane. The transformed grid shows where basis directions move, while the determinant measures the factor by which areas change.

## Try it

Start with a pure rotation, then add shear. Change grid spacing to inspect the transformed unit square more clearly.

Open `index.html` directly or serve the repository root. Presets change model parameters; Restart starts a new run with current parameters. View & playback contains display settings, speed and Restore defaults. Save PNG exports the current canvas. Sound, where available, starts only after pressing Play sound.

## Files

`script.js` owns this experiment's model, controls, presets and explanatory copy. `index.html` and `style.css` own its page. Only numerical helpers (`../shared/math.js`) and common canvas / control primitives (`../shared/lab.js`) are shared. No other experiment's implementation is loaded.

Formula: A = scale · shear · rotation;  det(A)=scale²
