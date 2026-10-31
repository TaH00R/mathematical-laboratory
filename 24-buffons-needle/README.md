# buffon’s needle → π

buffon’s needle estimates π by dropping short needles onto parallel lines. A crossing depends on both the needle’s position and its random orientation.

## how it works

the core mathematical relationship in this experiment is:

```text
π ≈ 2LN/(D·crossings),  for L ≤ D
```

## geometry hidden in random drops

A needle crosses a parallel line only if its center lands close enough and its angle puts enough of its length perpendicular to the lines. Averaging over random positions and angles creates a crossing probability containing π. Counting crossings lets you estimate π backwards.

Change one setting at a time and watch how the result differs from the default. The experiment computes its display from the model parameters, so the changes reveal how the mathematical behavior depends on those inputs.

## the controls

| setting | what to expect |
|---|---|
| `length / spacing` | adjustable from 0.1 to 1 |
| `needles per step` | adjustable from 5 to 100 |

## something to try

Compare short needles with needles as long as the line spacing. Increase the batch size to see the estimate stabilize faster.

## usage

Open `index.html` in a modern browser, or serve the repository root with `python -m http.server 8000`. No package installation or build step is required. Choose a preset, adjust the model settings and use the canvas interaction hints on the page. The shared toolbar provides view and playback options appropriate to this experiment, along with Save PNG and Restore defaults.

## known limitations

The familiar simple formula assumes the needle is no longer than the line spacing and drops are uniform. Small samples give noisy estimates.

This is an interactive, finite-resolution visualization. Its numerical or statistical results are intended for exploration and comparison rather than formal proof.

## files

- `index.html` contains the experiment page.
- `style.css` defines its local styling.
- `script.js` contains this experiment’s model, settings and presets.
- `../shared/lab.js` and `../shared/math.js` supply shared interface and mathematical helpers.
