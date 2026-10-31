# taylor series

a Taylor polynomial builds a local approximation from a function’s derivatives at an expansion point. More terms usually improve the approximation near that point before extending its useful range.

## how it works

the core mathematical relationship in this experiment is:

```text
sin(x) ≈ Σ sin(a+kπ/2)(x−a)ᵏ/k!
```

## local information becomes a curve

A Taylor polynomial matches a function’s value and successive derivatives at one expansion point. Low orders match the function only nearby; adding higher orders can extend the useful region, though the radius and behavior of convergence depend on the function.

Change one setting at a time and watch how the result differs from the default. The experiment computes its display from the model parameters, so the changes reveal how the mathematical behavior depends on those inputs.

## the controls

| setting | what to expect |
|---|---|
| `degree` | adjustable from 1 to 23 |
| `expansion point` | adjustable from -3 to 3 |

## something to try

Move the expansion point away from zero and watch where the polynomial follows the sine curve. Add terms to widen that region.

## usage

Open `index.html` in a modern browser, or serve the repository root with `python -m http.server 8000`. No package installation or build step is required. Choose a preset, adjust the model settings and use the canvas interaction hints on the page. The shared toolbar provides view and playback options appropriate to this experiment, along with Save PNG and Restore defaults.

## known limitations

More terms do not guarantee a good approximation everywhere, especially far from the expansion point.

This is an interactive, finite-resolution visualization. Its numerical or statistical results are intended for exploration and comparison rather than formal proof.

## files

- `index.html` contains the experiment page.
- `style.css` defines its local styling.
- `script.js` contains this experiment’s model, settings and presets.
- `../shared/lab.js` and `../shared/math.js` supply shared interface and mathematical helpers.
