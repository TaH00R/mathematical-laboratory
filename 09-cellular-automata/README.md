# Cellular Automata

An elementary cellular automaton updates each cell from its left neighbor, itself and its right neighbor. Its rule number encodes eight possible local outcomes, yet simple rules can produce surprisingly complex patterns.

## Try it

Compare Rule 30 with Rule 90. Use a random starting row to see how the same local rule handles many overlapping patterns.

Open `index.html` directly or serve the repository root. Presets change model parameters; Restart starts a new run with current parameters. View & playback contains display settings, speed and Restore defaults. Save PNG exports the current canvas. Sound, where available, starts only after pressing Play sound.

## Files

`script.js` owns this experiment's model, controls, presets and explanatory copy. `index.html` and `style.css` own its page. Only numerical helpers (`../shared/math.js`) and common canvas / control primitives (`../shared/lab.js`) are shared. No other experiment's implementation is loaded.

Formula: next = (rule ≫ (4·left + 2·center + right)) & 1
