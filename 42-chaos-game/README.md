# Chaos Game

The chaos game repeatedly chooses a random polygon vertex and moves a fixed fraction toward it. With three vertices and a half-distance step, the points form a Sierpiński triangle.

## Try it

Compare a triangle at ratio 0.5 with a pentagon at ratio 0.62. Each contraction changes which regions of the shape remain reachable.

Open `index.html` directly or serve the repository root. Presets change model parameters; Restart starts a new run with current parameters. View & playback contains display settings, speed and Restore defaults. Save PNG exports the current canvas. Sound, where available, starts only after pressing Play sound.

## Files

`script.js` owns this experiment's model, controls, presets and explanatory copy. `index.html` and `style.css` own its page. Only numerical helpers (`../shared/math.js`) and common canvas / control primitives (`../shared/lab.js`) are shared. No other experiment's implementation is loaded.

Formula: pₙ₊₁ = (1−r)pₙ + r·v_random
