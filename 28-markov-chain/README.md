# markov chain universe

a Markov chain chooses its next state using only its current state. This three-state chain can favor staying, moving clockwise or moving counterclockwise.

## how it works

the core mathematical relationship in this experiment is:

```text
Pᵢᵢ=s; Pᵢ,ᵢ₊₁=(1−s)q; Pᵢ,ᵢ₊₂=(1−s)(1−q)
```

## why the present is enough

A transition matrix lists the probabilities of moving from each state to every other state. Multiply the current state distribution by that matrix to obtain the distribution after one step; repeat to see longer-term behavior. Some chains approach a stationary distribution, while others cycle.

Change one setting at a time and watch how the result differs from the default. The experiment computes its display from the model parameters, so the changes reveal how the mathematical behavior depends on those inputs.

## the controls

| setting | what to expect |
|---|---|
| `stay probability` | adjustable from 0.05 to 0.95 |
| `clockwise probability` | adjustable from 0 to 1 |

## something to try

Increase the chance of staying, then favor clockwise motion. The transition paths change while the long-run uniform distribution remains stationary.

## usage

Open `index.html` in a modern browser, or serve the repository root with `python -m http.server 8000`. No package installation or build step is required. Choose a preset, adjust the model settings and use the canvas interaction hints on the page. The shared toolbar provides view and playback options appropriate to this experiment, along with Save PNG and Restore defaults.

## known limitations

A stationary-looking distribution in a short run does not prove that every transition matrix converges or that the Markov assumption fits a real system.

This is an interactive, finite-resolution visualization. Its numerical or statistical results are intended for exploration and comparison rather than formal proof.

## files

- `index.html` contains the experiment page.
- `style.css` defines its local styling.
- `script.js` contains this experiment’s model, settings and presets.
- `../shared/lab.js` and `../shared/math.js` supply shared interface and mathematical helpers.
