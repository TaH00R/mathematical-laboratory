# cellular automata

an elementary cellular automaton updates each cell from its left neighbor, itself and its right neighbor. Its rule number encodes eight possible local outcomes, yet simple rules can produce surprisingly complex patterns.

## how it works

the core mathematical relationship in this experiment is:

```text
next = (rule ≫ (4·left + 2·center + right)) & 1
```

## eight bits, endless patterns

Every cell reads a three-cell neighborhood from the previous row. There are eight possible neighborhoods, and a rule number from 0 to 255 supplies one output bit for each. Applying that tiny lookup table across a row and repeating it generates the entire image.

Change one setting at a time and watch how the result differs from the default. The experiment computes its display from the model parameters, so the changes reveal how the mathematical behavior depends on those inputs.

## the controls

| setting | what to expect |
|---|---|
| `rule` | adjustable from 0 to 255 |
| `initial row` | adjustable from ["Single seed" to "Random" |

## something to try

Compare Rule 30 with Rule 90. Use a random starting row to see how the same local rule handles many overlapping patterns.

## usage

Open `index.html` in a modern browser, or serve the repository root with `python -m http.server 8000`. No package installation or build step is required. Choose a preset, adjust the model settings and use the canvas interaction hints on the page. The shared toolbar provides view and playback options appropriate to this experiment, along with Save PNG and Restore defaults.

## known limitations

Patterns depend strongly on the initial row and finite grid width; a striking pattern is not necessarily random.

This is an interactive, finite-resolution visualization. Its numerical or statistical results are intended for exploration and comparison rather than formal proof.

## files

- `index.html` contains the experiment page.
- `style.css` defines its local styling.
- `script.js` contains this experiment’s model, settings and presets.
- `../shared/lab.js` and `../shared/math.js` supply shared interface and mathematical helpers.
