# mathematical music

a musical tone can be assembled from a fundamental frequency and integer harmonics. Their relative amplitudes determine the waveform and its timbre, even when the perceived pitch stays the same.

## how it works

the core mathematical relationship in this experiment is:

```text
s(t) = Σₖ sin(2πkf₀t)/kᵅ
```

## why harmonics change timbre

A tone is built by adding sine waves at whole-number multiples of a fundamental frequency. Their amplitudes change the shape of each cycle: quickly decaying harmonics sound softer, while stronger upper partials create a brighter tone. The fundamental sets the repeating period.

Change one setting at a time and watch how the result differs from the default. The experiment computes its display from the model parameters, so the changes reveal how the mathematical behavior depends on those inputs.

## the controls

| setting | what to expect |
|---|---|
| `frequency` | adjustable from 110 to 880 |
| `harmonics` | adjustable from 1 to 12 |
| `harmonic decay` | adjustable from 0.5 to 3 |
| `volume` | adjustable from 0.01 to 0.15 |

## something to try

Press Play sound, then compare a gentle harmonic decay with a bright one. Adjust volume before increasing the number of harmonics.

## usage

Open `index.html` in a modern browser, or serve the repository root with `python -m http.server 8000`. No package installation or build step is required. Choose a preset, adjust the model settings and use the canvas interaction hints on the page. The shared toolbar provides view and playback options appropriate to this experiment, along with Save PNG and Restore defaults.

## known limitations

The audio is synthesized from a limited harmonic sum; speaker response, listening level and hearing vary. Start with low volume.

This is an interactive, finite-resolution visualization. Its numerical or statistical results are intended for exploration and comparison rather than formal proof.

## files

- `index.html` contains the experiment page.
- `style.css` defines its local styling.
- `script.js` contains this experiment’s model, settings and presets.
- `../shared/lab.js` and `../shared/math.js` supply shared interface and mathematical helpers.
