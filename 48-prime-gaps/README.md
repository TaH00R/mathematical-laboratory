# Prime Gaps

A prime gap is the distance between consecutive primes. The gaps vary irregularly, with occasional much larger spaces between neighboring primes.

## Try it

Increase the number range and switch from a connected line to individual gap bars to compare local variation with record gaps.

Open `index.html` directly or serve the repository root. Presets change model parameters; Restart starts a new run with current parameters. View & playback contains display settings, speed and Restore defaults. Save PNG exports the current canvas. Sound, where available, starts only after pressing Play sound.

## Files

`script.js` owns this experiment's model, controls, presets and explanatory copy. `index.html` and `style.css` own its page. Only numerical helpers (`../shared/math.js`) and common canvas / control primitives (`../shared/lab.js`) are shared. No other experiment's implementation is loaded.

Formula: gₙ = pₙ₊₁ − pₙ
