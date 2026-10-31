# collatz 3d landscape

the Collatz process halves even integers and replaces odd integers with 3n+1. Each trajectory here is lifted into a landscape by its logarithmic value; the general conjecture remains unproved.

## how it works

the core mathematical relationship in this experiment is:

```text
T(n) = n/2 if n is even; otherwise 3n+1
```

## simple branching, hard conjecture

Even numbers shrink in a single step; odd numbers jump to `3n + 1` and often grow before later divisions. Repeating these two rules can produce unexpectedly long, high trajectories. Plotting the paths makes stopping time and peak growth easier to compare.

Change one setting at a time and watch how the result differs from the default. The experiment computes its display from the model parameters, so the changes reveal how the mathematical behavior depends on those inputs.

## the controls

| setting | what to expect |
|---|---|
| `starts` | adjustable from 5 to 80 |
| `height scale` | adjustable from 0.5 to 2 |

## something to try

Increase the starting range to include 27, whose trajectory rises much higher than nearby starting values. Drag to rotate the paths.

## usage

Open `index.html` in a modern browser, or serve the repository root with `python -m http.server 8000`. No package installation or build step is required. Choose a preset, adjust the model settings and use the canvas interaction hints on the page. The shared toolbar provides view and playback options appropriate to this experiment, along with Save PNG and Restore defaults.

## known limitations

The Collatz conjecture remains unproved for all positive integers. Checking many finite inputs does not settle it.

This is an interactive, finite-resolution visualization. Its numerical or statistical results are intended for exploration and comparison rather than formal proof.

## files

- `index.html` contains the experiment page.
- `style.css` defines its local styling.
- `script.js` contains this experiment’s model, settings and presets.
- `../shared/lab.js` and `../shared/math.js` supply shared interface and mathematical helpers.
