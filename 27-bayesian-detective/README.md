# Bayesian Detective

Bayes’ theorem combines a prior probability with evidence. A positive test can still have many false positives when the condition is rare, even if the test is fairly accurate.

## Try it

Compare a rare condition with a common one. Raise specificity and watch the number of false positives shrink in the expected population counts.

Open `index.html` directly or serve the repository root. Presets change model parameters; Restart starts a new run with current parameters. View & playback contains display settings, speed and Restore defaults. Save PNG exports the current canvas. Sound, where available, starts only after pressing Play sound.

## Files

`script.js` owns this experiment's model, controls, presets and explanatory copy. `index.html` and `style.css` own its page. Only numerical helpers (`../shared/math.js`) and common canvas / control primitives (`../shared/lab.js`) are shared. No other experiment's implementation is loaded.

Formula: P(C|+) = P(+|C)P(C) / [P(+|C)P(C)+P(+|¬C)P(¬C)]
