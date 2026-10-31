# birthday universe

the birthday problem asks whether any pair in a group shares a birthday. The number of possible pairs grows quickly, so a match becomes likely with a surprisingly small group.

## how it works

the core mathematical relationship in this experiment is:

```text
P(match) = 1 − ∏ₖ₌₀ⁿ⁻¹ (D−k)/D
```

## why 23 people is already enough

Instead of finding the chance of at least one match directly, compute the chance that every birthday is different. The first person can have any day, the next must avoid one day, the next must avoid two, and so on. Subtract that product from one.

Change one setting at a time and watch how the result differs from the default. The experiment computes its display from the model parameters, so the changes reveal how the mathematical behavior depends on those inputs.

## the controls

| setting | what to expect |
|---|---|
| `people` | adjustable from 2 to 80 |
| `calendar days` | adjustable from 30 to 400 |

## something to try

Compare 23 people with 50. Shorten the calendar to see how the number of possible birthday values affects collisions.

## usage

Open `index.html` in a modern browser, or serve the repository root with `python -m http.server 8000`. No package installation or build step is required. Choose a preset, adjust the model settings and use the canvas interaction hints on the page. The shared toolbar provides view and playback options appropriate to this experiment, along with Save PNG and Restore defaults.

## known limitations

The classic formula assumes 365 equally likely birthdays and independent samples; actual birth dates are not perfectly uniform.

This is an interactive, finite-resolution visualization. Its numerical or statistical results are intended for exploration and comparison rather than formal proof.

## files

- `index.html` contains the experiment page.
- `style.css` defines its local styling.
- `script.js` contains this experiment’s model, settings and presets.
- `../shared/lab.js` and `../shared/math.js` supply shared interface and mathematical helpers.
