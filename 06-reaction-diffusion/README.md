# reaction-diffusion

in the Gray–Scott model, two chemicals diffuse at different rates while reacting with each other. Feeding one chemical and removing the other produces spots, branching patterns and moving boundaries.

## how it works

the core mathematical relationship in this experiment is:

```text
∂u/∂t = Dᵤ∇²u − uv² + f(1−u)
```

## how spots grow out of equations

Diffusion smooths out concentration differences, while the reaction terms can amplify them locally. In the Gray–Scott setup, the feed and kill rates control how quickly material is replenished or removed. Their competition lets initially small disturbances become persistent spots, stripes or moving fronts.

Change one setting at a time and watch how the result differs from the default. The experiment computes its display from the model parameters, so the changes reveal how the mathematical behavior depends on those inputs.

## the controls

| setting | what to expect |
|---|---|
| `feed` | adjustable from 0.01 to 0.08 |
| `kill` | adjustable from 0.03 to 0.075 |
| `diffusion` | adjustable from 0.08 to 0.24 |
| `seed radius` | adjustable from 2 to 10 |

## something to try

Try the spots preset, then tap the field to add a new seed. Change diffusion to compare how quickly neighboring regions mix.

## usage

Open `index.html` in a modern browser, or serve the repository root with `python -m http.server 8000`. No package installation or build step is required. Choose a preset, adjust the model settings and use the canvas interaction hints on the page. The shared toolbar provides view and playback options appropriate to this experiment, along with Save PNG and Restore defaults.

## known limitations

The simulation is a simplified two-species model on a finite grid, not a chemically calibrated laboratory experiment.

This is an interactive, finite-resolution visualization. Its numerical or statistical results are intended for exploration and comparison rather than formal proof.

## files

- `index.html` contains the experiment page.
- `style.css` defines its local styling.
- `script.js` contains this experiment’s model, settings and presets.
- `../shared/lab.js` and `../shared/math.js` supply shared interface and mathematical helpers.
