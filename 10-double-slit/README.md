# Double-Slit Simulation

Light waves passing through two slits add together. Their interference fringes sit inside a broader single-slit diffraction envelope, so both slit spacing and slit width affect the screen pattern.

## Try it

Increase slit spacing to pack the bright fringes closer together. Increase slit width to narrow the surrounding envelope.

Open `index.html` directly or serve the repository root. Presets change model parameters; Restart starts a new run with current parameters. View & playback contains display settings, speed and Restore defaults. Save PNG exports the current canvas. Sound, where available, starts only after pressing Play sound.

## Files

`script.js` owns this experiment's model, controls, presets and explanatory copy. `index.html` and `style.css` own its page. Only numerical helpers (`../shared/math.js`) and common canvas / control primitives (`../shared/lab.js`) are shared. No other experiment's implementation is loaded.

Formula: I ∝ sinc²(πay/λL) · cos²(πdy/λL)
