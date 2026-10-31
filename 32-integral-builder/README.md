# integral builder

numerical integration replaces an area under a curve with simpler shapes. Left rectangles, midpoint rectangles, trapezoids and quadratic Simpson panels give different errors for the same interval count.

## how it works

the core mathematical relationship in this experiment is:

```text
∫₀ᵇ x² dx = b³/3
```

## rectangles versus curved panels

Left and midpoint rules estimate area by holding a height constant on each subinterval. The trapezoidal rule joins neighboring heights with straight segments. Simpson’s rule uses quadratic interpolation to match smooth curvature more closely.

Change one setting at a time and watch how the result differs from the default. The experiment computes its display from the model parameters, so the changes reveal how the mathematical behavior depends on those inputs.

## the controls

| setting | what to expect |
|---|---|
| `rectangles` | adjustable from 2 to 100 |
| `method` | adjustable from ["left" to "midpoint" |
| `upper bound` | adjustable from -2 to 3 |

## something to try

Use a coarse left sum, then switch to midpoint and Simpson. Change the interval endpoint to compare the signed area on either side of zero.

## usage

Open `index.html` in a modern browser, or serve the repository root with `python -m http.server 8000`. No package installation or build step is required. Choose a preset, adjust the model settings and use the canvas interaction hints on the page. The shared toolbar provides view and playback options appropriate to this experiment, along with Save PNG and Restore defaults.

## known limitations

Numerical integration depends on the chosen sample spacing; sharp changes, singularities and oscillations may still cause large errors.

This is an interactive, finite-resolution visualization. Its numerical or statistical results are intended for exploration and comparison rather than formal proof.

## files

- `index.html` contains the experiment page.
- `style.css` defines its local styling.
- `script.js` contains this experiment’s model, settings and presets.
- `../shared/lab.js` and `../shared/math.js` supply shared interface and mathematical helpers.
