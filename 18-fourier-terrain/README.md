# Fourier Terrain

Fourier terrain adds spatial waves with different frequencies. Higher harmonics add fine detail; decreasing their amplitudes more rapidly makes the surface smoother.

## Try it

Compare a few smooth waves with a rough twelve-harmonic surface. Drag to rotate and use height to exaggerate the relief.

Open `index.html` directly or serve the repository root. Presets change model parameters; Restart starts a new run with current parameters. View & playback contains display settings, speed and Restore defaults. Save PNG exports the current canvas. Sound, where available, starts only after pressing Play sound.

## Files

`script.js` owns this experiment's model, controls, presets and explanatory copy. `index.html` and `style.css` own its page. Only numerical helpers (`../shared/math.js`) and common canvas / control primitives (`../shared/lab.js`) are shared. No other experiment's implementation is loaded.

Formula: h(x,z) = Σ sin(3kx+0.6k)cos(2kz)/k¹⁺ʳ
