# prime number spirals

the Ulam spiral places successive integers on a square spiral. Highlighting the primes reveals diagonal runs associated with quadratic expressions along the grid.

## how it works

the core mathematical relationship in this experiment is:

```text
Prime n has no integer divisor 2 ≤ d ≤ √n
```

## why diagonals matter

Writing consecutive integers along a square spiral lines up many quadratic sequences along diagonals. Some of those expressions hit primes more often over short ranges, which is why bright diagonal streaks can appear instead of a featureless cloud.

Change one setting at a time and watch how the result differs from the default. The experiment computes its display from the model parameters, so the changes reveal how the mathematical behavior depends on those inputs.

## the controls

| setting | what to expect |
|---|---|
| `numbers` | adjustable from 100 to 5000 |
| `composites` | adjustable from ["Hide" to "Show" |

## something to try

Show the composite numbers as context, then increase the number range to inspect longer diagonal prime patterns.

## usage

Open `index.html` in a modern browser, or serve the repository root with `python -m http.server 8000`. No package installation or build step is required. Choose a preset, adjust the model settings and use the canvas interaction hints on the page. The shared toolbar provides view and playback options appropriate to this experiment, along with Save PNG and Restore defaults.

## known limitations

Visible streaks are patterns in a finite number range; they do not prove that a diagonal contains infinitely many primes.

This is an interactive, finite-resolution visualization. Its numerical or statistical results are intended for exploration and comparison rather than formal proof.

## files

- `index.html` contains the experiment page.
- `style.css` defines its local styling.
- `script.js` contains this experiment’s model, settings and presets.
- `../shared/lab.js` and `../shared/math.js` supply shared interface and mathematical helpers.
