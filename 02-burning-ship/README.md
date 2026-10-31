~# burning ship fractal

the Burning Ship repeats a complex quadratic map after taking the absolute values of both coordinates. Points that escape receive a color based on how long they remain bounded.

## how it works

the core mathematical relationship in this experiment is:

```text
zₙ₊₁ = (|Re zₙ| + i|Im zₙ|)² + c
```

## why the ship shape appears

Taking absolute values folds the orbit across both coordinate axes before squaring. That small change breaks the Mandelbrot set’s symmetry and produces the distinctive hull, flames and filament-like details. Each screen pixel represents a different complex value `c`.

Change one setting at a time and watch how the result differs from the default. The experiment computes its display from the model parameters, so the changes reveal how the mathematical behavior depends on those inputs.

## the controls

| setting | what to expect |
|---|---|
| `detail` | adjustable from 50 to 300 |
| `zoom` | adjustable from 1 to 50 |
| `palette shift` | adjustable from 0 to 6.28 |

## something to try

Increase detail near the edge, then shift the palette to reveal bands with similar escape times.

## usage

Open `index.html` in a modern browser, or serve the repository root with `python -m http.server 8000`. No package installation or build step is required. Choose a preset, adjust the model settings and use the canvas interaction hints on the page. The shared toolbar provides view and playback options appropriate to this experiment, along with Save PNG and Restore defaults.

## known limitations

the escape-time picture is a numerical test, not a proof that a dark pixel belongs to the set. Finite iteration budgets can mistake slow escape for bounded behavior.

This is an interactive, finite-resolution visualization. Its numerical or statistical results are intended for exploration and comparison rather than formal proof.

## files

- `index.html` contains the experiment page.
- `style.css` defines its local styling.
- `script.js` contains this experiment’s model, settings and presets.
- `../shared/lab.js` and `../shared/math.js` supply shared interface and mathematical helpers.
