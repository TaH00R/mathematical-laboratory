# Taylor Series

A Taylor polynomial builds a local approximation from a function’s derivatives at an expansion point. More terms usually improve the approximation near that point before extending its useful range.

## Try it

Move the expansion point away from zero and watch where the polynomial follows the sine curve. Add terms to widen that region.

Open `index.html` directly or serve the repository root. Presets change model parameters; Restart starts a new run with current parameters. View & playback contains display settings, speed and Restore defaults. Save PNG exports the current canvas. Sound, where available, starts only after pressing Play sound.

## Files

`script.js` owns this experiment's model, controls, presets and explanatory copy. `index.html` and `style.css` own its page. Only numerical helpers (`../shared/math.js`) and common canvas / control primitives (`../shared/lab.js`) are shared. No other experiment's implementation is loaded.

Formula: sin(x) ≈ Σ sin(a+kπ/2)(x−a)ᵏ/k!
