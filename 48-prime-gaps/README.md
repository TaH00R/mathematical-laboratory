# prime gaps

a prime gap is the distance between consecutive primes. The gaps vary irregularly, with occasional much larger spaces between neighboring primes.

## how it works

the core mathematical relationship in this experiment is:

```text
gₙ = pₙ₊₁ − pₙ
```

## uneven spacing among primes

Subtract each prime from the next prime to obtain a sequence of gaps. With one exception, consecutive primes are odd, so their gaps are even. The changing gap sizes show that primes become sparser on average without becoming evenly spaced.

Change one setting at a time and watch how the result differs from the default. The experiment computes its display from the model parameters, so the changes reveal how the mathematical behavior depends on those inputs.

## the controls

| setting | what to expect |
|---|---|
| `limit` | adjustable from 100 to 10000 |
| `plot` | adjustable from ["Line" to "Bars" |

## something to try

Increase the number range and switch from a connected line to individual gap bars to compare local variation with record gaps.

## usage

Open `index.html` in a modern browser, or serve the repository root with `python -m http.server 8000`. No package installation or build step is required. Choose a preset, adjust the model settings and use the canvas interaction hints on the page. The shared toolbar provides view and playback options appropriate to this experiment, along with Save PNG and Restore defaults.

## known limitations

A plotted finite range cannot decide open questions about infinitely many prime gaps or record-gap growth.

This is an interactive, finite-resolution visualization. Its numerical or statistical results are intended for exploration and comparison rather than formal proof.

## files

- `index.html` contains the experiment page.
- `style.css` defines its local styling.
- `script.js` contains this experiment’s model, settings and presets.
- `../shared/lab.js` and `../shared/math.js` supply shared interface and mathematical helpers.
