# hyperbolic geometry

the Poincaré disk maps an infinite hyperbolic plane into a finite circle. Its shortest paths are diameters or circular arcs that meet the outer boundary at right angles.

## how it works

the core mathematical relationship in this experiment is:

```text
ds² = 4(dx² + dy²)/(1−x²−y²)²
```

## why straight paths look curved

A Poincaré disk squeezes an infinite hyperbolic plane into a circle. The metric changes with distance from the center, so ordinary straight segments generally are not shortest paths. Hyperbolic geodesics appear as arcs perpendicular to the boundary circle, with diameters as a special case.

Change one setting at a time and watch how the result differs from the default. The experiment computes its display from the model parameters, so the changes reveal how the mathematical behavior depends on those inputs.

## the controls

| setting | what to expect |
|---|---|
| `points` | adjustable from 3 to 12 |
| `comparison` | adjustable from ["Geodesics only" to "Show chords" |

## something to try

Drag vertices toward the rim and compare the curved geodesics with straight Euclidean chords.

## usage

Open `index.html` in a modern browser, or serve the repository root with `python -m http.server 8000`. No package installation or build step is required. Choose a preset, adjust the model settings and use the canvas interaction hints on the page. The shared toolbar provides view and playback options appropriate to this experiment, along with Save PNG and Restore defaults.

## known limitations

The edge of the disk is infinitely far away in the hyperbolic metric, even though it looks nearby on screen.

This is an interactive, finite-resolution visualization. Its numerical or statistical results are intended for exploration and comparison rather than formal proof.

## files

- `index.html` contains the experiment page.
- `style.css` defines its local styling.
- `script.js` contains this experiment’s model, settings and presets.
- `../shared/lab.js` and `../shared/math.js` supply shared interface and mathematical helpers.
