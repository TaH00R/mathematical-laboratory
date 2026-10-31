# eigenvectors

an eigenvector keeps its direction when multiplied by a matrix; its eigenvalue gives the signed scale along that direction. A real symmetric matrix has perpendicular eigenvector directions.

## how it works

the core mathematical relationship in this experiment is:

```text
Av = λv,  A = [[a,b],[b,d]]
```

## directions a matrix does not turn

Most vectors rotate or shear under a matrix transformation. Eigenvectors are the exceptions: the output remains on the same line and is scaled by an eigenvalue. For symmetric two-dimensional matrices, distinct eigenvectors are perpendicular.

Change one setting at a time and watch how the result differs from the default. The experiment computes its display from the model parameters, so the changes reveal how the mathematical behavior depends on those inputs.

## the controls

| setting | what to expect |
|---|---|
| `a` | adjustable from -2 to 3 |
| `b` | adjustable from -2 to 2 |
| `d` | adjustable from -2 to 3 |
| `probe vectors` | adjustable from 8 to 48 |

## something to try

Set the off-diagonal entry to zero to align eigenvectors with the axes. Make one eigenvalue negative to observe a direction reversal.

## usage

Open `index.html` in a modern browser, or serve the repository root with `python -m http.server 8000`. No package installation or build step is required. Choose a preset, adjust the model settings and use the canvas interaction hints on the page. The shared toolbar provides view and playback options appropriate to this experiment, along with Save PNG and Restore defaults.

## known limitations

Near repeated eigenvalues the directions can become numerically sensitive, and not every real matrix has two real eigenvectors.

This is an interactive, finite-resolution visualization. Its numerical or statistical results are intended for exploration and comparison rather than formal proof.

## files

- `index.html` contains the experiment page.
- `style.css` defines its local styling.
- `script.js` contains this experiment’s model, settings and presets.
- `../shared/lab.js` and `../shared/math.js` supply shared interface and mathematical helpers.
