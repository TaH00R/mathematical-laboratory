# gradient descent

gradient descent repeatedly moves against the gradient to reduce an objective. The learning rate must be small enough for the curvature; otherwise the updates overshoot and can diverge.

## how it works

the core mathematical relationship in this experiment is:

```text
f(x,y)=x²+cy²;  (x,y) ← (x,y)−η(2x,2cy)
```

## walking downhill by slope

The gradient points toward the direction of steepest local increase. Subtracting a learning-rate-scaled gradient takes a step downhill instead. Large steps can overshoot a valley; small steps may converge slowly. The landscape curvature determines which step sizes are stable.

Change one setting at a time and watch how the result differs from the default. The experiment computes its display from the model parameters, so the changes reveal how the mathematical behavior depends on those inputs.

## the controls

| setting | what to expect |
|---|---|
| `learning rate` | adjustable from 0.01 to 0.4 |
| `y curvature` | adjustable from 1 to 6 |

## something to try

Compare a smooth bowl with a steep valley. Raise the learning rate past 1/c to see why a rate that worked before may become unstable.

## usage

Open `index.html` in a modern browser, or serve the repository root with `python -m http.server 8000`. No package installation or build step is required. Choose a preset, adjust the model settings and use the canvas interaction hints on the page. The shared toolbar provides view and playback options appropriate to this experiment, along with Save PNG and Restore defaults.

## known limitations

A finite sequence of updates need not find the global minimum, particularly for nonconvex objectives.

This is an interactive, finite-resolution visualization. Its numerical or statistical results are intended for exploration and comparison rather than formal proof.

## files

- `index.html` contains the experiment page.
- `style.css` defines its local styling.
- `script.js` contains this experiment’s model, settings and presets.
- `../shared/lab.js` and `../shared/math.js` supply shared interface and mathematical helpers.
