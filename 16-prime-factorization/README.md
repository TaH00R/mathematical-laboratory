# prime factorization galaxy

every integer greater than one has a unique prime factorization, apart from the order of its factors. The center is the original number and its satellites are the prime factors, including repetitions.

## how it works

the core mathematical relationship in this experiment is:

```text
n = p₁ · p₂ · … · pₖ
```

## multiplication behind the picture

Trial division repeatedly removes a prime factor until the remaining number is 1 or a larger prime. Showing repeated factors separately distinguishes a square or cube from a product of distinct primes, even when both have the same number of unique prime factors.

Change one setting at a time and watch how the result differs from the default. The experiment computes its display from the model parameters, so the changes reveal how the mathematical behavior depends on those inputs.

## the controls

| setting | what to expect |
|---|---|
| `number` | adjustable from 2 to 500 |
| `orbit radius` | adjustable from 0.4 to 1.1 |

## something to try

Compare a prime number with a power of two and a highly composite number. Change the orbit radius to spread out repeated factors.

## usage

Open `index.html` in a modern browser, or serve the repository root with `python -m http.server 8000`. No package installation or build step is required. Choose a preset, adjust the model settings and use the canvas interaction hints on the page. The shared toolbar provides view and playback options appropriate to this experiment, along with Save PNG and Restore defaults.

## known limitations

The visual layout is a metaphor for factorization; orbital positions are not properties of the primes themselves.

This is an interactive, finite-resolution visualization. Its numerical or statistical results are intended for exploration and comparison rather than formal proof.

## files

- `index.html` contains the experiment page.
- `style.css` defines its local styling.
- `script.js` contains this experiment’s model, settings and presets.
- `../shared/lab.js` and `../shared/math.js` supply shared interface and mathematical helpers.
