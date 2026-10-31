# newton fractal

newton’s method can find complex roots as well as real ones. Each starting point is colored by the root it approaches; intricate boundaries separate different basins of attraction.

## how it works

the core mathematical relationship in this experiment is:

```text
zₙ₊₁ = zₙ − α(zₙᵈ−1)/(d zₙᵈ⁻¹)
```

## where the colors come from

Newton iteration starts with a complex guess and repeatedly divides the function value by its derivative. Each guess is assigned the color of the root it converges to. Near basin boundaries, neighboring initial guesses can head toward different roots, creating fine fractal structure.

Change one setting at a time and watch how the result differs from the default. The experiment computes its display from the model parameters, so the changes reveal how the mathematical behavior depends on those inputs.

## the controls

| setting | what to expect |
|---|---|
| `degree` | adjustable from 2 to 6 |
| `iterations` | adjustable from 5 to 50 |
| `relaxation` | adjustable from 0.3 to 1.5 |

## something to try

Compare three roots with five roots. Lower relaxation to see slower convergence, and raise the iteration budget to resolve the basin edges.

## usage

Open `index.html` in a modern browser, or serve the repository root with `python -m http.server 8000`. No package installation or build step is required. Choose a preset, adjust the model settings and use the canvas interaction hints on the page. The shared toolbar provides view and playback options appropriate to this experiment, along with Save PNG and Restore defaults.

## known limitations

A finite iteration cap and convergence tolerance can leave ambiguous pixels near boundaries; singular derivatives also make some starts unstable.

This is an interactive, finite-resolution visualization. Its numerical or statistical results are intended for exploration and comparison rather than formal proof.

## files

- `index.html` contains the experiment page.
- `style.css` defines its local styling.
- `script.js` contains this experiment’s model, settings and presets.
- `../shared/lab.js` and `../shared/math.js` supply shared interface and mathematical helpers.
