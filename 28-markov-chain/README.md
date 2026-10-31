# Markov Chain Universe

A Markov chain chooses its next state using only its current state. This three-state chain can favor staying, moving clockwise or moving counterclockwise.

## Try it

Increase the chance of staying, then favor clockwise motion. The transition paths change while the long-run uniform distribution remains stationary.

Open `index.html` directly or serve the repository root. Presets change model parameters; Restart starts a new run with current parameters. View & playback contains display settings, speed and Restore defaults. Save PNG exports the current canvas. Sound, where available, starts only after pressing Play sound.

## Files

`script.js` owns this experiment's model, controls, presets and explanatory copy. `index.html` and `style.css` own its page. Only numerical helpers (`../shared/math.js`) and common canvas / control primitives (`../shared/lab.js`) are shared. No other experiment's implementation is loaded.

Formula: Pᵢᵢ=s; Pᵢ,ᵢ₊₁=(1−s)q; Pᵢ,ᵢ₊₂=(1−s)(1−q)
