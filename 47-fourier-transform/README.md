# Fourier Transform

The discrete Fourier transform decomposes a finite sampled signal into frequency bins. A sum of two sine waves appears as two pairs of peaks, with heights determined by their amplitudes.

## Try it

Move the two frequencies together, then change the second amplitude. When both frequencies coincide, their contributions add in the same bin.

Open `index.html` directly or serve the repository root. Presets change model parameters; Restart starts a new run with current parameters. View & playback contains display settings, speed and Restore defaults. Save PNG exports the current canvas. Sound, where available, starts only after pressing Play sound.

## Files

`script.js` owns this experiment's model, controls, presets and explanatory copy. `index.html` and `style.css` own its page. Only numerical helpers (`../shared/math.js`) and common canvas / control primitives (`../shared/lab.js`) are shared. No other experiment's implementation is loaded.

Formula: Xₖ = Σₙ xₙ exp(−2πikn/N)
