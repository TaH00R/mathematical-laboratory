# random walk → diffusion

independent random steps create diffusion: individual paths are unpredictable, but the average squared distance grows linearly with the number of steps.

## how it works

the core mathematical relationship in this experiment is:

```text
E[‖rₙ‖²] = nℓ² for unbiased fixed-length steps
```

## random paths, predictable spread

A single walker can zigzag in any direction. Across many walkers, however, independent steps cancel in the mean while squared displacements add. That gives the characteristic growth of mean squared displacement with the number of steps.

Change one setting at a time and watch how the result differs from the default. The experiment computes its display from the model parameters, so the changes reveal how the mathematical behavior depends on those inputs.

## the controls

| setting | what to expect |
|---|---|
| `walkers` | adjustable from 20 to 500 |
| `step length` | adjustable from 0.005 to 0.04 |

## something to try

Increase the step length and compare how quickly the cloud spreads. More walkers make the measured average steadier.

## usage

Open `index.html` in a modern browser, or serve the repository root with `python -m http.server 8000`. No package installation or build step is required. Choose a preset, adjust the model settings and use the canvas interaction hints on the page. The shared toolbar provides view and playback options appropriate to this experiment, along with Save PNG and Restore defaults.

## known limitations

Finite sample averages are noisy, and the diffusion law depends on the chosen step distribution and independence assumptions.

This is an interactive, finite-resolution visualization. Its numerical or statistical results are intended for exploration and comparison rather than formal proof.

## files

- `index.html` contains the experiment page.
- `style.css` defines its local styling.
- `script.js` contains this experiment’s model, settings and presets.
- `../shared/lab.js` and `../shared/math.js` supply shared interface and mathematical helpers.
