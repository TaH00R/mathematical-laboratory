# möbius strip explorer

a Möbius strip is formed by joining a ribbon after a half twist. It has one continuous surface and one boundary, unlike an ordinary cylindrical band.

## how it works

the core mathematical relationship in this experiment is:

```text
r(u,v) = ((R+v cos(u/2))cos u, v sin(u/2), (R+v cos(u/2))sin u)
```

## one side instead of two

Imagine carrying a tiny arrow around the ribbon without leaving its surface. After one trip around the centerline, the arrow points to what looked like the opposite side. It takes two laps to return to the original orientation; that is the defining non-orientable twist.

Change one setting at a time and watch how the result differs from the default. The experiment computes its display from the model parameters, so the changes reveal how the mathematical behavior depends on those inputs.

## the controls

| setting | what to expect |
|---|---|
| `width` | adjustable from 0.1 to 0.6 |
| `wire density` | adjustable from 4 to 24 |

## something to try

Drag the strip to inspect the half twist. Make the ribbon wider and increase its wire density to follow lines around the surface.

## usage

Open `index.html` in a modern browser, or serve the repository root with `python -m http.server 8000`. No package installation or build step is required. Choose a preset, adjust the model settings and use the canvas interaction hints on the page. The shared toolbar provides view and playback options appropriate to this experiment, along with Save PNG and Restore defaults.

## known limitations

The rendered mesh is a finite polygonal approximation. The half twist describes the topology; lighting and camera angle do not change it.

This is an interactive, finite-resolution visualization. Its numerical or statistical results are intended for exploration and comparison rather than formal proof.

## files

- `index.html` contains the experiment page.
- `style.css` defines its local styling.
- `script.js` contains this experiment’s model, settings and presets.
- `../shared/lab.js` and `../shared/math.js` supply shared interface and mathematical helpers.
