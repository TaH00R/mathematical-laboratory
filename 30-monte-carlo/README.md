# monte carlo universe

monte Carlo estimation uses random samples to compare areas. The fraction of square samples inside a circle estimates its area, and therefore π.

## how it works

the core mathematical relationship in this experiment is:

```text
π ≈ 4·inside/(N r²),  for a circle of radius r ≤ 1
```

## turning area into a probability

Sample random points uniformly in a square around a circle. The fraction that land inside the circle approaches the ratio of the two areas; with a unit circle inside a square of side two, multiply that fraction by four to estimate π.

Change one setting at a time and watch how the result differs from the default. The experiment computes its display from the model parameters, so the changes reveal how the mathematical behavior depends on those inputs.

## the controls

| setting | what to expect |
|---|---|
| `samples per step` | adjustable from 10 to 500 |
| `circle radius` | adjustable from 0.3 to 1 |

## something to try

Use a smaller circle and compare the noisier estimate. A larger batch size gathers evidence faster without changing the theoretical answer.

## usage

Open `index.html` in a modern browser, or serve the repository root with `python -m http.server 8000`. No package installation or build step is required. Choose a preset, adjust the model settings and use the canvas interaction hints on the page. The shared toolbar provides view and playback options appropriate to this experiment, along with Save PNG and Restore defaults.

## known limitations

Random error typically falls slowly, roughly with the inverse square root of sample count. More digits are not guaranteed after a small number of throws.

This is an interactive, finite-resolution visualization. Its numerical or statistical results are intended for exploration and comparison rather than formal proof.

## files

- `index.html` contains the experiment page.
- `style.css` defines its local styling.
- `script.js` contains this experiment’s model, settings and presets.
- `../shared/lab.js` and `../shared/math.js` supply shared interface and mathematical helpers.
