# gambler’s ruin

a gambler wins or loses one unit per turn and stops at zero or a target wealth. Even a small bias changes the chance of reaching the target before ruin.

## how it works

the core mathematical relationship in this experiment is:

```text
P(win)=i/N when p=½; otherwise (1−((1−p)/p)ⁱ)/(1−((1−p)/p)ᴺ)
```

## why a tiny edge matters

Each round is a one-step random walk in wealth with absorbing boundaries at zero and the target. Even when the expected gain per round is only slightly positive or negative, repeated play compounds the difference in the probability of reaching the target first.

Change one setting at a time and watch how the result differs from the default. The experiment computes its display from the model parameters, so the changes reveal how the mathematical behavior depends on those inputs.

## the controls

| setting | what to expect |
|---|---|
| `initial capital` | adjustable from 1 to 19 |
| `win probability` | adjustable from 0.1 to 0.9 |

## something to try

Start with half the target wealth. Compare a fair game with a 45% chance of winning each turn.

## usage

Open `index.html` in a modern browser, or serve the repository root with `python -m http.server 8000`. No package installation or build step is required. Choose a preset, adjust the model settings and use the canvas interaction hints on the page. The shared toolbar provides view and playback options appropriate to this experiment, along with Save PNG and Restore defaults.

## known limitations

The model assumes fixed stakes, independent rounds and a constant win probability; it does not predict real betting outcomes.

This is an interactive, finite-resolution visualization. Its numerical or statistical results are intended for exploration and comparison rather than formal proof.

## files

- `index.html` contains the experiment page.
- `style.css` defines its local styling.
- `script.js` contains this experiment’s model, settings and presets.
- `../shared/lab.js` and `../shared/math.js` supply shared interface and mathematical helpers.
