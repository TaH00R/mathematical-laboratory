# grand fractal explorer

mandelbrot, Julia and Burning Ship images all test repeated complex iteration, but change either the starting value or the recurrence. Colors show how quickly points escape a bounded region.

## how it works

the core mathematical relationship in this experiment is:

```text
Mandelbrot: z₀=0; Julia: c fixed; zₙ₊₁=zₙ²+c
```

## one recurrence, three different pictures

Mandelbrot starts every pixel at `z = 0` and varies `c`. Julia fixes `c` and varies the starting `z`. Burning Ship folds the real and imaginary parts with absolute values before the quadratic update. Those small choices produce very different escape-time images.

Change one setting at a time and watch how the result differs from the default. The experiment computes its display from the model parameters, so the changes reveal how the mathematical behavior depends on those inputs.

## the controls

| setting | what to expect |
|---|---|
| `family` | adjustable from ["Mandelbrot" to "Julia" |
| `detail` | adjustable from 50 to 300 |
| `zoom` | adjustable from 1 to 50 |
| `Julia real` | adjustable from -1 to 1 |
| `Julia imaginary` | adjustable from -1 to 1 |

## something to try

Choose Julia and change its real and imaginary constants. Switch back to Mandelbrot or Burning Ship and drag to explore the boundary.

## usage

Open `index.html` in a modern browser, or serve the repository root with `python -m http.server 8000`. No package installation or build step is required. Choose a preset, adjust the model settings and use the canvas interaction hints on the page. The shared toolbar provides view and playback options appropriate to this experiment, along with Save PNG and Restore defaults.

## known limitations

Zoom and iteration counts are deliberately bounded in this general explorer; it does not implement the original Mandelbrot page’s deep-zoom precision.

This is an interactive, finite-resolution visualization. Its numerical or statistical results are intended for exploration and comparison rather than formal proof.

## files

- `index.html` contains the experiment page.
- `style.css` defines its local styling.
- `script.js` contains this experiment’s model, settings and presets.
- `../shared/lab.js` and `../shared/math.js` supply shared interface and mathematical helpers.
