# fourier transform

the discrete Fourier transform decomposes a finite sampled signal into frequency bins. A sum of two sine waves appears as two pairs of peaks, with heights determined by their amplitudes.

## how it works

the core mathematical relationship in this experiment is:

```text
Xₖ = Σₙ xₙ exp(−2πikn/N)
```

## turning time into frequencies

For each discrete frequency bin, measure how strongly the sampled signal lines up with a complex sinusoid. Peaks identify periodic components that may be hard to isolate in the time-domain waveform. Sample length and sampling rate determine which frequencies can be distinguished.

Change one setting at a time and watch how the result differs from the default. The experiment computes its display from the model parameters, so the changes reveal how the mathematical behavior depends on those inputs.

## the controls

| setting | what to expect |
|---|---|
| `frequency 1` | adjustable from 1 to 24 |
| `frequency 2` | adjustable from 1 to 24 |
| `second amplitude` | adjustable from 0.1 to 1 |

## something to try

Move the two frequencies together, then change the second amplitude. When both frequencies coincide, their contributions add in the same bin.

## usage

Open `index.html` in a modern browser, or serve the repository root with `python -m http.server 8000`. No package installation or build step is required. Choose a preset, adjust the model settings and use the canvas interaction hints on the page. The shared toolbar provides view and playback options appropriate to this experiment, along with Save PNG and Restore defaults.

## known limitations

Finite windows cause spectral leakage and finite sampling can alias high frequencies into lower bins.

This is an interactive, finite-resolution visualization. Its numerical or statistical results are intended for exploration and comparison rather than formal proof.

## files

- `index.html` contains the experiment page.
- `style.css` defines its local styling.
- `script.js` contains this experiment’s model, settings and presets.
- `../shared/lab.js` and `../shared/math.js` supply shared interface and mathematical helpers.
