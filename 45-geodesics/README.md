# geodesics

a geodesic is a locally shortest path on a surface. On a sphere, it lies along a great circle; interpolating latitude and longitude generally traces a different route.

## how it works

the core mathematical relationship in this experiment is:

```text
distance = R arccos(a·b),  for unit direction vectors a,b
```

## shortest routes bend on a map

On a sphere, the shortest route between non-antipodal points follows the shorter arc of the great circle through them. It may look curved in latitude-longitude coordinates because map coordinates distort geometry. The central angle times the sphere radius gives its distance.

Change one setting at a time and watch how the result differs from the default. The experiment computes its display from the model parameters, so the changes reveal how the mathematical behavior depends on those inputs.

## the controls

| setting | what to expect |
|---|---|
| `arc fraction` | adjustable from 0.1 to 1 |
| `sphere radius` | adjustable from 1 to 10 |

## something to try

Drag the endpoints far apart and compare the green great-circle route with the pink coordinate interpolation. Change sphere radius to convert the angular separation to distance.

## usage

Open `index.html` in a modern browser, or serve the repository root with `python -m http.server 8000`. No package installation or build step is required. Choose a preset, adjust the model settings and use the canvas interaction hints on the page. The shared toolbar provides view and playback options appropriate to this experiment, along with Save PNG and Restore defaults.

## known limitations

At antipodal points there are multiple equally short great-circle routes; the model assumes a perfect sphere.

This is an interactive, finite-resolution visualization. Its numerical or statistical results are intended for exploration and comparison rather than formal proof.

## files

- `index.html` contains the experiment page.
- `style.css` defines its local styling.
- `script.js` contains this experiment’s model, settings and presets.
- `../shared/lab.js` and `../shared/math.js` supply shared interface and mathematical helpers.
