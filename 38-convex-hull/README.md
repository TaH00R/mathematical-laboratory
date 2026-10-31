# convex hull

the convex hull is the smallest convex polygon containing every point. Interior points do not affect its boundary until moved outside the current hull.

## how it works

the core mathematical relationship in this experiment is:

```text
Every point lies on or inside the hull’s supporting edges.
```

## why inside points disappear

Sort points and build lower and upper chains, discarding turns that would bend inward. Their union traces the smallest convex polygon that contains every point. Moving an interior point leaves the hull unchanged until it crosses the current boundary.

Change one setting at a time and watch how the result differs from the default. The experiment computes its display from the model parameters, so the changes reveal how the mathematical behavior depends on those inputs.

## the controls

| setting | what to expect |
|---|---|
| `points` | adjustable from 4 to 40 |
| `distribution` | adjustable from ["Cloud" to "Circle" |

## something to try

Compare a cloud with points placed on a circle. Drag an interior point past the boundary, or tap empty space to add a new point.

## usage

Open `index.html` in a modern browser, or serve the repository root with `python -m http.server 8000`. No package installation or build step is required. Choose a preset, adjust the model settings and use the canvas interaction hints on the page. The shared toolbar provides view and playback options appropriate to this experiment, along with Save PNG and Restore defaults.

## known limitations

Collinear points and duplicate coordinates require consistent treatment; the drawing concerns a finite point set.

This is an interactive, finite-resolution visualization. Its numerical or statistical results are intended for exploration and comparison rather than formal proof.

## files

- `index.html` contains the experiment page.
- `style.css` defines its local styling.
- `script.js` contains this experiment’s model, settings and presets.
- `../shared/lab.js` and `../shared/math.js` supply shared interface and mathematical helpers.
