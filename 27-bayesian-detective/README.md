# bayesian detective

bayes’ theorem combines a prior probability with evidence. A positive test can still have many false positives when the condition is rare, even if the test is fairly accurate.

## how it works

the core mathematical relationship in this experiment is:

```text
P(C|+) = P(+|C)P(C) / [P(+|C)P(C)+P(+|¬C)P(¬C)]
```

## the base-rate effect

A positive test can come from a true case or a false positive. Bayes’ rule weighs those possibilities using how common the condition is *before* testing. When the prior is tiny, even a test with high sensitivity may produce many false positives relative to real positives.

Change one setting at a time and watch how the result differs from the default. The experiment computes its display from the model parameters, so the changes reveal how the mathematical behavior depends on those inputs.

## the controls

| setting | what to expect |
|---|---|
| `prevalence` | adjustable from 0.001 to 0.5 |
| `sensitivity` | adjustable from 0.5 to 1 |
| `specificity` | adjustable from 0.5 to 1 |
| `population` | adjustable from 1000 to 100000 |

## something to try

Compare a rare condition with a common one. Raise specificity and watch the number of false positives shrink in the expected population counts.

## usage

Open `index.html` in a modern browser, or serve the repository root with `python -m http.server 8000`. No package installation or build step is required. Choose a preset, adjust the model settings and use the canvas interaction hints on the page. The shared toolbar provides view and playback options appropriate to this experiment, along with Save PNG and Restore defaults.

## known limitations

The calculation only reflects the prior, sensitivity and specificity entered; it is not a medical diagnosis or an assessment of real evidence.

This is an interactive, finite-resolution visualization. Its numerical or statistical results are intended for exploration and comparison rather than formal proof.

## files

- `index.html` contains the experiment page.
- `style.css` defines its local styling.
- `script.js` contains this experiment’s model, settings and presets.
- `../shared/lab.js` and `../shared/math.js` supply shared interface and mathematical helpers.
