# numerical methods race

euler, midpoint and fourth-order Runge–Kutta approximate the same differential equation. Comparing them against the exact exponential solution shows how numerical error depends on the step size.

## how it works

the core mathematical relationship in this experiment is:

```text
y′ = y,  y(0)=1  ⇒  y(t)=eᵗ
```

## why some steps are better

Euler follows the slope at the start of each timestep. Midpoint estimates a slope halfway through. RK4 combines four slope evaluations to better approximate the change over the full interval. On a smooth problem, decreasing the step size reduces the accumulated approximation error.

Change one setting at a time and watch how the result differs from the default. The experiment computes its display from the model parameters, so the changes reveal how the mathematical behavior depends on those inputs.

## the controls

| setting | what to expect |
|---|---|
| `steps` | adjustable from 2 to 40 |
| `duration` | adjustable from 0.5 to 3 |

## something to try

Use just a few steps, then double the count. Extend the time horizon to make accumulated error more visible.

## usage

Open `index.html` in a modern browser, or serve the repository root with `python -m http.server 8000`. No package installation or build step is required. Choose a preset, adjust the model settings and use the canvas interaction hints on the page. The shared toolbar provides view and playback options appropriate to this experiment, along with Save PNG and Restore defaults.

## known limitations

Higher-order integration is not automatically accurate with a huge timestep or on a discontinuous differential equation.

This is an interactive, finite-resolution visualization. Its numerical or statistical results are intended for exploration and comparison rather than formal proof.

## files

- `index.html` contains the experiment page.
- `style.css` defines its local styling.
- `script.js` contains this experiment’s model, settings and presets.
- `../shared/lab.js` and `../shared/math.js` supply shared interface and mathematical helpers.
