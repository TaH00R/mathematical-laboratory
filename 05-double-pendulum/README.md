# double pendulum chaos

two connected pendulums exchange energy through gravity. A tiny difference in their initial angles can eventually separate their paths, even though both obey the same deterministic equations.

## how it works

the core mathematical relationship in this experiment is:

```text
θ̈ = F(θ₁, θ₂, θ̇₁, θ̇₂, g)
```

## where the chaos comes from

The lower bob feels both gravity and the motion of the upper arm. The angles are coupled: changing one immediately changes the forces on the other. At modest energies the motion can look nearly regular; at higher energies tiny initial differences grow into drastically different trajectories.

Change one setting at a time and watch how the result differs from the default. The experiment computes its display from the model parameters, so the changes reveal how the mathematical behavior depends on those inputs.

## the controls

| setting | what to expect |
|---|---|
| `angle` | adjustable from 0.2 to 3 |
| `gravity` | adjustable from 1 to 20 |
| `initial separation` | adjustable from 0.0001 to 0.1 |
| `trail length` | adjustable from 100 to 1800 |

## something to try

Compare a small starting angle with an almost inverted pendulum. Increase the initial separation to see the two trails diverge sooner.

## usage

Open `index.html` in a modern browser, or serve the repository root with `python -m http.server 8000`. No package installation or build step is required. Choose a preset, adjust the model settings and use the canvas interaction hints on the page. The shared toolbar provides view and playback options appropriate to this experiment, along with Save PNG and Restore defaults.

## known limitations

A plotted path is a numerical approximation. Long-term trajectories of chaotic systems should not be treated as exact predictions.

This is an interactive, finite-resolution visualization. Its numerical or statistical results are intended for exploration and comparison rather than formal proof.

## files

- `index.html` contains the experiment page.
- `style.css` defines its local styling.
- `script.js` contains this experiment’s model, settings and presets.
- `../shared/lab.js` and `../shared/math.js` supply shared interface and mathematical helpers.
