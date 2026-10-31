# percolation

site percolation randomly occupies cells of a grid. The green cluster contains occupied sites connected to the top; percolation occurs when that cluster reaches the bottom.

## how it works

the core mathematical relationship in this experiment is:

```text
A crossing is an occupied path from top to bottom.
```

## a phase change made of connections

Randomly occupied cells form groups through adjacency. At low occupancy, the groups tend to remain isolated. At higher occupancy, a connected path can span the entire grid. The change in the frequency of spanning clusters becomes sharper as the grid gets larger.

Change one setting at a time and watch how the result differs from the default. The experiment computes its display from the model parameters, so the changes reveal how the mathematical behavior depends on those inputs.

## the controls

| setting | what to expect |
|---|---|
| `occupation` | adjustable from 0.1 to 0.9 |
| `neighbors` | adjustable from ["4 sides" to "8 including diagonals" |

## something to try

Compare occupation probabilities below and above 0.59 with four-neighbor connectivity. Add diagonal connections and observe how crossing becomes easier.

## usage

Open `index.html` in a modern browser, or serve the repository root with `python -m http.server 8000`. No package installation or build step is required. Choose a preset, adjust the model settings and use the canvas interaction hints on the page. The shared toolbar provides view and playback options appropriate to this experiment, along with Save PNG and Restore defaults.

## known limitations

The threshold you see on a finite grid is only an estimate and varies across random realizations.

This is an interactive, finite-resolution visualization. Its numerical or statistical results are intended for exploration and comparison rather than formal proof.

## files

- `index.html` contains the experiment page.
- `style.css` defines its local styling.
- `script.js` contains this experiment’s model, settings and presets.
- `../shared/lab.js` and `../shared/math.js` supply shared interface and mathematical helpers.
