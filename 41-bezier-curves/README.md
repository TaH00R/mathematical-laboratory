# bézier curves

a cubic Bézier curve blends four control points. De Casteljau’s construction repeatedly interpolates between neighboring points to locate the curve at a chosen parameter.

## how it works

the core mathematical relationship in this experiment is:

```text
B(t) = (1−t)³P₀+3(1−t)²tP₁+3(1−t)t²P₂+t³P₃
```

## the curve inside the control polygon

At a parameter `t`, linearly interpolate between successive control points. Repeat the interpolation on the new points until only one remains: that point lies on the Bézier curve. As `t` moves from zero to one, those nested interpolations sweep the full curve.

Change one setting at a time and watch how the result differs from the default. The experiment computes its display from the model parameters, so the changes reveal how the mathematical behavior depends on those inputs.

## the controls

| setting | what to expect |
|---|---|
| `t` | adjustable from 0 to 1 |
| `construction` | adjustable from ["Show" to "Hide" |

## something to try

Drag the middle control points and scrub t. Hide the construction lines to inspect the finished curve by itself.

## usage

Open `index.html` in a modern browser, or serve the repository root with `python -m http.server 8000`. No package installation or build step is required. Choose a preset, adjust the model settings and use the canvas interaction hints on the page. The shared toolbar provides view and playback options appropriate to this experiment, along with Save PNG and Restore defaults.

## known limitations

Control points generally do not lie on the finished curve except at its endpoints, and rendering uses finite samples.

This is an interactive, finite-resolution visualization. Its numerical or statistical results are intended for exploration and comparison rather than formal proof.

## files

- `index.html` contains the experiment page.
- `style.css` defines its local styling.
- `script.js` contains this experiment’s model, settings and presets.
- `../shared/lab.js` and `../shared/math.js` supply shared interface and mathematical helpers.
