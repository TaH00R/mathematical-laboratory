# galton board

a Galton board turns repeated left-or-right choices into a binomial distribution. With many rows and a balanced probability, the histogram approaches a bell-shaped curve.

## how it works

the core mathematical relationship in this experiment is:

```text
X ∼ Binomial(n,p);  E[X]=np; Var[X]=np(1−p)
```

## how a bell curve emerges

A ball makes a left-or-right decision at each row of pegs. The final bin depends on how many times it moved right. With independent balanced choices this is a binomial distribution, which becomes increasingly bell-shaped as the number of rows grows.

Change one setting at a time and watch how the result differs from the default. The experiment computes its display from the model parameters, so the changes reveal how the mathematical behavior depends on those inputs.

## the controls

| setting | what to expect |
|---|---|
| `rows` | adjustable from 4 to 20 |
| `right probability` | adjustable from 0.1 to 0.9 |

## something to try

Bias the pegs toward the right and watch the center shift. Add rows to see how the distribution spreads.

## usage

Open `index.html` in a modern browser, or serve the repository root with `python -m http.server 8000`. No package installation or build step is required. Choose a preset, adjust the model settings and use the canvas interaction hints on the page. The shared toolbar provides view and playback options appropriate to this experiment, along with Save PNG and Restore defaults.

## known limitations

Finite runs fluctuate, and changing the left/right probability shifts the distribution rather than producing the same centered bell curve.

This is an interactive, finite-resolution visualization. Its numerical or statistical results are intended for exploration and comparison rather than formal proof.

## files

- `index.html` contains the experiment page.
- `style.css` defines its local styling.
- `script.js` contains this experiment’s model, settings and presets.
- `../shared/lab.js` and `../shared/math.js` supply shared interface and mathematical helpers.
