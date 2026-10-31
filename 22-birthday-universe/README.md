# Birthday Universe

The birthday problem asks whether any pair in a group shares a birthday. The number of possible pairs grows quickly, so a match becomes likely with a surprisingly small group.

## Try it

Compare 23 people with 50. Shorten the calendar to see how the number of possible birthday values affects collisions.

Open `index.html` directly or serve the repository root. Presets change model parameters; Restart starts a new run with current parameters. View & playback contains display settings, speed and Restore defaults. Save PNG exports the current canvas. Sound, where available, starts only after pressing Play sound.

## Files

`script.js` owns this experiment's model, controls, presets and explanatory copy. `index.html` and `style.css` own its page. Only numerical helpers (`../shared/math.js`) and common canvas / control primitives (`../shared/lab.js`) are shared. No other experiment's implementation is loaded.

Formula: P(match) = 1 − ∏ₖ₌₀ⁿ⁻¹ (D−k)/D
