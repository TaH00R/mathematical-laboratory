# sphere projections

a sphere cannot be flattened without distortion. Orthographic projection resembles a distant view of a globe, while stereographic projection preserves local angles but stretches regions near the projection pole.

## how it works

the core mathematical relationship in this experiment is:

```text
Orthographic: (x,y); stereographic: (x,y)/(1−z)
```

## every map pays a price

An orthographic view projects the globe as seen from far away and hides the back hemisphere. Stereographic projection uses lines through a pole, preserving local angles but stretching regions dramatically near that pole. Comparing them shows that flattening a sphere cannot preserve every geometric property at once.

Change one setting at a time and watch how the result differs from the default. The experiment computes its display from the model parameters, so the changes reveal how the mathematical behavior depends on those inputs.

## the controls

| setting | what to expect |
|---|---|
| `projection` | adjustable from ["Orthographic" to "Stereographic" |
| `grid degrees` | adjustable from 10 to 30 |
| `tilt` | adjustable from -0.8 to 0.8 |

## something to try

Switch projection and drag to rotate. Use a denser graticule to compare how the same latitude circles appear on the plane.

## usage

Open `index.html` in a modern browser, or serve the repository root with `python -m http.server 8000`. No package installation or build step is required. Choose a preset, adjust the model settings and use the canvas interaction hints on the page. The shared toolbar provides view and playback options appropriate to this experiment, along with Save PNG and Restore defaults.

## known limitations

The visualization depicts ideal geometric projections, not a full geographic map with a chosen Earth ellipsoid.

This is an interactive, finite-resolution visualization. Its numerical or statistical results are intended for exploration and comparison rather than formal proof.

## files

- `index.html` contains the experiment page.
- `style.css` defines its local styling.
- `script.js` contains this experiment’s model, settings and presets.
- `../shared/lab.js` and `../shared/math.js` supply shared interface and mathematical helpers.
