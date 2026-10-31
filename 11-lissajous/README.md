# lissajous galaxy

a Lissajous figure combines two perpendicular oscillations. Frequency ratios control the number of lobes, while phase and amplitude change the shape and symmetry.

## how it works

the core mathematical relationship in this experiment is:

```text
x = sin(at + φ),  y = A sin(bt)
```

## how frequency ratios draw shapes

One oscillator supplies horizontal motion, the other vertical motion. If their frequency ratio is rational, the trajectory repeats after a common period, making a closed curve. Changing the phase shifts how peaks and crossings line up, even when both frequencies stay fixed.

Change one setting at a time and watch how the result differs from the default. The experiment computes its display from the model parameters, so the changes reveal how the mathematical behavior depends on those inputs.

## the controls

| setting | what to expect |
|---|---|
| `x frequency` | adjustable from 1 to 12 |
| `y frequency` | adjustable from 1 to 12 |
| `phase` | adjustable from 0 to 6.28 |
| `y amplitude` | adjustable from 0.2 to 1 |

## something to try

Start with equal frequencies, then choose a 3:4 ratio. Slide phase through a full turn while watching the moving point.

## usage

Open `index.html` in a modern browser, or serve the repository root with `python -m http.server 8000`. No package installation or build step is required. Choose a preset, adjust the model settings and use the canvas interaction hints on the page. The shared toolbar provides view and playback options appropriate to this experiment, along with Save PNG and Restore defaults.

## known limitations

A finite animation window may make nearly rational ratios appear to close when they do not exactly repeat.

This is an interactive, finite-resolution visualization. Its numerical or statistical results are intended for exploration and comparison rather than formal proof.

## files

- `index.html` contains the experiment page.
- `style.css` defines its local styling.
- `script.js` contains this experiment’s model, settings and presets.
- `../shared/lab.js` and `../shared/math.js` supply shared interface and mathematical helpers.
