# matrix transformations

a matrix can rotate, shear and scale the plane. The transformed grid shows where basis directions move, while the determinant measures the factor by which areas change.

## how it works

the core mathematical relationship in this experiment is:

```text
A = scale · shear · rotation;  det(A)=scale²
```

## the columns tell the story

A two-by-two matrix is completely determined by where it sends the horizontal and vertical unit vectors. Every other point follows from a linear combination of those transformed basis vectors. The determinant gives the signed area scale, including orientation flips when negative.

Change one setting at a time and watch how the result differs from the default. The experiment computes its display from the model parameters, so the changes reveal how the mathematical behavior depends on those inputs.

## the controls

| setting | what to expect |
|---|---|
| `angle` | adjustable from -3.14 to 3.14 |
| `shear` | adjustable from -2 to 2 |
| `scale` | adjustable from 0.2 to 2 |
| `grid spacing` | adjustable from 0.1 to 0.5 |

## something to try

Start with a pure rotation, then add shear. Change grid spacing to inspect the transformed unit square more clearly.

## usage

Open `index.html` in a modern browser, or serve the repository root with `python -m http.server 8000`. No package installation or build step is required. Choose a preset, adjust the model settings and use the canvas interaction hints on the page. The shared toolbar provides view and playback options appropriate to this experiment, along with Save PNG and Restore defaults.

## known limitations

A zero determinant collapses area and makes the transform non-invertible; a screen grid only approximates an infinite plane.

This is an interactive, finite-resolution visualization. Its numerical or statistical results are intended for exploration and comparison rather than formal proof.

## files

- `index.html` contains the experiment page.
- `style.css` defines its local styling.
- `script.js` contains this experiment’s model, settings and presets.
- `../shared/lab.js` and `../shared/math.js` supply shared interface and mathematical helpers.
