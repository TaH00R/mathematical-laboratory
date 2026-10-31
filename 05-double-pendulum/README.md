# Double Pendulum Chaos

Two connected pendulums exchange energy through gravity. A tiny difference in their initial angles can eventually separate their paths, even though both obey the same deterministic equations.

## Try it

Compare a small starting angle with an almost inverted pendulum. Increase the initial separation to see the two trails diverge sooner.

Open `index.html` directly or serve the repository root. Presets change model parameters; Restart starts a new run with current parameters. View & playback contains display settings, speed and Restore defaults. Save PNG exports the current canvas. Sound, where available, starts only after pressing Play sound.

## Files

`script.js` owns this experiment's model, controls, presets and explanatory copy. `index.html` and `style.css` own its page. Only numerical helpers (`../shared/math.js`) and common canvas / control primitives (`../shared/lab.js`) are shared. No other experiment's implementation is loaded.

Formula: θ̈ = F(θ₁, θ₂, θ̇₁, θ̇₂, g)
