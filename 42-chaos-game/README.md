# chaos game

the chaos game repeatedly chooses a random polygon vertex and moves a fixed fraction toward it. With three vertices and a half-distance step, the points form a Sierpiński triangle.

## how it works

the core mathematical relationship in this experiment is:

```text
pₙ₊₁ = (1−r)pₙ + r·v_random
```

## how randomness reveals order

Start at a point, choose a vertex at random, and move a fixed fraction of the distance toward it. Repeat thousands of times. Although the vertex choices are random, the allowed contractions restrict the trajectory to a recognizable self-similar set.

Change one setting at a time and watch how the result differs from the default. The experiment computes its display from the model parameters, so the changes reveal how the mathematical behavior depends on those inputs.

## the controls

| setting | what to expect |
|---|---|
| `points per step` | adjustable from 10 to 500 |
| `vertices` | adjustable from 3 to 6 |
| `contraction` | adjustable from 0.3 to 0.75 |

## something to try

Compare a triangle at ratio 0.5 with a pentagon at ratio 0.62. Each contraction changes which regions of the shape remain reachable.

## usage

Open `index.html` in a modern browser, or serve the repository root with `python -m http.server 8000`. No package installation or build step is required. Choose a preset, adjust the model settings and use the canvas interaction hints on the page. The shared toolbar provides view and playback options appropriate to this experiment, along with Save PNG and Restore defaults.

## known limitations

Finite points approximate the attractor; changing the contraction ratio or selection rule changes the resulting shape.

This is an interactive, finite-resolution visualization. Its numerical or statistical results are intended for exploration and comparison rather than formal proof.

## files

- `index.html` contains the experiment page.
- `style.css` defines its local styling.
- `script.js` contains this experiment’s model, settings and presets.
- `../shared/lab.js` and `../shared/math.js` supply shared interface and mathematical helpers.
