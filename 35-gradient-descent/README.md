# Gradient Descent

Gradient descent repeatedly moves against the gradient to reduce an objective. The learning rate must be small enough for the curvature; otherwise the updates overshoot and can diverge.

## Try it

Compare a smooth bowl with a steep valley. Raise the learning rate past 1/c to see why a rate that worked before may become unstable.

Open `index.html` directly or serve the repository root. Presets change model parameters; Restart starts a new run with current parameters. View & playback contains display settings, speed and Restore defaults. Save PNG exports the current canvas. Sound, where available, starts only after pressing Play sound.

## Files

`script.js` owns this experiment's model, controls, presets and explanatory copy. `index.html` and `style.css` own its page. Only numerical helpers (`../shared/math.js`) and common canvas / control primitives (`../shared/lab.js`) are shared. No other experiment's implementation is loaded.

Formula: f(x,y)=x²+cy²;  (x,y) ← (x,y)−η(2x,2cy)
