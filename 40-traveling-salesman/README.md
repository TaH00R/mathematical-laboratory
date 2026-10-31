# traveling salesman

the traveling-salesman problem asks for the shortest closed route visiting every city. A nearest-neighbor route supplies a starting guess, and 2-opt repeatedly removes avoidable edge crossings.

## how it works

the core mathematical relationship in this experiment is:

```text
Tour length = Σ ‖pᵢ₊₁−pᵢ‖; the last edge returns to the start.
```

## why swapping edges helps

Start with a nearest-neighbor loop through all the cities. Then consider removing two edges and reconnecting their endpoints in the opposite order. If the new route is shorter, keep the change and repeat. This 2-opt improvement often removes obvious crossings.

Change one setting at a time and watch how the result differs from the default. The experiment computes its display from the model parameters, so the changes reveal how the mathematical behavior depends on those inputs.

## the controls

| setting | what to expect |
|---|---|
| `cities` | adjustable from 5 to 35 |
| `swaps per step` | adjustable from 10 to 300 |

## something to try

Start with many cities and step through route improvements. Increase the search budget to try more edge swaps per update.

## usage

Open `index.html` in a modern browser, or serve the repository root with `python -m http.server 8000`. No package installation or build step is required. Choose a preset, adjust the model settings and use the canvas interaction hints on the page. The shared toolbar provides view and playback options appropriate to this experiment, along with Save PNG and Restore defaults.

## known limitations

Nearest-neighbor plus 2-opt is a heuristic, not a proof of the optimal tour; larger city sets may have much shorter undiscovered routes.

This is an interactive, finite-resolution visualization. Its numerical or statistical results are intended for exploration and comparison rather than formal proof.

## files

- `index.html` contains the experiment page.
- `style.css` defines its local styling.
- `script.js` contains this experiment’s model, settings and presets.
- `../shared/lab.js` and `../shared/math.js` supply shared interface and mathematical helpers.
