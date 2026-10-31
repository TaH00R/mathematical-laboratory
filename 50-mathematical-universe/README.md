# mathematical universe

phyllotaxis places points at steadily increasing radii and a fixed divergence angle. Angles near the golden angle spread points evenly; nearby rational fractions of a turn create visible spokes.

## how it works

the core mathematical relationship in this experiment is:

```text
rₙ = √(n/N),  θₙ = nα; golden angle ≈ 137.507°
```

## why the golden angle packs evenly

Place the `n`th point at a radius increasing roughly like the square root of `n`, then rotate it by `n` times a constant angle. When the divergence is close to the golden angle, successive points avoid lining up into a few repeated spokes, creating sunflower-like spirals.

Change one setting at a time and watch how the result differs from the default. The experiment computes its display from the model parameters, so the changes reveal how the mathematical behavior depends on those inputs.

## the controls

| setting | what to expect |
|---|---|
| `points` | adjustable from 50 to 1500 |
| `angle` | adjustable from 130 to 145 |
| `point size` | adjustable from 1 to 5 |

## something to try

Compare the golden-angle preset with 135 degrees. Increase point size to make the change from even packing to spokes easier to inspect.

## usage

Open `index.html` in a modern browser, or serve the repository root with `python -m http.server 8000`. No package installation or build step is required. Choose a preset, adjust the model settings and use the canvas interaction hints on the page. The shared toolbar provides view and playback options appropriate to this experiment, along with Save PNG and Restore defaults.

## known limitations

The pattern is an idealized mathematical phyllotaxis construction, not a complete biological growth model.

This is an interactive, finite-resolution visualization. Its numerical or statistical results are intended for exploration and comparison rather than formal proof.

## files

- `index.html` contains the experiment page.
- `style.css` defines its local styling.
- `script.js` contains this experiment’s model, settings and presets.
- `../shared/lab.js` and `../shared/math.js` supply shared interface and mathematical helpers.
