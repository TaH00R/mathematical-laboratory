# voronoi universe

a Voronoi diagram assigns each location to its closest seed. Moving a seed changes the boundaries between territories; choosing a different distance metric changes what “closest” means.

## how it works

the core mathematical relationship in this experiment is:

```text
Vᵢ = {x : d(x,pᵢ) ≤ d(x,pⱼ) for all j}
```

## why boundaries move

For each location, compare its distance to every seed and assign it to the nearest one. Boundaries are exactly the locations tied between two or more seeds. With Euclidean distance they are straight bisectors; changing the metric changes the geometry of each territory.

Change one setting at a time and watch how the result differs from the default. The experiment computes its display from the model parameters, so the changes reveal how the mathematical behavior depends on those inputs.

## the controls

| setting | what to expect |
|---|---|
| `sites` | adjustable from 3 to 40 |
| `distance` | adjustable from ["Euclidean" to "Manhattan" |

## something to try

Drag a seed toward its neighbor, then switch from Euclidean distance to Manhattan distance to produce angular territories.

## usage

Open `index.html` in a modern browser, or serve the repository root with `python -m http.server 8000`. No package installation or build step is required. Choose a preset, adjust the model settings and use the canvas interaction hints on the page. The shared toolbar provides view and playback options appropriate to this experiment, along with Save PNG and Restore defaults.

## known limitations

Finite canvas resolution can make boundaries look jagged, especially when seeds are close together.

This is an interactive, finite-resolution visualization. Its numerical or statistical results are intended for exploration and comparison rather than formal proof.

## files

- `index.html` contains the experiment page.
- `style.css` defines its local styling.
- `script.js` contains this experiment’s model, settings and presets.
- `../shared/lab.js` and `../shared/math.js` supply shared interface and mathematical helpers.
