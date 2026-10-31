# newton-raphson

newton–Raphson follows a tangent line to its x-axis intercept, then repeats. Here it finds the positive square root of a configurable target.

## how it works

the core mathematical relationship in this experiment is:

```text
xₙ₊₁ = xₙ − (xₙ²−a)/(2xₙ)
```

## tangents as guesses

Draw the tangent to a function at your current guess. The tangent’s crossing with the horizontal axis supplies the next guess. Repeating this operation often converges rapidly when the starting point is close to a simple root and the derivative is nonzero.

Change one setting at a time and watch how the result differs from the default. The experiment computes its display from the model parameters, so the changes reveal how the mathematical behavior depends on those inputs.

## the controls

| setting | what to expect |
|---|---|
| `initial x` | adjustable from 0.1 to 5 |
| `target` | adjustable from 0.1 to 9 |

## something to try

Try an initial guess close to zero and compare its first jump with a guess near the root. Step through the tangent construction.

## usage

Open `index.html` in a modern browser, or serve the repository root with `python -m http.server 8000`. No package installation or build step is required. Choose a preset, adjust the model settings and use the canvas interaction hints on the page. The shared toolbar provides view and playback options appropriate to this experiment, along with Save PNG and Restore defaults.

## known limitations

Bad initial guesses, small derivatives or large jumps can lead to slow convergence or failure.

This is an interactive, finite-resolution visualization. Its numerical or statistical results are intended for exploration and comparison rather than formal proof.

## files

- `index.html` contains the experiment page.
- `style.css` defines its local styling.
- `script.js` contains this experiment’s model, settings and presets.
- `../shared/lab.js` and `../shared/math.js` supply shared interface and mathematical helpers.
