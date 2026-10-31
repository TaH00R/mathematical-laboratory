# double-slit simulation

light waves passing through two slits add together. Their interference fringes sit inside a broader single-slit diffraction envelope, so both slit spacing and slit width affect the screen pattern.

## how it works

the core mathematical relationship in this experiment is:

```text
I ∝ sinc²(πay/λL) · cos²(πdy/λL)
```

## interference versus diffraction

Waves from the two slits arrive with a phase difference. At some angles their amplitudes reinforce each other; at others they cancel. Each slit also has its own finite width, so the rapid two-slit fringes are modulated by a wider diffraction envelope.

Change one setting at a time and watch how the result differs from the default. The experiment computes its display from the model parameters, so the changes reveal how the mathematical behavior depends on those inputs.

## the controls

| setting | what to expect |
|---|---|
| `spacing` | adjustable from 1 to 12 |
| `wavelength` | adjustable from 0.2 to 2 |
| `slit width` | adjustable from 0.1 to 1 |

## something to try

Increase slit spacing to pack the bright fringes closer together. Increase slit width to narrow the surrounding envelope.

## usage

Open `index.html` in a modern browser, or serve the repository root with `python -m http.server 8000`. No package installation or build step is required. Choose a preset, adjust the model settings and use the canvas interaction hints on the page. The shared toolbar provides view and playback options appropriate to this experiment, along with Save PNG and Restore defaults.

## known limitations

The displayed intensity uses an idealized wave model rather than tracking individual photons or a physical detector.

This is an interactive, finite-resolution visualization. Its numerical or statistical results are intended for exploration and comparison rather than formal proof.

## files

- `index.html` contains the experiment page.
- `style.css` defines its local styling.
- `script.js` contains this experiment’s model, settings and presets.
- `../shared/lab.js` and `../shared/math.js` supply shared interface and mathematical helpers.
