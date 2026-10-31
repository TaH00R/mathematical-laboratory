# fourier terrain

fourier terrain adds spatial waves with different frequencies. Higher harmonics add fine detail; decreasing their amplitudes more rapidly makes the surface smoother.

## how it works

the core mathematical relationship in this experiment is:

```text
h(x,z) = Σ sin(3kx+0.6k)cos(2kz)/k¹⁺ʳ
```

## building landscapes from waves

Add several sinusoidal surfaces with different directions, frequencies and amplitudes. Low-frequency components establish broad hills, while high-frequency components add small ridges. The rate at which their amplitudes decay determines whether the landscape looks smooth or rough.

Change one setting at a time and watch how the result differs from the default. The experiment computes its display from the model parameters, so the changes reveal how the mathematical behavior depends on those inputs.

## the controls

| setting | what to expect |
|---|---|
| `harmonics` | adjustable from 1 to 12 |
| `roughness` | adjustable from 0.2 to 1.8 |
| `height` | adjustable from 0.1 to 0.5 |

## something to try

Compare a few smooth waves with a rough twelve-harmonic surface. Drag to rotate and use height to exaggerate the relief.

## usage

Open `index.html` in a modern browser, or serve the repository root with `python -m http.server 8000`. No package installation or build step is required. Choose a preset, adjust the model settings and use the canvas interaction hints on the page. The shared toolbar provides view and playback options appropriate to this experiment, along with Save PNG and Restore defaults.

## known limitations

A finite harmonic sum is procedural terrain, not a simulation of erosion, tectonics or real-world geography.

This is an interactive, finite-resolution visualization. Its numerical or statistical results are intended for exploration and comparison rather than formal proof.

## files

- `index.html` contains the experiment page.
- `style.css` defines its local styling.
- `script.js` contains this experiment’s model, settings and presets.
- `../shared/lab.js` and `../shared/math.js` supply shared interface and mathematical helpers.
