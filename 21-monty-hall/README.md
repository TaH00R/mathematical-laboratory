# monty hall

you first choose one door. A host who knows the prize location opens all but one of the other doors, revealing goats; switching wins whenever your original choice was wrong.

## how it works

the core mathematical relationship in this experiment is:

```text
P(stay)=1/N;  P(switch)=(N−1)/N
```

## why switching beats staying

Your original pick is correct with probability `1/N`. The informed host then eliminates losing alternatives without moving the prize. Staying retains that original `1/N` chance; switching to the one remaining unchosen door wins whenever your first pick was wrong.

Change one setting at a time and watch how the result differs from the default. The experiment computes its display from the model parameters, so the changes reveal how the mathematical behavior depends on those inputs.

## the controls

| setting | what to expect |
|---|---|
| `games per step` | adjustable from 1 to 500 |
| `doors` | adjustable from 3 to 10 |

## something to try

Compare three doors with ten doors. The informed host removes the same kind of uncertainty, making the benefit of switching easier to see.

## usage

Open `index.html` in a modern browser, or serve the repository root with `python -m http.server 8000`. No package installation or build step is required. Choose a preset, adjust the model settings and use the canvas interaction hints on the page. The shared toolbar provides view and playback options appropriate to this experiment, along with Save PNG and Restore defaults.

## known limitations

The result assumes the host knows the prize location and always follows the stated reveal rule. Changing the host strategy changes the probability problem.

This is an interactive, finite-resolution visualization. Its numerical or statistical results are intended for exploration and comparison rather than formal proof.

## files

- `index.html` contains the experiment page.
- `style.css` defines its local styling.
- `script.js` contains this experiment’s model, settings and presets.
- `../shared/lab.js` and `../shared/math.js` supply shared interface and mathematical helpers.
