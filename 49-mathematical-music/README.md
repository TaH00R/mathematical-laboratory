# Mathematical Music

A musical tone can be assembled from a fundamental frequency and integer harmonics. Their relative amplitudes determine the waveform and its timbre, even when the perceived pitch stays the same.

## Try it

Press Play sound, then compare a gentle harmonic decay with a bright one. Adjust volume before increasing the number of harmonics.

Open `index.html` directly or serve the repository root. Presets change model parameters; Restart starts a new run with current parameters. View & playback contains display settings, speed and Restore defaults. Save PNG exports the current canvas. Sound, where available, starts only after pressing Play sound.

## Files

`script.js` owns this experiment's model, controls, presets and explanatory copy. `index.html` and `style.css` own its page. Only numerical helpers (`../shared/math.js`) and common canvas / control primitives (`../shared/lab.js`) are shared. No other experiment's implementation is loaded.

Formula: s(t) = Σₖ sin(2πkf₀t)/kᵅ
