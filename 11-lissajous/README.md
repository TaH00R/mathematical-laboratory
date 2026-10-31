# Lissajous Galaxy

A Lissajous figure combines two perpendicular oscillations. Frequency ratios control the number of lobes, while phase and amplitude change the shape and symmetry.

## Try it

Start with equal frequencies, then choose a 3:4 ratio. Slide phase through a full turn while watching the moving point.

Open `index.html` directly or serve the repository root. Presets change model parameters; Restart starts a new run with current parameters. View & playback contains display settings, speed and Restore defaults. Save PNG exports the current canvas. Sound, where available, starts only after pressing Play sound.

## Files

`script.js` owns this experiment's model, controls, presets and explanatory copy. `index.html` and `style.css` own its page. Only numerical helpers (`../shared/math.js`) and common canvas / control primitives (`../shared/lab.js`) are shared. No other experiment's implementation is loaded.

Formula: x = sin(at + φ),  y = A sin(bt)
