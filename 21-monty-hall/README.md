# Monty Hall

You first choose one door. A host who knows the prize location opens all but one of the other doors, revealing goats; switching wins whenever your original choice was wrong.

## Try it

Compare three doors with ten doors. The informed host removes the same kind of uncertainty, making the benefit of switching easier to see.

Open `index.html` directly or serve the repository root. Presets change model parameters; Restart starts a new run with current parameters. View & playback contains display settings, speed and Restore defaults. Save PNG exports the current canvas. Sound, where available, starts only after pressing Play sound.

## Files

`script.js` owns this experiment's model, controls, presets and explanatory copy. `index.html` and `style.css` own its page. Only numerical helpers (`../shared/math.js`) and common canvas / control primitives (`../shared/lab.js`) are shared. No other experiment's implementation is loaded.

Formula: P(stay)=1/N;  P(switch)=(N−1)/N
