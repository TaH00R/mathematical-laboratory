# Monte Carlo Universe

Monte Carlo estimation uses random samples to compare areas. The fraction of square samples inside a circle estimates its area, and therefore π.

## Try it

Use a smaller circle and compare the noisier estimate. A larger batch size gathers evidence faster without changing the theoretical answer.

Open `index.html` directly or serve the repository root. Presets change model parameters; Restart starts a new run with current parameters. View & playback contains display settings, speed and Restore defaults. Save PNG exports the current canvas. Sound, where available, starts only after pressing Play sound.

## Files

`script.js` owns this experiment's model, controls, presets and explanatory copy. `index.html` and `style.css` own its page. Only numerical helpers (`../shared/math.js`) and common canvas / control primitives (`../shared/lab.js`) are shared. No other experiment's implementation is loaded.

Formula: π ≈ 4·inside/(N r²),  for a circle of radius r ≤ 1
