# delaunay triangulation

a Delaunay triangulation joins points so that no triangle’s circumcircle contains another point in its interior. It is closely related to the dual Voronoi diagram.

## how it works

the core mathematical relationship in this experiment is:

```text
For every triangle, its open circumdisk contains no other site.
```

## the empty circumcircle test

Every triangle has a circle passing through its three vertices. In a Delaunay triangulation no other point should lie strictly inside that circle. When a point moves, swapping the diagonal of a quadrilateral can restore this condition.

Change one setting at a time and watch how the result differs from the default. The experiment computes its display from the model parameters, so the changes reveal how the mathematical behavior depends on those inputs.

## the controls

| setting | what to expect |
|---|---|
| `points` | adjustable from 4 to 35 |
| `circumcircles` | adjustable from ["Hide" to "Show" |

## something to try

Show circumcircles and drag a point across an edge. The triangulation flips when a different diagonal satisfies the empty-circle rule.

## usage

Open `index.html` in a modern browser, or serve the repository root with `python -m http.server 8000`. No package installation or build step is required. Choose a preset, adjust the model settings and use the canvas interaction hints on the page. The shared toolbar provides view and playback options appropriate to this experiment, along with Save PNG and Restore defaults.

## known limitations

Four points on the same circle can admit multiple equally valid triangulations; finite-precision computations can affect edge choices.

This is an interactive, finite-resolution visualization. Its numerical or statistical results are intended for exploration and comparison rather than formal proof.

## files

- `index.html` contains the experiment page.
- `style.css` defines its local styling.
- `script.js` contains this experiment’s model, settings and presets.
- `../shared/lab.js` and `../shared/math.js` supply shared interface and mathematical helpers.
