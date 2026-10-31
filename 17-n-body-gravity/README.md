# n-body gravity

every body attracts every other body through Newtonian gravity. A small softening term prevents nearly coincident bodies from producing infinite numerical accelerations.

## how it works

the core mathematical relationship in this experiment is:

```text
aᵢ = G Σⱼ (rⱼ−rᵢ)/(‖rⱼ−rᵢ‖²+ε²)³ᐟ²
```

## why orbits are difficult

Each object receives an acceleration from the sum of gravitational pulls from every other object. Because the bodies also move, the forces must be recomputed every numerical step. With three or more moving bodies there is generally no simple closed-form solution for their trajectories.

Change one setting at a time and watch how the result differs from the default. The experiment computes its display from the model parameters, so the changes reveal how the mathematical behavior depends on those inputs.

## the controls

| setting | what to expect |
|---|---|
| `bodies` | adjustable from 3 to 18 |
| `gravity` | adjustable from 0.05 to 1 |
| `orbit speed` | adjustable from 0.05 to 0.6 |
| `softening` | adjustable from 0.001 to 0.05 |

## something to try

Try a faster starting orbit, then increase gravity. Watch whether the group expands, forms temporary pairs or collapses inward.

## usage

Open `index.html` in a modern browser, or serve the repository root with `python -m http.server 8000`. No package installation or build step is required. Choose a preset, adjust the model settings and use the canvas interaction hints on the page. The shared toolbar provides view and playback options appropriate to this experiment, along with Save PNG and Restore defaults.

## known limitations

Softening and finite timesteps trade physical accuracy for stable, interactive motion. This is not a precision orbital integrator.

This is an interactive, finite-resolution visualization. Its numerical or statistical results are intended for exploration and comparison rather than formal proof.

## files

- `index.html` contains the experiment page.
- `style.css` defines its local styling.
- `script.js` contains this experiment’s model, settings and presets.
- `../shared/lab.js` and `../shared/math.js` supply shared interface and mathematical helpers.
