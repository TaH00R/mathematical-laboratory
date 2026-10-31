# penrose tiling

penrose tilings use a small set of tiles to form patterns that never repeat by translation. This finite patch subdivides golden-ratio Robinson triangles while preserving fivefold structure.

## how it works

the core mathematical relationship in this experiment is:

```text
φ = (1+√5)/2; subdivision divides edges in the ratio φ.
```

## order without repetition

Two types of Robinson triangles can be subdivided into smaller triangles using the golden ratio. Repeating substitution preserves local matching structure and produces a patch with fivefold motifs but no ordinary repeating translation pattern.

Change one setting at a time and watch how the result differs from the default. The experiment computes its display from the model parameters, so the changes reveal how the mathematical behavior depends on those inputs.

## the controls

| setting | what to expect |
|---|---|
| `depth` | adjustable from 0 to 7 |
| `outlines` | adjustable from ["Show" to "Hide" |

## something to try

Increase subdivision depth to reveal smaller tiles. Hide outlines to focus on the interlocking regions of the two triangle types.

## usage

Open `index.html` in a modern browser, or serve the repository root with `python -m http.server 8000`. No package installation or build step is required. Choose a preset, adjust the model settings and use the canvas interaction hints on the page. The shared toolbar provides view and playback options appropriate to this experiment, along with Save PNG and Restore defaults.

## known limitations

The displayed patch is finite, so it illustrates substitution structure rather than proving global aperiodicity by itself.

This is an interactive, finite-resolution visualization. Its numerical or statistical results are intended for exploration and comparison rather than formal proof.

## files

- `index.html` contains the experiment page.
- `style.css` defines its local styling.
- `script.js` contains this experiment’s model, settings and presets.
- `../shared/lab.js` and `../shared/math.js` supply shared interface and mathematical helpers.
