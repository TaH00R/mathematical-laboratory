# Galton Board

A Galton board turns repeated left-or-right choices into a binomial distribution. With many rows and a balanced probability, the histogram approaches a bell-shaped curve.

## Try it

Bias the pegs toward the right and watch the center shift. Add rows to see how the distribution spreads.

Open `index.html` directly or serve the repository root. Presets change model parameters; Restart starts a new run with current parameters. View & playback contains display settings, speed and Restore defaults. Save PNG exports the current canvas. Sound, where available, starts only after pressing Play sound.

## Files

`script.js` owns this experiment's model, controls, presets and explanatory copy. `index.html` and `style.css` own its page. Only numerical helpers (`../shared/math.js`) and common canvas / control primitives (`../shared/lab.js`) are shared. No other experiment's implementation is loaded.

Formula: X ∼ Binomial(n,p);  E[X]=np; Var[X]=np(1−p)
