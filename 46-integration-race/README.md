# integration race

quadrature rules approximate the same definite integral using different local models. Comparing their absolute errors shows how sample count and function shape affect convergence.

## how it works

the core mathematical relationship in this experiment is:

```text
Compare ∫₀² f(x) dx using left, midpoint, trapezoid and Simpson rules.
```

## convergence is the race

Apply multiple numerical integration rules to the same function and interval count, then compare each estimate with a reference result. Smooth functions usually reward higher-order rules: doubling the number of intervals can reduce error at very different rates.

Change one setting at a time and watch how the result differs from the default. The experiment computes its display from the model parameters, so the changes reveal how the mathematical behavior depends on those inputs.

## the controls

| setting | what to expect |
|---|---|
| `intervals` | adjustable from 2 to 60 |
| `integrand` | adjustable from ["x^4" to "sin(x)" |

## something to try

Compare the quartic with a sine wave. Increase intervals and observe how the higher-order Simpson estimate converges faster for these smooth functions.

## usage

Open `index.html` in a modern browser, or serve the repository root with `python -m http.server 8000`. No package installation or build step is required. Choose a preset, adjust the model settings and use the canvas interaction hints on the page. The shared toolbar provides view and playback options appropriate to this experiment, along with Save PNG and Restore defaults.

## known limitations

One smooth example does not establish a universal winner: nonsmooth functions and uneven sampling can change the result.

This is an interactive, finite-resolution visualization. Its numerical or statistical results are intended for exploration and comparison rather than formal proof.

## files

- `index.html` contains the experiment page.
- `style.css` defines its local styling.
- `script.js` contains this experiment’s model, settings and presets.
- `../shared/lab.js` and `../shared/math.js` supply shared interface and mathematical helpers.
